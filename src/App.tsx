import React from 'react';
import logo from './logo.svg';
import './App.scss';
import localStore from "./services/store/local";
import {StoreQuery, StoreQueryBuilder} from "./services/store";
import {DataObject} from "./domain";
import {DataIdentifier} from "./utils/identifier";
import mapper from "./services/mapper";
import {Operation} from "./utils/query";
import gateway, {Connection} from "./services/gateway";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./components/layout";
import IndexPage from "./pages";
import {withTranslation} from "react-i18next";

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
        };
    }

    componentDidMount() {
        console.log('mount');

        const connection: Connection = (process.env.NODE_ENV === "development")
            ? new Connection({domain: "localhost", port: 3001, secure: false, version: "1.0"})
            : new Connection({domain: "localhost", secure: false, version: "1.0"});

        mapper.init().then();
        localStore.init().then();

        gateway.init(connection).then();

        this.setState({isLoaded: true});
    }

    render() {
        return (
            <>
                {this.state.error != null
                    ? <div />
                    : !this.state.isLoaded
                        ? <div />
                        : <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Layout />}>
                                    <Route index element={<IndexPage />} />
                                    <Route path="home" element={
                                        <div className="App">
                                            <header className="App-header">
                                                <img src={logo} className="App-logo" alt="logo"/>
                                                <p>
                                                    Edit <code>src/App.tsx</code> and save to reload.
                                                </p>
                                                <a
                                                    className="App-link"
                                                    href="https://reactjs.org"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Learn React
                                                </a>
                                            </header>
                                        </div>
                                    }/>
                                </Route>
                            </Routes>
                        </BrowserRouter>
                }
            </>
        )
    }
}

export default withTranslation('translations')(App);

/*
                        <Route index element={<Home />} />
                        <Route path="blogs" element={<Blogs />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="*" element={<NoPage />} />


 */

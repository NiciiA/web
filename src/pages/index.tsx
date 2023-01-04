import React from "react";
import {withTranslation} from "react-i18next";
import withRouter from "../wrapper/withRouter";

import {flowRight as compose} from "lodash";

class IndexPage extends React.Component<any, any> {

    render() {
        const { t, i18n } = this.props;
        const changeLanguage = (lng: string) => {
            i18n.changeLanguage(lng);
        };

        return <div>
            <h1>{t("title")}</h1>
            <button onClick={() => changeLanguage('de')}>de</button>
            <button onClick={() => changeLanguage('en')}>en</button>
        </div>;
    }

}

export default compose(
    withRouter,
    withTranslation('translations')
)(IndexPage);

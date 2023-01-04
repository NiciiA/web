import {Operation, QueryService} from "../../utils/query";
import {Connection} from "./options";
import {GatewayQuery, GatewayQueryBuilder} from "./query";
import mapper from "../mapper";
import {ActionIdentifier} from "../../utils/identifier";

export class Gateway implements QueryService {

    // rather use client mit default version header und so
    private _connection: Connection = new Connection({domain: "localhost", port: 3001, secure: false, version: "1.0"});

    public init(arg?: Connection): Promise<void> {
        if (arg != null) this._connection = arg;

        const query: GatewayQuery<any> | null = new GatewayQueryBuilder()
            .setIdentifier(new ActionIdentifier("api", "ping"))
            .build();

        if (query != null) return this.exec(query)
            .then((response: Response) => response.text())
            .then((data: string) => console.log(data));
        return Promise.reject("error building query");
    }

    public exec<T>(query: GatewayQuery<T>): Promise<T> {
        let headers: any = { 'Content-Type': 'application/json' };
        if (localStorage.getItem("language") != null) headers["Accept-Language"] = localStorage.getItem("language");

        return fetch(this._connection.toUrl() + query.identifier.toUrl(), {
            method: this.methodify(query.operation),
            credentials: 'same-origin',
            headers: headers,
            body: query.content,
        }).then((response: Response) => mapper.map(query.type, response));
    }

    private methodify(operation: Operation): string {
        let method: string;

        switch (operation) {
            case Operation.CREATE:
                method = "POST";
                break;
            case Operation.PATCH:
                method = "PATCH";
                break;
            case Operation.DELETE:
                method = "DELETE";
                break;
            default:
                method = "GET";
                break;
        }

        return method;
    }

}

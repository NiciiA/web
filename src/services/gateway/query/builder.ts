import {QueryBuilder} from "../../../utils/query/builder";
import {ActionIdentifier} from "../../../utils/identifier";
import {GatewayQuery} from "./query";
import {Operation} from "../../../utils/query";

export class GatewayQueryBuilder<T> extends QueryBuilder<T> {

    private _identifier: ActionIdentifier | undefined;

    get identifier(): ActionIdentifier | undefined {
        return this._identifier;
    }

    public setIdentifier(value: ActionIdentifier): GatewayQueryBuilder<T> {
        this._identifier = value;
        return this;
    }

    public setOperation(value: Operation): GatewayQueryBuilder<T> {
        this._operation = value;
        return this;
    }

    public setContent(value: any): GatewayQueryBuilder<T> {
        this._content = value;
        return this;
    }

    public setType(value: { new(arg?: any): T }): GatewayQueryBuilder<T> {
        this._type = value;
        return this;
    }

    public build(): GatewayQuery<T> | null {
        if (this.identifier == null) return null;
        return new GatewayQuery<T>(this.identifier, this.operation, this.content, this.type);
    }

}

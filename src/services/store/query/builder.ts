import {StoreQuery} from "./index";
import {DataIdentifier} from "../../../utils/identifier";
import {QueryBuilder} from "../../../utils/query/builder";
import {Operation} from "../../../utils/query";

export class StoreQueryBuilder<T> extends QueryBuilder<T> {

    private _identifier: DataIdentifier | undefined;

    get identifier(): DataIdentifier | undefined {
        return this._identifier;
    }

    public setIdentifier(value: DataIdentifier): StoreQueryBuilder<T> {
        this._identifier = value;
        return this;
    }

    public setOperation(value: Operation): StoreQueryBuilder<T> {
        this._operation = value;
        return this;
    }

    public setContent(value: any): StoreQueryBuilder<T> {
        this._content = value;
        return this;
    }

    public setType(value: { new(arg?: any): T }): StoreQueryBuilder<T> {
        this._type = value;
        return this;
    }

    public build(): StoreQuery<T> | null {
        if (this.identifier == null) return null;
        return new StoreQuery<T>(this.identifier, this.operation, this.content, this.type);
    }

}

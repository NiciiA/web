import {Operation} from "./operation";
import {Query} from "./query";

export abstract class QueryBuilder<T> {

    protected _operation: Operation = Operation.READ;
    protected _content: any;
    protected _type: { new(arg?: any): T } | undefined;

    get operation(): Operation {
        return this._operation;
    }

    get content(): any {
        return this._content;
    }

    get type(): { new(arg?: any): T } | undefined {
        return this._type;
    }

    public abstract build(): Query<T> | null;

}

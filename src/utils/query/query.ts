import {Operation} from "./operation";

export abstract class Query<T> {

    protected readonly _content: any;
    protected readonly _operation: Operation;
    protected _type: { new(arg?: any): T } | undefined;

    protected constructor(content: any, operation: Operation, type: { new(arg?: any): T } | undefined) {
        this._content = content;
        this._operation = operation;
        this._type = type;
    }

    get content(): any {
        return this._content;
    }

    get operation(): Operation {
        return this._operation;
    }

    get type(): { new(arg?: any): T } | undefined {
        return this._type;
    }

}

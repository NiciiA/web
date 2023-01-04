import {DataIdentifier} from "../../../utils/identifier";
import {Operation, Query} from "../../../utils/query";

export class StoreQuery<T> extends Query<T> {

    private readonly _identifier: DataIdentifier;

    constructor(identifier: DataIdentifier, operation: Operation, content: any, type: { new(arg?: any): T } | undefined) {
        super(content, operation, type);

        this._identifier = identifier;
    }

    get identifier(): DataIdentifier {
        return this._identifier;
    }

}

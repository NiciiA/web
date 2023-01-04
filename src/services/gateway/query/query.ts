import {Operation, Query} from "../../../utils/query";
import {ActionIdentifier} from "../../../utils/identifier";

export class GatewayQuery<T> extends Query<T> {

    private readonly _identifier: ActionIdentifier;

    constructor(identifier: ActionIdentifier, operation: Operation, content: any, type: { new(arg?: any): T } | undefined) {
        super(content, operation, type);

        this._identifier = identifier;
    }

    get identifier(): ActionIdentifier {
        return this._identifier;
    }

}

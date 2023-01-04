/**
 * com.deuna.application_object#0
 * com.deuna.watch_popular#1 (für paging und so)
 * application:init
 */
export abstract class Identifier {

    private readonly _module: string;
    private readonly _ref: string;

    constructor(module: string, ref: string) {
        this._module = module;
        this._ref = ref;
    }

    get ref(): string {
        return this._ref;
    }

    get module(): string {
        return this._module;
    }

    abstract toReference(): string;
}

export class PermissionIdentifier extends Identifier {

    private _permission: string;

    constructor(module: string, ref: string, permission: string) {
        super(module, ref);
        this._permission = permission;
    }

    get permission(): string {
        return this._permission;
    }

    toReference(): string {
        return this.module + ':' + this.ref + ':' + this.permission;
    }

}

export class EventIdentifier extends Identifier {

    toReference(): string {
        return this.module + ':' + this.ref;
    }

}

export class ActionIdentifier extends Identifier {

    toReference(): string {
        return this.module + '.' + this.ref;
    }

    toUrl(): string {
        return this.module + '/' + this.ref;
    }

}

export class ModuleIdentifier extends Identifier {

    toReference(): string {
        return this.module + '_' + this.ref;
    }

}

export class DataIdentifier extends ModuleIdentifier {

    private readonly _id: string;

    constructor(module: string, ref: string, id: string) {
        super(module, ref);
        this._id = id;
    }

    get id(): string {
        return this._id;
    }

    toReference(): string {
        return super.toReference() + '#' + this._id;
    }

    toModule(): string {
        return super.toReference();
    }

    public static of(id: string): DataIdentifier | undefined {
        return new DataIdentifier('tv.deuna.auth', 'active', '0');
    }

}

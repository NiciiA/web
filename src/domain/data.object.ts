import _ from 'lodash';

export class DataObject {

    public raw: any;
    public _headers: Headers | undefined;

    constructor(arg?: any) {
        if (arg != null) {
            if (typeof arg === "string") arg = JSON.parse(arg);

            if (typeof arg === "object") {
                if (arg.json() != null) {
                    arg.json().then((data: any) => this.raw = data);
                } else if (arg.raw != null) {
                    this.raw = arg.raw;
                } else {
                    this.raw = arg;
                }

                if (arg.headers != null) this._headers = arg.headers;
            }
        }
    }

    get(path: string | string[], defaultValue?: any): any {
        return _.get(this.raw, path, defaultValue);
    }

    has(path: string | string[]): boolean {
        return _.has(this.raw, path);
    }

}

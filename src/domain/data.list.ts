import {DataObject} from "./data.object";

export class DataList {

    public totalCount = 0;
    public items: DataObject[] = [];
    public previousUrl: string | null | undefined;
    public nextUrl: string | null | undefined;

    public _headers: Headers | undefined;

    constructor(arg?: any) {
        if (arg != null) {
            if (typeof arg === "string") arg = JSON.parse(arg);

            if (Array.isArray(arg)) {
                this.items = arg.map((item: any) => new DataObject(item));
                this.totalCount = this.items.length;
            } else if (typeof arg === 'object') {
                if (arg.json() != null) {
                    arg.json().then((data: any) => {
                        data.headers = arg.headers;
                        this.parseArg(arg);
                    });
                } else {
                    this.parseArg(arg);
                }
            }
        }
    }

    private parseArg(arg: any): void {
        if (Array.isArray(arg.items)) {
            this.items = arg.items.map((item: any) => new DataObject(item));
        }

        if (arg.nextUrl != null) this.nextUrl = arg.nextUrl;
        if (arg.previousUrl != null) this.previousUrl = arg.previousUrl;
        this.totalCount = (arg.totalCount != null) ? arg.totalCount : this.items.length;

        if (arg.headers != null) this._headers = arg.headers;
    }

    concat(list: DataList) {
        this.totalCount = list.totalCount;
        this.previousUrl = list.previousUrl;
        this.nextUrl = list.nextUrl;
        this.items = this.items.concat(list.items);
    }

    replace(list: DataList) {
        this.items = [];
        this.concat(list);
    }

    clear() {
        this.totalCount = 0;
        this.items = [];
        this.previousUrl = null;
        this.nextUrl = null;
    }

}

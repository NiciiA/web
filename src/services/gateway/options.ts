export class Connection {

    private readonly _secure: boolean = false;
    private readonly _port: number = -1;
    private readonly _domain: string;
    private readonly _version: string = "v1.0";

    constructor(arg: {domain: string, secure?: boolean, port?: number, version?: string}) {
        this._domain = arg.domain;
        if (arg.secure) this._secure = arg.secure;
        if (arg.port) this._port = arg.port;
        if (arg.version) this._version = arg.version;
    }

    get secure(): boolean {
        return this._secure;
    }

    get port(): number | undefined {
        return this._port;
    }

    get domain(): string | undefined {
        return this._domain;
    }

    get version(): string {
        return this._version;
    }

    public toUrl(): string {
        return "http" + ((this.secure) ? "s" : "") + "://" + this.domain + ((this.port != -1) ? ":" + this.port : "") + "/api/";
    }

}

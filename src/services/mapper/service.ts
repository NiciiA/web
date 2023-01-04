import {Initializable} from "../../utils/initializable";
import {DataListMapper, DataObjectMapper, Mapper} from "./index";
import {DataList, DataObject} from "../../domain";

export class MapperService implements Initializable {

    private _mapper: Map<{ new(arg?: any): any }, Mapper<any>> = new Map<{ new(arg?: any): any }, Mapper<any>>();

    public set<T>(key: { new(arg?: any): T }, value: Mapper<T>): void {
        this._mapper.set(key, value);
    }

    public get<T>(key: { new(arg?: any): T }): Mapper<T> | undefined {
        return this._mapper.get(key);
    }

    public map<T>(key: { new(arg?: any): T } | undefined, data: any): any {
        let mapper: Mapper<T> | undefined;
        if (key != null) mapper = this.get(key);

        if (mapper == null) return data;
        return mapper.map(data);
    }

    public init(args?: {ref: { new(arg?: any): any }, mapper: Mapper<any>}[]): Promise<void> {
        this.set(DataList, new DataListMapper());
        this.set(DataObject, new DataObjectMapper());

        if (args != null) {
            args.forEach((arg: {ref: { new(arg?: any): any }, mapper: Mapper<any>}) => this.set(arg.ref, arg.mapper));
        }

        return Promise.resolve();
    }

}

import {Mapper} from "../index";
import {DataObject} from "../../../domain";

export class DataObjectMapper implements Mapper<DataObject> {

    map(arg: any): DataObject {
        return new DataObject(arg);
    }

}

import {Mapper} from "../index";
import {DataList} from "../../../domain";

export class DataListMapper implements Mapper<DataList> {

    map(arg: any): DataList {
        return new DataList(arg);
    }

}

import {Query} from "./query";
import {Initializable} from "../initializable";

export interface QueryService extends Initializable {

    exec<T>(query: Query<T>): Promise<T>;

}

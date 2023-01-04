import {StoreQuery} from "./query";
import {Operation, QueryService} from "../../utils/query";
import mapper from "../mapper";

/**
 *         const query1: StoreQuery<DataObject> | null = new StoreQueryBuilder<DataObject>()
 *             .setIdentifier(new DataIdentifier("dev.dejavu.math", "add", "0"))
 *             .setType(DataObject)
 *             .setOperation(Operation.PATCH)
 *             .setContent({a: 5, b: 9})
 *             .build();
 *         if (query1 != null) localStore.exec<DataObject>(query1).then((res: DataObject) => console.log(res));
 *
 *         const query2: StoreQuery<DataObject> | null = new StoreQueryBuilder<DataObject>()
 *             .setIdentifier(new DataIdentifier("dev.dejavu.math", "add", "0"))
 *             .setType(DataObject)
 *             .build();
 *         if (query2 != null) localStore.exec<DataObject>(query2).then((res: DataObject) => console.log(res));
 *
 *         const query3: StoreQuery<DataObject> | null = new StoreQueryBuilder<DataObject>()
 *             .setIdentifier(new DataIdentifier("dev.dejavu.math", "add", "0"))
 *             .setType(DataObject)
 *             .setOperation(Operation.DELETE)
 *             .build();
 *         if (query3 != null) localStore.exec<DataObject>(query3).then((res: DataObject) => console.log(res));
 *
 *         const query4: StoreQuery<DataObject> | null = new StoreQueryBuilder<DataObject>()
 *             .setIdentifier(new DataIdentifier("dev.dejavu.math", "add", "0"))
 *             .setType(DataObject)
 *             .build();
 *         if (query4 != null) localStore.exec<DataObject>(query4).then((res: DataObject) => console.log(res));
 *
 *         const query5: StoreQuery<string> | null = new StoreQueryBuilder<string>()
 *             .setIdentifier(new DataIdentifier("dev.dejavu.math", "sub", "0"))
 *             .build();
 *         if (query5 != null) localStore.exec<string>(query5).then((res: string) => console.log(res));
 *
 *         const query6: StoreQuery<string> | null = new StoreQueryBuilder<string>()
 *             .setIdentifier(new DataIdentifier("dev.dejavu.math", "sub", "0"))
 *             .setOperation(Operation.PATCH)
 *             .setContent("contentsss")
 *             .build();
 *         if (query6 != null) localStore.exec<string>(query6).then((res: string) => console.log(res));
 *
 *         const query7: StoreQuery<string> | null = new StoreQueryBuilder<string>()
 *             .setIdentifier(new DataIdentifier("dev.dejavu.math", "sub", "0"))
 *             .build();
 *         if (query7 != null) localStore.exec<string>(query7).then((res: string) => console.log(res));
 *
 *         const query8: StoreQuery<string> | null = new StoreQueryBuilder<string>()
 *             .setIdentifier(new DataIdentifier("dev.dejavu.math", "sub", "0"))
 *             .setOperation(Operation.DELETE)
 *             .build();
 *         if (query8 != null) localStore.exec<string>(query8).then((res: string) => console.log(res));
 *
 *         const query9: StoreQuery<string> | null = new StoreQueryBuilder<string>()
 *             .setIdentifier(new DataIdentifier("dev.dejavu.math", "sub", "0"))
 *             .build();
 *         if (query9 != null) localStore.exec<string>(query9).then((res: string) => console.log(res));
 *
 *         const query10: StoreQuery<DataObject> | null = new StoreQueryBuilder<DataObject>()
 *             .setIdentifier(new DataIdentifier("dev.dejavu.math", "add", "1"))
 *             .setType(DataObject)
 *             .setOperation(Operation.PATCH)
 *             .setContent(new DataObject({a: 5, b: 9}))
 *             .build();
 *         if (query10 != null) localStore.exec<DataObject>(query10).then((res: DataObject) => console.log(res));
 *
 *         const query11: StoreQuery<DataObject> | null = new StoreQueryBuilder<DataObject>()
 *             .setIdentifier(new DataIdentifier("dev.dejavu.math", "add", "1"))
 *             .setType(DataObject)
 *             .build();
 *         if (query11 != null) localStore.exec<DataObject>(query11).then((res: DataObject) => console.log(res));
 *
 *         const query12: StoreQuery<DataObject> | null = new StoreQueryBuilder<DataObject>()
 *             .setIdentifier(new DataIdentifier("dev.dejavu.math", "add", "1"))
 *             .setType(DataObject)
 *             .setOperation(Operation.DELETE)
 *             .build();
 *         if (query12 != null) localStore.exec<DataObject>(query12).then((res: DataObject) => console.log(res));
 */
export abstract class Store implements QueryService {

    abstract init(args?: any): Promise<void>;

    public exec<T>(query: StoreQuery<T>): Promise<T> {
        console.log('store:', query);
        let promise: Promise<T>;

        switch (query.operation) {
            case Operation.READ: {
                promise = this.read(query);
                break;
            }
            case Operation.PATCH: {
                promise = this.patch(query);
                break;
            }
            case Operation.DELETE: {
                promise = this.delete(query);
                break;
            }
            default: {
                promise = Promise.reject("unsupported operation type");
                break;
            }
        }

        return promise.then((item: any) => mapper.map(query.type, item));
    }

    protected abstract read<T>(query: StoreQuery<T>): Promise<any>;
    protected abstract patch<T>(query: StoreQuery<T>): Promise<any>;
    protected abstract delete<T>(query: StoreQuery<T>): Promise<any>;

}

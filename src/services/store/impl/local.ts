import {DataIdentifier} from '../../../utils/identifier';
import {Store} from "../index";
import {StoreQuery} from "../query";

export class LocalStore extends Store {
    protected delete<T>(query: StoreQuery<T>): Promise<any> {
        const identifier: DataIdentifier = query.identifier;

        const item: string | null = localStorage.getItem(identifier.toReference());
        localStorage.removeItem(identifier.toReference());

        return Promise.resolve(item);
    }

    protected patch<T>(query: StoreQuery<T>): Promise<any> {
        const identifier: DataIdentifier = query.identifier;
        let item: any = query.content;

        if (item == null) return Promise.reject("query content cannot be null");
        item = JSON.stringify(item);

        localStorage.setItem(identifier.toReference(), item);
        return Promise.resolve(item);
    }

    protected read<T>(query: StoreQuery<T>): Promise<any> {
        const identifier: DataIdentifier = query.identifier;

        const item: string | null = localStorage.getItem(identifier.toReference());

        return Promise.resolve(item);
    }

    public init(): Promise<void> {
        return Promise.resolve();
    }

}

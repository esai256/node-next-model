import { ModelStatic, ModelConstructor, Identifiable, Bindings, Storage, ConnectorConstructor } from './types';
export declare class Connector<S extends Identifiable> implements ConnectorConstructor<S> {
    private storage;
    constructor(storage?: Storage);
    private collection;
    private items;
    private propertyFilter;
    private andFilter;
    private notFilter;
    private orFilter;
    private inFilter;
    private notInFilter;
    private nullFilter;
    private notNullFilter;
    private betweenFilter;
    private notBetweenFilter;
    private gtFilter;
    private gteFilter;
    private ltFilter;
    private lteFilter;
    private rawFilter;
    private asyncFilter;
    private specialFilter;
    private filter;
    query(model: ModelStatic<S>): Promise<ModelConstructor<S>[]>;
    count(model: ModelStatic<S>): Promise<number>;
    select(model: ModelStatic<S>, ...keys: (keyof S)[]): Promise<S[keyof S][][]>;
    updateAll(model: ModelStatic<S>, attrs: Partial<S>): Promise<number>;
    deleteAll(model: ModelStatic<S>): Promise<number>;
    create(instance: ModelConstructor<S>): Promise<ModelConstructor<S>>;
    update(instance: ModelConstructor<S>): Promise<ModelConstructor<S>>;
    delete(instance: ModelConstructor<S>): Promise<ModelConstructor<S>>;
    execute(query: string, bindings: Bindings): Promise<any[]>;
}
export default Connector;

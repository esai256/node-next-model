import { prototype } from "stream";

export type BaseType = number | string | boolean | null | undefined;

export interface Tuple<T> {
  [key: number]: T;
  length: 2;
};

export interface Dict<T> {
  [key: string]: T;
};

export type FilterProperty<T extends Schema> = Partial<T>;
export type FilterIn<T extends Schema> = {
  [P in keyof T]: Array<T[P]>;
};
export type FilterBetween<T extends Schema> = {
  [P in keyof T]: Tuple<T[P]>;
};
export type FilterGreaterThen<T extends Schema> = Partial<T>;
export type FilterGreaterThenEquals<T extends Schema> = Partial<T>;
export type FilterLowerThen<T extends Schema> = Partial<T>;
export type FilterLowerThenEquals<T extends Schema> = Partial<T>;

export interface FilterRaw {
  $bindings: BaseType[] | { [key: string]: BaseType };
  $query: string;
};

export type Filter<T extends Schema> = {
  $and?: Filter<T> | FilterProperty<T> | (Filter<T> | FilterProperty<T>)[];
  $not?: Filter<T> | FilterProperty<T> | (Filter<T> | FilterProperty<T>)[];
  $or?: Filter<T> | FilterProperty<T> | (Filter<T> | FilterProperty<T>)[];

  $in?: FilterIn<T> | FilterIn<T>[];
  $notIn?: FilterIn<T> | FilterIn<T>[];

  $null?: string | string[];
  $notNull?: string | string[];

  $between?: FilterBetween<T> | FilterBetween<T>[];
  $notBetween?: FilterBetween<T> | FilterBetween<T>[];

  $raw?: FilterRaw | FilterRaw[];
};

export interface StrictFilter<T extends Schema> {
  $and?: (Filter<T> | FilterProperty<T>)[];
  $not?: (Filter<T> | FilterProperty<T>)[];
  $or?: (Filter<T> | FilterProperty<T>)[];

  $in?: FilterIn<T>[];
  $notIn?: FilterIn<T>[];

  $null?: string[];
  $notNull?: string[];

  $between?: FilterBetween<T>[];
  $notBetween?: FilterBetween<T>[];

  $raw?: FilterRaw[];
};

export interface Relation {
  model: ModelStatic<Schema>;
  foreignKey?: string;
};

export interface StrictRelation {
  model: ModelStatic<Schema>;
  foreignKey: string;
};

export type BelongsTo = Dict<Relation>;
export type HasOne = Dict<Relation>;
export type HasMany = Dict<Relation>;

export type StrictBelongsTo = Dict<StrictRelation>;
export type StrictHasOne = Dict<StrictRelation>;
export type StrictHasMany = Dict<StrictRelation>;

export type Schema = any;

export interface ModelStatic<T extends Schema> {
  readonly modelName: string;
  readonly schema: T;

  // new(...args: any[]): ModelConstructor<T>;
  prototype: T;
  new(params: Partial<T>): ModelConstructor<T>;
  // protptype: ModelConstructor<T>;

  readonly defaultFilter?: Filter<T>;
  readonly belongsTo?: BelongsTo;
  readonly hasOne?: HasOne;
  readonly hasMany?: HasMany;

  readonly strictDefaultFilter: StrictFilter<T>;
  readonly strictBelongsTo: StrictBelongsTo;
  readonly strictHasOne: StrictHasOne;
  readonly strictHasMany: StrictHasMany;
}

export interface ModelConstructor<T extends Schema> {
  readonly model: ModelStatic<T>;
}

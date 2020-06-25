import * as IoTs from 'io-ts';

export const stringEnum = <T>(enumObj: T, enumName = 'enum'): IoTs.Type<T[keyof T], string> =>
    new IoTs.Type<T[keyof T], string>(
        enumName,
        (u): u is T[keyof T] => Object.values(enumObj).includes(u),
        (u, c) => (Object.values(enumObj).includes(u) ? IoTs.success(u as T[keyof T]) : IoTs.failure(u, c)),
        (a) => (a as unknown) as string
    );

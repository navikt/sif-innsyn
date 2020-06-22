import { fetchJson } from './api';
import { sequenceT } from 'fp-ts/es6/Apply';
import * as E from 'fp-ts/es6/Either';
import * as IoTs from 'io-ts/es6';

export interface FetchRecipe<P extends IoTs.Props> {
    url: string;
    init?: RequestInit;
    validator: IoTs.TypeC<P>;
}

export async function fetchFunc1<P1 extends IoTs.Props, T1>(
    recipies: [FetchRecipe<P1>]
): Promise<E.Either<Error, [T1]>> {
    const [p1recipe] = recipies;
    const t1: E.Either<Error, T1> = await fetchJson<P1, T1>(p1recipe.url, p1recipe.validator, p1recipe.init);
    return Promise.resolve(sequenceT(E.either)(t1));
}

export async function fetchFunc2<P1 extends IoTs.Props, T1, P2 extends IoTs.Props, T2>(
    recipies: [FetchRecipe<P1>, FetchRecipe<P2>]
): Promise<E.Either<Error, [T1, T2]>> {
    const [p1recipe, p2recipe] = recipies;
    const t1: E.Either<Error, T1> = await fetchJson<P1, T1>(p1recipe.url, p1recipe.validator, p1recipe.init);
    const t2: E.Either<Error, T2> = await fetchJson<P2, T2>(p2recipe.url, p2recipe.validator, p2recipe.init);
    return Promise.resolve(sequenceT(E.either)(t1, t2));
}

export async function fetchFunc3<P1 extends IoTs.Props, T1, P2 extends IoTs.Props, T2, P3 extends IoTs.Props, T3>(
    recipies: [FetchRecipe<P1>, FetchRecipe<P2>, FetchRecipe<P3>]
): Promise<E.Either<Error, [T1, T2, T3]>> {
    const [p1recipe, p2recipe, p3recipe] = recipies;
    const t1: E.Either<Error, T1> = await fetchJson<P1, T1>(p1recipe.url, p1recipe.validator, p1recipe.init);
    const t2: E.Either<Error, T2> = await fetchJson<P2, T2>(p2recipe.url, p2recipe.validator, p2recipe.init);
    const t3: E.Either<Error, T3> = await fetchJson<P3, T3>(p3recipe.url, p3recipe.validator, p3recipe.init);
    return Promise.resolve(sequenceT(E.either)(t1, t2, t3));
}

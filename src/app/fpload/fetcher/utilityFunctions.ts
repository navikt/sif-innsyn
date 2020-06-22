import { fetchJson } from './api';
import { sequenceT } from 'fp-ts/es6/Apply';
import * as E from 'fp-ts/es6/Either';
import * as IoTs from 'io-ts/es6';

export interface FetchRecipe<P extends IoTs.Props> {
    url: string;
    init?: RequestInit;
    validator: IoTs.TypeC<P>;
}

export async function fetchFunc1<P1 extends IoTs.Props>(recipies: [FetchRecipe<P1>]): Promise<E.Either<Error, [P1]>> {
    const [t1recipe] = recipies;
    const resultT1: E.Either<Error, P1> = await fetchJson<P1>(t1recipe.url, t1recipe.validator, t1recipe.init);
    return Promise.resolve(sequenceT(E.either)(resultT1));
}

export async function fetchFunc2<P1 extends IoTs.Props, P2 extends IoTs.Props>(
    recipies: [FetchRecipe<P1>, FetchRecipe<P2>]
): Promise<E.Either<Error, [P1, P2]>> {
    const [t1recipe, t2recipe] = recipies;
    const resultT1: E.Either<Error, P1> = await fetchJson<P1>(t1recipe.url, t1recipe.validator, t1recipe.init);
    const resultT2: E.Either<Error, P2> = await fetchJson<P2>(t2recipe.url, t2recipe.validator, t2recipe.init);
    return Promise.resolve(sequenceT(E.either)(resultT1, resultT2));
}

export async function fetchFunc3<P1 extends IoTs.Props, P2 extends IoTs.Props, P3 extends IoTs.Props>(
    recipies: [FetchRecipe<P1>, FetchRecipe<P2>, FetchRecipe<P3>]
): Promise<E.Either<Error, [P1, P2, P3]>> {
    const [t1recipe, t2recipe, t3recipe] = recipies;
    const resultT1: E.Either<Error, P1> = await fetchJson<P1>(t1recipe.url, t1recipe.validator, t1recipe.init);
    const resultT2: E.Either<Error, P2> = await fetchJson<P2>(t2recipe.url, t2recipe.validator, t2recipe.init);
    const resultT3: E.Either<Error, P3> = await fetchJson<P3>(t3recipe.url, t3recipe.validator, t3recipe.init);
    return Promise.resolve(sequenceT(E.either)(resultT1, resultT2, resultT3));
}

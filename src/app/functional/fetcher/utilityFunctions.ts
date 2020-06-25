import { fetchJson } from './api';
import { sequenceT } from 'fp-ts/lib/Apply';
import * as E from 'fp-ts/lib/Either';
import * as IoTs from 'io-ts';
import { AxiosRequestConfig } from 'axios';

export interface FetchRecipe<P> {
    url: string;
    init?: AxiosRequestConfig;
    validator: IoTs.Type<P>;
}

export async function fetchFunc1<P1>(recipies: [FetchRecipe<P1>]): Promise<E.Either<Error, [P1]>> {
    const [p1recipe] = recipies;
    const p1: E.Either<Error, P1> = await fetchJson<P1>(p1recipe.url, p1recipe.validator, p1recipe.init);
    return Promise.resolve(sequenceT(E.either)(p1));
}

export async function fetchFunc2<P1, P2>(
    recipies: [FetchRecipe<P1>, FetchRecipe<P2>]
): Promise<E.Either<Error, [P1, P2]>> {
    const [p1recipe, p2recipe] = recipies;
    const p1: E.Either<Error, P1> = await fetchJson<P1>(p1recipe.url, p1recipe.validator, p1recipe.init);
    const p2: E.Either<Error, P2> = await fetchJson<P2>(p2recipe.url, p2recipe.validator, p2recipe.init);
    return Promise.resolve(sequenceT(E.either)(p1, p2));
}

export async function fetchFunc3<P1, P2, P3>(
    recipies: [FetchRecipe<P1>, FetchRecipe<P2>, FetchRecipe<P3>]
): Promise<E.Either<Error, [P1, P2, P3]>> {
    const [p1recipe, p2recipe, p3recipe] = recipies;
    const p1: E.Either<Error, P1> = await fetchJson<P1>(p1recipe.url, p1recipe.validator, p1recipe.init);
    const p2: E.Either<Error, P2> = await fetchJson<P2>(p2recipe.url, p2recipe.validator, p2recipe.init);
    const p3: E.Either<Error, P3> = await fetchJson<P3>(p3recipe.url, p3recipe.validator, p3recipe.init);
    return Promise.resolve(sequenceT(E.either)(p1, p2, p3));
}

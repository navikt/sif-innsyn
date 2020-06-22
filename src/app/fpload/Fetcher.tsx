import * as React from 'react';
import { useEffect, useState } from 'react';
import { Type } from 'io-ts';
import * as E from 'fp-ts/es6/Either';
import { fetchJson } from './api';
import Remote from './Remote';
import { sequenceT } from 'fp-ts/es6/Apply';

interface FetchingRecipe<A, O, I> {
    url: string;
    init?: RequestInit;
    validator: Type<A, O, I>;
}

interface FetcherProps<T1, O1, I1, T2, O2, I2, T3, O3, I3> {
    // TODO: kun <T>
    fetch: [FetchingRecipe<T1, O1, I1>, FetchingRecipe<T2, O2, I2>, FetchingRecipe<T3, O3, I3>];
    loading: () => JSX.Element;
    error: (error: Error) => JSX.Element;
    success: (data: [T1, T2, T3]) => JSX.Element;
}

export interface FetcherState<T1, O1, I1, T2, O2, I2, T3, O3, I3> {
    fetchedData: E.Either<Error | null, [T1, T2, T3]>;
    doApiCalls: boolean;
}

export function Fetcher<T1, O1, I1, T2, O2, I2, T3, O3, I3>(props: FetcherProps<T1, O1, I1, T2, O2, I2, T3, O3, I3>) {
    const { fetch, success, loading, error } = props;
    const [state, setState] = useState<FetcherState<T1, O1, I1, T2, O2, I2, T3, O3, I3>>({
        fetchedData: E.left(null),
        doApiCalls: true,
    });

    useEffect(() => {
        if (state.doApiCalls) {
            (async () => {
                const [t1recipe, t2recipe, t3recipe] = fetch;
                const resultT1: E.Either<Error, T1> = await fetchJson(t1recipe.url, t1recipe.validator, t1recipe.init);
                const resultT2: E.Either<Error, T2> = await fetchJson(t2recipe.url, t2recipe.validator, t2recipe.init);
                const resultT3: E.Either<Error, T3> = await fetchJson(t3recipe.url, t3recipe.validator, t3recipe.init);

                setState({ fetchedData: sequenceT(E.either)(resultT1, resultT2, resultT3), doApiCalls: false });
            })();
        }
    });

    return <Remote<[T1, T2, T3]> loading={loading} error={error} data={state.fetchedData} success={success} />;
}

export default Fetcher;

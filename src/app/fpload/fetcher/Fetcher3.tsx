import * as React from 'react';
import { useEffect, useState } from 'react';
import * as E from 'fp-ts/lib/Either';
import Remote from './Remote';
import * as IoTs from 'io-ts/lib';
import { fetchFunc3, FetchRecipe } from './utilityFunctions';

interface FetcherProps<P1 extends IoTs.Props, T1, P2 extends IoTs.Props, T2, P3 extends IoTs.Props, T3> {
    recipies: [FetchRecipe<P1>, FetchRecipe<P2>, FetchRecipe<P3>];
    loading: () => JSX.Element;
    error: (error: Error) => JSX.Element;
    success: (data: [T1, T2, T3]) => JSX.Element;
}

export interface FetcherState<T1, T2, T3> {
    fetchedData: E.Either<Error | null, [T1, T2, T3]>;
    doApiCalls: boolean;
}

export function Fetcher3<P1 extends IoTs.Props, T1, P2 extends IoTs.Props, T2, P3 extends IoTs.Props, T3>({
    error,
    loading,
    recipies,
    success,
}: FetcherProps<P1, T1, P2, T2, P3, T3>) {
    const [state, setState] = useState<FetcherState<T1, T2, T3>>({
        fetchedData: E.left(null),
        doApiCalls: true,
    });

    useEffect(() => {
        if (state.doApiCalls) {
            (async () => {
                const result: E.Either<Error, [T1, T2, T3]> = await fetchFunc3<P1, T1, P2, T2, P3, T3>(recipies);
                setState({ fetchedData: result, doApiCalls: false });
            })();
        }
    });

    return <Remote<[T1, T2, T3]> loading={loading} error={error} data={state.fetchedData} success={success} />;
}

export default Fetcher3;

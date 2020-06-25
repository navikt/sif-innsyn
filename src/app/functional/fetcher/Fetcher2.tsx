import * as React from 'react';
import { useEffect, useState } from 'react';
import * as E from 'fp-ts/lib/Either';
import Remote from './Remote';
import * as IoTs from 'io-ts/lib';
import { fetchFunc2, FetchRecipe } from './utilityFunctions';

interface FetcherProps<P1 extends IoTs.Props, T1, P2 extends IoTs.Props, T2> {
    recipies: [FetchRecipe<P1>, FetchRecipe<P2>];
    loading: () => JSX.Element;
    error: (error: Error) => JSX.Element;
    success: (data: [T1, T2]) => JSX.Element;
}

export interface FetcherState<T1, T2> {
    fetchedData: E.Either<Error | null, [T1, T2]>;
    doApiCalls: boolean;
}

export function Fetcher2<P1 extends IoTs.Props, T1, P2 extends IoTs.Props, T2>({
    error,
    loading,
    recipies,
    success,
}: FetcherProps<P1, T1, P2, T2>) {
    const [state, setState] = useState<FetcherState<T1, T2>>({
        fetchedData: E.left(null),
        doApiCalls: true,
    });

    useEffect(() => {
        if (state.doApiCalls) {
            (async () => {
                const result: E.Either<Error, [T1, T2]> = await fetchFunc2<P1, T1, P2, T2>(recipies);
                setState({ fetchedData: result, doApiCalls: false });
            })();
        }
    });

    return <Remote<[T1, T2]> loading={loading} error={error} data={state.fetchedData} success={success} />;
}

export default Fetcher2;

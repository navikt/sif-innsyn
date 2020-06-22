import * as React from 'react';
import { useEffect, useState } from 'react';
import * as E from 'fp-ts/es6/Either';
import Remote from './Remote';
import * as IoTs from 'io-ts/es6';
import { fetchFunc1, FetchRecipe } from './utilityFunctions';

interface FetcherProps<P1 extends IoTs.Props, T1> {
    recipies: [FetchRecipe<P1>];
    loading: () => JSX.Element;
    error: (error: Error) => JSX.Element;
    success: (data: [T1]) => JSX.Element;
}

export interface FetcherState<P1> {
    fetchedData: E.Either<Error | null, [P1]>;
    doApiCalls: boolean;
}

export function Fetcher<P1 extends IoTs.Props, T1>(props: FetcherProps<P1, T1>) {
    const { recipies, success, loading, error } = props;
    const [state, setState] = useState<FetcherState<T1>>({
        fetchedData: E.left(null),
        doApiCalls: true,
    });

    useEffect(() => {
        if (state.doApiCalls) {
            (async () => {
                const result: E.Either<Error, [T1]> = await fetchFunc1<P1, T1>(recipies);
                setState({ fetchedData: result, doApiCalls: false });
            })();
        }
    });

    return <Remote<[T1]> data={state.fetchedData} loading={loading} error={error} success={success} />;
}

export default Fetcher;

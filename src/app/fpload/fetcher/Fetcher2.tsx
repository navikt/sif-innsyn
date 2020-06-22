import * as React from 'react';
import { useEffect, useState } from 'react';
import * as E from 'fp-ts/es6/Either';
import Remote from './Remote';
import * as IoTs from 'io-ts/es6';
import { fetchFunc2, FetchRecipe } from './utilityFunctions';

interface FetcherProps<P1 extends IoTs.Props, P2 extends IoTs.Props> {
    recipies: [FetchRecipe<P1>, FetchRecipe<P2>];
    loading: () => JSX.Element;
    error: (error: Error) => JSX.Element;
    success: (data: [P1, P2]) => JSX.Element;
}

export interface FetcherState<P1, P2> {
    fetchedData: E.Either<Error | null, [P1, P2]>;
    doApiCalls: boolean;
}

export function Fetcher2<P1 extends IoTs.Props, P2 extends IoTs.Props>(props: FetcherProps<P1, P2>) {
    const { recipies, success, loading, error } = props;
    const [state, setState] = useState<FetcherState<P1, P2>>({
        fetchedData: E.left(null),
        doApiCalls: true,
    });

    useEffect(() => {
        if (state.doApiCalls) {
            (async () => {
                const result: E.Either<Error, [P1, P2]> = await fetchFunc2<P1, P2>(recipies);
                setState({ fetchedData: result, doApiCalls: false });
            })();
        }
    });

    return <Remote<[P1, P2]> loading={loading} error={error} data={state.fetchedData} success={success} />;
}

export default Fetcher2;

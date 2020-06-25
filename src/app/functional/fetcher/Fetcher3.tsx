import * as React from 'react';
import { useEffect, useState } from 'react';
import * as E from 'fp-ts/lib/Either';
import Remote from './Remote';
import { fetchFunc3, FetchRecipe } from './utilityFunctions';

interface FetcherProps<P1, P2, P3> {
    recipies: [FetchRecipe<P1>, FetchRecipe<P2>, FetchRecipe<P3>];
    loading: () => JSX.Element;
    error: (error: Error) => JSX.Element;
    success: (data: [P1, P2, P3]) => JSX.Element;
}

export interface FetcherState<P1, P2, P3> {
    fetchedData: E.Either<Error | null, [P1, P2, P3]>;
    doApiCalls: boolean;
}

export function Fetcher3<P1, P2, P3>({ error, loading, recipies, success }: FetcherProps<P1, P2, P3>) {
    const [state, setState] = useState<FetcherState<P1, P2, P3>>({
        fetchedData: E.left(null),
        doApiCalls: true,
    });

    useEffect(() => {
        if (state.doApiCalls) {
            (async () => {
                const result: E.Either<Error, [P1, P2, P3]> = await fetchFunc3<P1, P2, P3>(recipies);
                setState({ fetchedData: result, doApiCalls: false });
            })();
        }
    });

    return <Remote<[P1, P2, P3]> loading={loading} error={error} data={state.fetchedData} success={success} />;
}

export default Fetcher3;

import { Type } from 'io-ts';
import React, { useEffect, useState } from 'react';
import { Either } from 'fp-ts/lib/Either';
import * as E from 'fp-ts/lib/Either';
import { fetchJson } from './api';
import Remote from './Remote';

interface FetchableProps<T, O, I> {
    url: string;
    init?: RequestInit;
    validator: Type<T, O, I>;
    loading: () => JSX.Element;
    error: (error: Error) => JSX.Element;
    success: (data: T) => JSX.Element;
}

interface FetchableState<T> {
    doApiCalls: boolean;
    data: Either<Error | null, T>;
}

export function Fetchable<T, O, I>(props: FetchableProps<T, O, I>) {
    const { url, init, validator, loading, error, success } = props;
    const [state, setState] = useState<FetchableState<T>>({ data: E.left(null), doApiCalls: true });

    useEffect(() => {
        if (state.doApiCalls) {
            (async () => {
                const result: E.Either<Error | null, T> = await fetchJson(url, validator, init);
                setState({
                    data: result,
                    doApiCalls: false,
                });
            })();
        }
    });

    return <Remote<T> loading={loading} error={error} data={state.data} success={success} />;
}

export default Fetchable;

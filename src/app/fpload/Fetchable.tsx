import { Type } from 'io-ts';
import React, { useEffect, useState } from 'react';
import { Either } from 'fp-ts/lib/Either';
import * as E from 'fp-ts/lib/Either';
import { fetchJson } from './api';
import Remote from './Remote';

export interface ApiDescription<T, O, I> {
    url: string;
    init?: RequestInit;
    validator: Type<T, O, I>;
}

/*
FetchableState sin data er av typen Either<Error | null, T>.
case left null -> kjører loading
case left Error -> kjører error
case right T -> kjører success med data av typen T
*/
export interface FetchableProps<T, O, I> extends ApiDescription<T, O, I> {
    loading: () => JSX.Element;
    error: (error: Error) => JSX.Element;
    success: (data: T) => JSX.Element;
}

interface FetchableState<T> {
    doApiCall: boolean;
    data: Either<Error | null, T>;
}

export function Fetchable<T, O, I>(props: FetchableProps<T, O, I>) {
    const { url, init, validator, loading, error, success } = props;
    const [state, setState] = useState<FetchableState<T>>({ data: E.left(null), doApiCall: true });

    useEffect(() => {
        if (state.doApiCall) {
            (async () => {
                const result: E.Either<Error | null, T> = await fetchJson(url, validator, init);
                setState({
                    data: result,
                    doApiCall: false,
                });
            })();
        }
    });

    return <Remote<T> loading={loading} error={error} data={state.data} success={success} />;
}

export default Fetchable;

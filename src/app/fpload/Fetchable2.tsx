import React, { useEffect, useState } from 'react';
import * as E from 'fp-ts/lib/Either';
import { Either } from 'fp-ts/lib/Either';
import { fetchJson } from './api';
import Remote from './Remote';
import { ApiDescription } from './Fetchable';
import { pipe } from 'fp-ts/lib/pipeable';

export interface EssentialData2<T1, T2> {
    t1: T1;
    t2: T2;
}

export interface Fetchable2Props<T1, O1, I1, T2, O2, I2> {
    t1recipe: ApiDescription<T1, O1, I1>;
    t2recipe: ApiDescription<T2, O2, I2>;
    loading: () => JSX.Element;
    error: (error: Error) => JSX.Element;
    success: (data: EssentialData2<T1, T2>) => JSX.Element;
}

interface FetchTwoThingsState<T1, T2> {
    doApiCalls: boolean;
    data: Either<Error | null, EssentialData2<T1, T2>>;
}

export function Fetchable2<T1, O1, I1, T2, O2, I2>(props: Fetchable2Props<T1, O1, I1, T2, O2, I2>) {
    const { t1recipe, t2recipe, success, loading, error } = props;
    const [state, setState] = useState<FetchTwoThingsState<T1, T2>>({
        data: E.left(null),
        doApiCalls: true,
    });

    useEffect(() => {
        if (state.doApiCalls) {
            (async () => {
                const resultT1: E.Either<Error, T1> = await fetchJson(t1recipe.url, t1recipe.validator, t1recipe.init);
                const resultT2: E.Either<Error, T2> = await fetchJson(t2recipe.url, t2recipe.validator, t2recipe.init);

                const essentialData2: Either<Error, EssentialData2<T1, T2>> = pipe(
                    resultT1,
                    E.fold(
                        (t1error: Error) => {
                            return pipe(
                                resultT2,
                                E.fold(
                                    (t2error) => {
                                        return E.left(t2error); // TODO: Combine the two errors
                                    },
                                    (t2) => {
                                        return E.left(t1error); // Since t1 was successfully retrieved, returning error1
                                    }
                                )
                            );
                        },
                        (t1: T1) => {
                            return pipe(
                                resultT2,
                                E.fold(
                                    (t2error) => {
                                        return E.left(t2error);
                                    },
                                    (t2: T2) => {
                                        return E.right({
                                            t1: t1,
                                            t2: t2,
                                        });
                                    }
                                )
                            );
                        }
                    )
                );
                setState({ data: essentialData2, doApiCalls: false });
            })();
        }
    });

    return <Remote<EssentialData2<T1, T2>> loading={loading} error={error} data={state.data} success={success} />;
}

export default Fetchable2;

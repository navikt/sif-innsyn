import React, { useEffect, useState } from 'react';
import * as E from 'fp-ts/lib/Either';
import { Either } from 'fp-ts/lib/Either';
import { fetchJson } from './api';
import Remote from './Remote';
import { ApiDescription } from './Fetchable';
import { pipe } from 'fp-ts/lib/pipeable';
import { EssentialData2 } from './Fetchable2';

export interface EssentialData3<T1, T2, T3> {
    t1: T1;
    t2: T2;
    t3: T3;
}

export interface Fetchable3Props<T1, O1, I1, T2, O2, I2, T3, O3, I3> {
    t1recipe: ApiDescription<T1, O1, I1>;
    t2recipe: ApiDescription<T2, O2, I2>;
    t3recipe: ApiDescription<T3, O3, I3>;
    loading: () => JSX.Element;
    error: (error: Error) => JSX.Element;
    success: (data: EssentialData3<T1, T2, T3>) => JSX.Element;
}

interface FetchTwoThingsState<T1, T2, T3> {
    doApiCalls: boolean;
    data: Either<Error | null, EssentialData3<T1, T2, T3>>;
}

export function Fetchable3<T1, O1, I1, T2, O2, I2, T3, O3, I3>(
    props: Fetchable3Props<T1, O1, I1, T2, O2, I2, T3, O3, I3>
) {
    const { t1recipe, t2recipe, t3recipe, success, loading, error } = props;
    const [state, setState] = useState<FetchTwoThingsState<T1, T2, T3>>({
        data: E.left(null),
        doApiCalls: true,
    });

    useEffect(() => {
        if (state.doApiCalls) {
            (async () => {
                const resultT1: E.Either<Error, T1> = await fetchJson(t1recipe.url, t1recipe.validator, t1recipe.init);
                const resultT2: E.Either<Error, T2> = await fetchJson(t2recipe.url, t2recipe.validator, t2recipe.init);
                const resultT3: E.Either<Error, T3> = await fetchJson(t3recipe.url, t3recipe.validator, t3recipe.init);

                const eitherEssentialData2: Either<Error, EssentialData2<T1, T2>> = pipe(
                    resultT1,
                    E.fold(
                        (t1error: Error) =>
                            pipe(
                                resultT2,
                                E.fold(
                                    (t2error) => E.left(t2error), // TODO: Combine the two errors
                                    (t2) => E.left(t1error) // Since t1 was successfully retrieved, returning error1
                                )
                            ),
                        (t1: T1) =>
                            pipe(
                                resultT2,
                                E.fold(
                                    (t2error) => E.left(t2error),
                                    (t2: T2) =>
                                        E.right({
                                            t1: t1,
                                            t2: t2,
                                        })
                                )
                            )
                    )
                );

                const eitherEssentialData3: Either<Error, EssentialData3<T1, T2, T3>> = pipe(
                    eitherEssentialData2,
                    E.fold(
                        (essentialData2error: Error) =>
                            pipe(
                                resultT3,
                                E.fold(
                                    (t3error) => E.left(t3error), // TODO: Combine the two errors
                                    (t2) => E.left(essentialData2error) // Since t1 was successfully retrieved, returning error1
                                )
                            ),
                        (essentialData2: EssentialData2<T1, T2>) =>
                            pipe(
                                resultT3,
                                E.fold(
                                    (t3error) => E.left(t3error),
                                    (t3: T3) =>
                                        E.right({
                                            t1: essentialData2.t1,
                                            t2: essentialData2.t2,
                                            t3: t3,
                                        })
                                )
                            )
                    )
                );

                setState({ data: eitherEssentialData3, doApiCalls: false });
            })();
        }
    });

    return <Remote<EssentialData3<T1, T2, T3>> loading={loading} error={error} data={state.data} success={success} />;
}

export default Fetchable3;

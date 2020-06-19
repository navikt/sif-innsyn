import React from 'react';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';

interface RemoteProps<T> {
    data: E.Either<Error | null, T>;
    loading: () => JSX.Element;
    error: (error: Error) => JSX.Element;
    success: (data: T) => JSX.Element;
}

export function Remote<T>(props: RemoteProps<T>) {
    return (
        <React.Fragment>
            {pipe(
                props.data,
                E.fold(
                    (l) => {
                        if (l === null) {
                            return props.loading();
                        } else {
                            return props.error(l);
                        }
                    },
                    (r) => {
                        return props.success(r);
                    }
                )
            )}
        </React.Fragment>
    );
}

export default Remote;

import React from 'react';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { isForbidden, isUnauthorized } from '../../utils/apiUtils';
import { navigateToLoginPage } from '../../utils/navigationUtils';
import { AxiosError } from 'axios';

interface RemoteProps<T> {
    data: E.Either<Error | null, T>;
    loading: () => JSX.Element;
    error: (error: Error) => JSX.Element;
    success: (data: T) => JSX.Element;
}

export const hasResponseStatus = (value: any): value is AxiosError =>
    !!(value && value.response && value.response.status);

export function Remote<T>({ data, error, loading, success }: RemoteProps<T>) {
    return (
        <>
            {pipe(
                data,
                E.fold(
                    (errorOrNull) => {
                        if (errorOrNull === null) {
                            return loading();
                        } else {
                            // TODO: Finne ut om det er en bedre måte / bedre plass å håndtere 401 redirect
                            // if (
                            //     isForbidden(errorOrNull.response.status) ||
                            //     isUnauthorized(errorOrNull.response.status)
                            // ) {
                            //     return props.loading();
                            // } else {
                            // }
                            if (
                                hasResponseStatus(errorOrNull) &&
                                (isForbidden(errorOrNull) || isUnauthorized(errorOrNull))
                            ) {
                                navigateToLoginPage();
                                return loading();
                            } else {
                                return error(errorOrNull);
                            }
                        }
                    },
                    (r) => {
                        return success(r);
                    }
                )
            )}
        </>
    );
}

export default Remote;

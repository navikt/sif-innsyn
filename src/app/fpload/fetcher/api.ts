import * as E from 'fp-ts/lib/Either';
import * as IoTs from 'io-ts/es6';
import { reporter } from 'io-ts-reporters';
import { pipe } from 'fp-ts/lib/pipeable';
import axios, { AxiosResponse } from 'axios';
import axiosConfig from '../../config/axiosConfig';

export async function fetchJson<P extends IoTs.Props>(
    url: string,
    validator: IoTs.InterfaceType<P>,
    init?: RequestInit // TODO: Fix.
): Promise<E.Either<Error, P>> {
    try {
        const axiosResponse: AxiosResponse<P> = await axios.get<P>(url, axiosConfig);
        const json: P = axiosResponse.data;
        const result: E.Either<IoTs.Errors, P> = validator.decode(json);
        return pipe(
            result,
            E.fold<IoTs.Errors, P, E.Either<Error, P>>(
                (errors: IoTs.Errors) =>
                    E.left<Error, P>({
                        name: 'TypeGuardError',
                        message: reporter(result).join('\n'),
                    }),
                (value: P) => E.right<Error, P>(value)
            )
        );
    } catch (err) {
        return Promise.resolve(E.left<Error, P>(err));
    }
}

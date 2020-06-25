import * as E from 'fp-ts/lib/Either';
import * as IoTs from 'io-ts/lib';
import { reporter } from 'io-ts-reporters';
import { pipe } from 'fp-ts/lib/pipeable';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import defaultAxiosConfig from '../../config/axiosConfig';

export async function fetchJson<P extends IoTs.Props, T>(
    url: string,
    validator: IoTs.InterfaceType<P>,
    axiosConfig?: AxiosRequestConfig
): Promise<E.Either<Error, T>> {
    try {
        const axiosResponse: AxiosResponse<P> = await axios.get(url, axiosConfig || defaultAxiosConfig);
        const json = axiosResponse.data;
        const result: E.Either<IoTs.Errors, T> = validator.decode(json);
        return pipe(
            result,
            E.fold<IoTs.Errors, T, E.Either<Error, T>>(
                (errors: IoTs.Errors) =>
                    E.left<Error, T>({
                        name: 'TypeGuardError',
                        message: reporter(result).join('\n'),
                    }),
                (value: T) => E.right<Error, T>(value)
            )
        );
    } catch (err) {
        return Promise.resolve(E.left<Error, T>(err));
    }
}

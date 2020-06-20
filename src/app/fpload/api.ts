import * as E from 'fp-ts/lib/Either';
import * as ioTs from 'io-ts';
import { reporter } from 'io-ts-reporters';
import { pipe } from 'fp-ts/lib/pipeable';
import axios, { AxiosResponse } from 'axios';
import axiosConfig from '../config/axiosConfig';

export async function fetchJson<T, O, I>(
    url: string,
    validator: ioTs.Type<T, O, I>,
    init?: RequestInit // TODO: Fix.
): Promise<E.Either<Error, T>> {
    try {
        const axiosResponse: AxiosResponse<I> = await axios.get<I>(url, axiosConfig);
        const json: I = axiosResponse.data;
        const result: E.Either<ioTs.Errors, T> = validator.decode(json);
        return pipe(
            result,
            E.fold<ioTs.Errors, T, E.Either<Error, T>>(
                (errors: ioTs.Errors) =>
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

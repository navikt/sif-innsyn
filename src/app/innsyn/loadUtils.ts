import { Either, left as leftEither, right as rightEither } from 'fp-ts/lib/Either';
import { none, Option, some } from 'fp-ts/lib/Option';
import { Essentials } from '../types/types';
import { isSøkerApiResponse, SøkerApiResponse } from '../types/apiTypes/søkerTypes';
import { ResourceType } from '../types/resourceTypes';
import { BarnApiResponse, isBarnApiResponse } from '../types/apiTypes/barnTypes';
import { ArbeidsgiverApiResponse, isArbeidsgiverApiResponse } from '../types/apiTypes/arbeidsgiverTypes';
import { getOrLogin, GetOrLoginResult } from '../api/api';
import React from 'react';

export interface LoadError {
    error: string;
}

export type EssentialsRenderer = (essentials: Essentials) => React.ReactElement;

export async function loadAppEssentials(): Promise<Either<Option<Essentials>, LoadError>> {
    const [maybeSøkerApiResponse, maybeBarnApiResponse, maybeArbeidsgiverApiResponse] = await Promise.all([
        getOrLogin<SøkerApiResponse>(ResourceType.SØKER),
        getOrLogin<BarnApiResponse>(ResourceType.BARN),
        getOrLogin<ArbeidsgiverApiResponse>(ResourceType.ARBEIDSGIVER),
    ]);

    if (
        maybeSøkerApiResponse.result === GetOrLoginResult.GOT_ERROR ||
        maybeBarnApiResponse.result === GetOrLoginResult.GOT_ERROR ||
        maybeArbeidsgiverApiResponse.result === GetOrLoginResult.GOT_ERROR
    ) {
        return Promise.resolve(rightEither({ error: 'TODO: putt inn riktig error' }));
    }
    if (
        maybeSøkerApiResponse.result === GetOrLoginResult.WILL_REDIRECT ||
        maybeBarnApiResponse.result === GetOrLoginResult.WILL_REDIRECT ||
        maybeArbeidsgiverApiResponse.result === GetOrLoginResult.WILL_REDIRECT
    ) {
        return Promise.resolve(leftEither(none));
    }

    if (
        isSøkerApiResponse(maybeSøkerApiResponse.data) &&
        isBarnApiResponse(maybeBarnApiResponse.data) &&
        isArbeidsgiverApiResponse(maybeArbeidsgiverApiResponse.data)
    ) {
        return Promise.resolve(
            leftEither(
                some<Essentials>({
                    person: maybeSøkerApiResponse.data,
                    barn: maybeBarnApiResponse.data,
                    arbeidsgiver: maybeArbeidsgiverApiResponse.data,
                })
            )
        );
    } else {
        return Promise.resolve(
            rightEither({
                error: 'unknown',
            })
        );
    }
}

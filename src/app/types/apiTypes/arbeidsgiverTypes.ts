import * as IoTs from 'io-ts/lib';
import { FetchRecipe } from '../../functional/fetcher/types';
import { getApiUrlByResourceType } from '../../utils/apiUtils';
import { isString } from '../../utils/typeGuardUtils';
import { allValuesInArrayAreTrue } from '../../utils/utilityFunctions';
import { ResourceType } from '../resourceTypes';

export interface Arbeidsgiver {
    navn: string;
    organisasjonsnummer: string;
}

export interface ArbeidsgiverApiResponse {
    organisasjoner: Arbeidsgiver[];
}

export const isArbeidsgiver = (value: any): value is Arbeidsgiver => {
    if (value && isString(value.navn) && isString(value.organisasjonsnummer)) {
        return true;
    } else {
        return false;
    }
};

export const isArbeidsgiverApiResponse = (value: any): value is ArbeidsgiverApiResponse => {
    if (
        value &&
        value.organisasjoner &&
        Array.isArray(value.organisasjoner) &&
        allValuesInArrayAreTrue(value.organisasjoner.map(isArbeidsgiver))
    ) {
        return true;
    } else {
        return false;
    }
};

export const arbeidsgiverApiResponseType: IoTs.Type<ArbeidsgiverApiResponse> = new IoTs.Type<
    ArbeidsgiverApiResponse,
    ArbeidsgiverApiResponse,
    unknown
>(
    'ArbeidsgiverApiResponse',
    isArbeidsgiverApiResponse,
    (input: unknown, context: IoTs.Context) =>
        isArbeidsgiverApiResponse(input) ? IoTs.success(input) : IoTs.failure(input, context),
    IoTs.identity
);

export const arbeidsgiverRecipe: FetchRecipe<ArbeidsgiverApiResponse> = {
    url: getApiUrlByResourceType(ResourceType.ARBEIDSGIVER),
    validator: arbeidsgiverApiResponseType,
};

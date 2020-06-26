import { isString } from '@navikt/sif-common-core/lib/utils/typeGuardUtils';
import { allValuesInArrayAreTrue } from '../../utils/utilityFunctions';
import * as IoTs from 'io-ts/lib';
import { getApiUrlByResourceType } from '../../utils/apiUtils';
import { ResourceType } from '../resourceTypes';
import { FetchRecipe } from '../../functional/fetcher/utilityFunctions';

export interface Barn {
    aktørId: string;
    fødselsnummer: string;
    fornavn: string;
    mellomnavn: string | void;
    etternavn: string;
}

export interface BarnApiResponse {
    barn: Barn[];
}

export const isBarn = (value: any): value is Barn => {
    if (
        value &&
        isString(value.aktørId) &&
        isString(value.fødselsnummer) &&
        isString(value.fornavn) &&
        isString(value.etternavn)
    ) {
        return true;
    } else {
        return false;
    }
};

export const isBarnApiResponse = (maybeBarnApiResponse: any): maybeBarnApiResponse is BarnApiResponse => {
    if (
        maybeBarnApiResponse &&
        maybeBarnApiResponse.barn &&
        Array.isArray(maybeBarnApiResponse.barn) &&
        allValuesInArrayAreTrue(maybeBarnApiResponse.barn.map(isBarn))
    ) {
        return true;
    } else {
        return false;
    }
};

export const barnApiResponseType: IoTs.Type<BarnApiResponse> = new IoTs.Type<BarnApiResponse, BarnApiResponse, unknown>(
    'BarnApiResponse',
    isBarnApiResponse,
    (input: unknown, context: IoTs.Context) =>
        isBarnApiResponse(input) ? IoTs.success(input) : IoTs.failure(input, context),
    IoTs.identity
);

export const barnRecipe: FetchRecipe<BarnApiResponse> = {
    url: getApiUrlByResourceType(ResourceType.BARN),
    validator: barnApiResponseType,
};

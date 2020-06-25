import { isStringOrNull } from '../../utils/typeGuardUtilities';
import { isString } from '@navikt/sif-common-core/lib/utils/typeGuardUtils';
import * as IoTs from 'io-ts/lib';
import { getApiUrlByResourceType } from '../../utils/apiUtils';
import { ResourceType } from '../resourceTypes';
import { FetchRecipe } from '../../functional/fetcher/utilityFunctions';

export interface SøkerApiResponse {
    aktørId: string;
    fødselsnummer: string;
    fornavn: string;
    mellomnavn: string | null;
    etternavn: string;
}

export const isSøkerApiResponse = (søkerApiResponse: any): søkerApiResponse is SøkerApiResponse => {
    if (
        søkerApiResponse &&
        isString(søkerApiResponse.aktørId) &&
        isString(søkerApiResponse.fødselsnummer) &&
        isString(søkerApiResponse.fornavn) &&
        isStringOrNull(søkerApiResponse.mellomnavn) &&
        isString(søkerApiResponse.etternavn)
    ) {
        return true;
    } else {
        return false;
    }
};

export const søkerType: IoTs.Type<SøkerApiResponse> = new IoTs.Type<SøkerApiResponse, SøkerApiResponse, unknown>(
    'SøkerApiResponse',
    isSøkerApiResponse,
    (input: unknown, context: IoTs.Context) =>
        isSøkerApiResponse(input) ? IoTs.success(input) : IoTs.failure(input, context),
    IoTs.identity
);

export const søkerRecipe: FetchRecipe<SøkerApiResponse> = {
    url: getApiUrlByResourceType(ResourceType.SØKER),
    validator: søkerType,
};

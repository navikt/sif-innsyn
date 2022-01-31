import { getEnvironmentVariable } from '../../utils/envUtils';
import { FetchRecipe } from '../../functional/fetcher/types';
import * as IoTs from 'io-ts/lib';

export interface StorageMetadata {
    updatedTimestemp: string;
}

export interface MellomlagringSøknadData {
    metadata?: StorageMetadata;
}
export interface MellomlagringEndringData {
    metadata?: StorageMetadata;
}

export const isMellomlagringSøknadDataApiResponse = (input: any): input is MellomlagringSøknadData => {
    if (input) {
        return true;
    } else {
        return false;
    }
};

export const isMellomlagringEndringDataApiResponse = (input: any): input is MellomlagringEndringData => {
    if (input) {
        return true;
    } else {
        return false;
    }
};

export type MellomlagringSøknadApiResponse = MellomlagringSøknadData;
export type MellomlagringEndringApiResponse = MellomlagringEndringData;

export const mellomlagringSøknadApiResponseType: IoTs.Type<MellomlagringSøknadApiResponse> = new IoTs.Type<
    MellomlagringSøknadApiResponse,
    MellomlagringSøknadApiResponse,
    unknown
>(
    'MellomlagringSøknadApiResponse',
    isMellomlagringSøknadDataApiResponse,
    (input: unknown, context: IoTs.Context) =>
        isMellomlagringSøknadDataApiResponse(input) ? IoTs.success(input) : IoTs.failure(input, context),
    IoTs.identity
);

export const mellomlagringEndringApiResponseType: IoTs.Type<MellomlagringEndringApiResponse> = new IoTs.Type<
    MellomlagringEndringApiResponse,
    MellomlagringEndringApiResponse,
    unknown
>(
    'MellomlagringEndringApiResponse',
    isMellomlagringEndringDataApiResponse,
    (input: unknown, context: IoTs.Context) =>
        isMellomlagringEndringDataApiResponse(input) ? IoTs.success(input) : IoTs.failure(input, context),
    IoTs.identity
);

export const mellomlagringSøknadRecipe: FetchRecipe<MellomlagringSøknadApiResponse> = {
    url: getEnvironmentVariable('PP_MELLOMLAGRING_API_URL'),
    validator: mellomlagringSøknadApiResponseType,
};

export const mellomlagringEndringRecipe: FetchRecipe<MellomlagringEndringApiResponse> = {
    url: getEnvironmentVariable('PP_ENDRING_MELLOMLAGRING_API_URL'),
    validator: mellomlagringEndringApiResponseType,
};

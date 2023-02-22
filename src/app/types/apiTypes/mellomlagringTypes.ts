import { getEnvironmentVariable } from '../../utils/envUtils';
import { FetchRecipe } from '../../functional/fetcher/types';
import * as IoTs from 'io-ts/lib';

export interface StorageMetadata {
    updatedTimestamp: string;
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

const fixSøknadMetadata = (data: MellomlagringSøknadApiResponse): MellomlagringSøknadApiResponse => {
    if (data.metadata && (data.metadata as any).updatedTimestemp) {
        data.metadata.updatedTimestamp = (data.metadata as any).updatedTimestemp;
        delete (data.metadata as any).updatedTimestemp;
    }
    return data;
};

export const mellomlagringSøknadApiResponseType: IoTs.Type<MellomlagringSøknadApiResponse> = new IoTs.Type<
    MellomlagringSøknadApiResponse,
    MellomlagringSøknadApiResponse,
    unknown
>(
    'MellomlagringSøknadApiResponse',
    isMellomlagringSøknadDataApiResponse,
    (input: unknown, context: IoTs.Context) =>
        isMellomlagringSøknadDataApiResponse(input)
            ? IoTs.success(fixSøknadMetadata(input))
            : IoTs.failure(input, context),
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

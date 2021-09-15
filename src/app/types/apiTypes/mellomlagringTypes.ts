import { getEnvironmentVariable } from '../../utils/envUtils';
import { FetchRecipe } from '../../functional/fetcher/types';
import * as IoTs from 'io-ts/lib';

export interface StorageMetadata {
    updatedTimestemp: string;
}

export interface MellomlagringData {
    metadata: StorageMetadata;
}

export const isMellomlagringDataApiResponse = (input: any): input is MellomlagringData => {
    if (input && input.metadata && input.metadata.updatedTimestemp) {
        return true;
    } else {
        return false;
    }
};

export type MellomlagringApiResponse = MellomlagringData;

export const mellomlagringApiResponseType: IoTs.Type<MellomlagringApiResponse> = new IoTs.Type<
    MellomlagringApiResponse,
    MellomlagringApiResponse,
    unknown
>(
    'MellomlagringApiResponse',
    isMellomlagringDataApiResponse,
    (input: unknown, context: IoTs.Context) =>
        isMellomlagringDataApiResponse(input) ? IoTs.success(input) : IoTs.failure(input, context),
    IoTs.identity
);

export const mellomlagringRecipe: FetchRecipe<MellomlagringApiResponse> = {
    url: getEnvironmentVariable('PP_MELLOMLAGRING_API_URL'),
    validator: mellomlagringApiResponseType,
};

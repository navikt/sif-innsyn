import axios, { AxiosResponse } from 'axios';
import axiosConfig from '../config/axiosConfig';
import {
    getApiUrlByResourceType,
    getApiUrlForDocumentByResourceTypes,
    isForbidden,
    isUnauthorized,
} from '../utils/apiUtils';
import { navigateToLoginPage } from '../utils/navigationUtils';
import { ResourceType } from '../types/resourceTypes';
import { UUID } from 'io-ts-types/es6/UUID';

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (isForbidden(error) || isUnauthorized(error)) {
            navigateToLoginPage();
            return { result: GetOrLoginResult.WILL_REDIRECT, data: undefined };
        } else {
            return { result: GetOrLoginResult.GOT_ERROR, data: undefined };
        }
    }
);

export enum GetOrLoginResult {
    GOT_DATA = 'GOT_DATA ',
    WILL_REDIRECT = 'WILL_REDIRECT',
    GOT_ERROR = 'GOT_ERROR',
}

export interface GoGetOrLoginResponse<T> {
    result: GetOrLoginResult;
    data: T | undefined;
}

export function axiosGet<T>(resourcetype: ResourceType): Promise<AxiosResponse<T>> {
    return axios.get<T, AxiosResponse<T>>(getApiUrlByResourceType(resourcetype), axiosConfig);
}

export function axiosGetSøknadDocument<T>(
    søknadResource: ResourceType,
    søknadId: UUID,
    dokumentResource: ResourceType
): Promise<AxiosResponse<T>> {
    return axios.get<T, AxiosResponse<T>>(
        getApiUrlForDocumentByResourceTypes(søknadResource, søknadId, dokumentResource),
        {
            ...axiosConfig,
            responseType: 'blob',
        }
    );
}

export async function getOrLogin<T>(resourcetype: ResourceType): Promise<GoGetOrLoginResponse<T>> {
    try {
        const axiosResponse: AxiosResponse<T> = await axiosGet<T>(resourcetype);
        return { result: GetOrLoginResult.GOT_DATA, data: axiosResponse.data };
    } catch (error) {
        if (isForbidden(error) || isUnauthorized(error)) {
            navigateToLoginPage();
            return { result: GetOrLoginResult.WILL_REDIRECT, data: undefined };
        } else {
            return { result: GetOrLoginResult.GOT_ERROR, data: undefined };
        }
    }
}

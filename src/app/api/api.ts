import axios, { AxiosResponse } from 'axios';
import axiosConfig from '../config/axiosConfig';
import { getApiUrlByResourceType, isForbidden, isUnauthorized } from '../utils/apiUtils';
import { navigateToLoginPage } from '../utils/navigationUtils';
import { ResourceType } from '../types/resourceTypes';

export enum GetOrLoginResult {
    GOT_DATA = 'GOT_DATA ',
    WILL_REDIRECT = 'WILL_REDIRECT',
    GOT_ERROR = 'GOT_ERROR',
}

export interface GoGetOrLoginResponse<T> {
    result: GetOrLoginResult;
    data: T | undefined;
}

export function goGet<T>(resourcetype: ResourceType): Promise<AxiosResponse<T>> {
    return axios.get<T, AxiosResponse<T>>(getApiUrlByResourceType(resourcetype), axiosConfig);
}

export async function getOrLogin<T>(resourcetype: ResourceType): Promise<GoGetOrLoginResponse<T>> {
    try {
        const axiosResponse: AxiosResponse<T> = await goGet<T>(resourcetype);
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

// export const getSøkerApiResponse: () => Promise<AxiosResponse<SøkerApiResponse>> = () =>
//     axios.get<SøkerApiResponse, AxiosResponse<SøkerApiResponse>>(
//         getApiUrlByResourceType(ResourceType.SØKER),
//         axiosConfig
//     );
//
// export const redirectIfForbiddenOrUnauthorized = (response: AxiosError): WillRedirect => {
//     if (isForbidden(response) || isUnauthorized(response)) {
//         navigateToLoginPage();
//         return WillRedirect.Yes;
//     } else {
//         return WillRedirect.No;
//     }
// };

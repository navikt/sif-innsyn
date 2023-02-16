import axios, { AxiosError, AxiosResponse } from 'axios';
import HttpStatus, { StatusCodes } from 'http-status-codes';
import axiosConfig from '../config/axiosConfig';
import { ResourceType } from '../types/resourceTypes';
import { getEnvironmentVariable } from './envUtils';

export const multipartConfig = { headers: { 'Content-Type': 'multipart/form-data' }, ...axiosConfig };

export const sendMultipartPostRequest = (url: string, formData: FormData): Promise<AxiosResponse<any>> => {
    return axios.post(url, formData, multipartConfig);
};

export const isForbidden = ({ response }: AxiosError): boolean =>
    response !== undefined &&
    (response.status === HttpStatus.FORBIDDEN || response.status === StatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS);

export const isUnauthorized = ({ response }: AxiosError): boolean =>
    response !== undefined && response.status === HttpStatus.UNAUTHORIZED;

export const getApiUrlByResourceType = (resourceType: ResourceType): string => {
    return `${getEnvironmentVariable('FRONTEND_API_PATH')}/${resourceType}`;
};

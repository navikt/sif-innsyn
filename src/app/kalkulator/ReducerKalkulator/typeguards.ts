import { YesOrNo } from './types';
import { ISODateString } from 'nav-datovelger';

export const isYesOrNo = (value: string): value is YesOrNo => value === YesOrNo.Yes || value === YesOrNo.No;

export const isNumber = (input: any): input is number => {
    return typeof input === 'number';
};

export const isISODateString = (input: any): input is ISODateString => {
    // TODO;
    return true;
};

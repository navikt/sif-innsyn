import { YesOrNo } from './types';
import { ISODateString } from 'nav-datovelger';

export const isYesOrNo = (value: string): value is YesOrNo => value === YesOrNo.Yes || value === YesOrNo.No;

export const isNumber = (input: any): input is number => {
    return typeof input === 'number';
};

/** ISODateString format: YYYY-MM-DD **/
export const isISODateString = (value: any): value is ISODateString => {
    if (value && typeof value === 'string') {
        const reg = /^\d{4}-\d{2}-\d{2}$/;
        const match: RegExpMatchArray | null = value.match(reg);
        return match !== null;
    } else {
        return false;
    }
};

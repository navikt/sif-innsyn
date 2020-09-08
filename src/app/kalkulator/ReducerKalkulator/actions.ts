import { ISODateString } from 'nav-datovelger/lib/types';

export enum ActionType {
    SetNBarn = 'SetNBarn',
    SetNBarnInvalid = 'SetNBarnInvalid',
    ShowValidationErrorSummary = 'ShowValidationErrorSummary',
    HideValidationErrorSummary = 'HideValidationErrorSummary',
    SetFodselsdatoForBarnInfo = 'SetFodselsdatoForBarnInfo',
    FjernFodselsdatoForBarnInfo = 'FjernFodselsdatoForBarnInfo',
    SetKroniskSykt = 'SetKroniskSykt',
    SetBorSammen = 'SetBorSammen',
    SetAleneOmOmsorgen = 'SetAleneOmOmsorgen',
    Beregn = 'Beregn',
}

export interface SetNBarn {
    type: ActionType.SetNBarn;
    nBarn: number;
}
export const setNBarn = (nBarn: number): SetNBarn => ({
    type: ActionType.SetNBarn,
    nBarn,
});
export interface SetNBarnInvalid {
    type: ActionType.SetNBarnInvalid;
}
export const setNBarnInvalid = (): SetNBarnInvalid => ({
    type: ActionType.SetNBarnInvalid,
});

export interface ShowValidationErrorSummary {
    type: ActionType.ShowValidationErrorSummary;
}
export const showValidationErrorSummary: ShowValidationErrorSummary = {
    type: ActionType.ShowValidationErrorSummary,
};
export interface HideValidationErrorSummary {
    type: ActionType.HideValidationErrorSummary;
}
export const hideValidationErrorSummary: HideValidationErrorSummary = {
    type: ActionType.HideValidationErrorSummary,
};

export interface SetFodselsdatoForBarnInfo {
    type: ActionType.SetFodselsdatoForBarnInfo;
    isoDateString: ISODateString;
    barnInfoId: string;
}
// TODO: Typeguard ISODateString
export const setFodselsdatoForBarnInfo = (
    isoDateString: ISODateString,
    barnInfoId: string
): SetFodselsdatoForBarnInfo => ({
    type: ActionType.SetFodselsdatoForBarnInfo,
    isoDateString,
    barnInfoId,
});

export interface FjernFodselsdatoForBarnInfo {
    type: ActionType.FjernFodselsdatoForBarnInfo;
    barnInfoId: string;
}
export const fjernFodselsdatoForBarnInfo = (barnInfoId: string): FjernFodselsdatoForBarnInfo => ({
    type: ActionType.FjernFodselsdatoForBarnInfo,
    barnInfoId,
});

export interface SetKroniskSykt {
    type: ActionType.SetKroniskSykt;
    value: boolean;
    barnInfoId: string;
}
export const setKroniskSykt = (value: boolean, barnInfoId: string): SetKroniskSykt => ({
    type: ActionType.SetKroniskSykt,
    value,
    barnInfoId,
});
export interface SetBorSammen {
    type: ActionType.SetBorSammen;
    value: boolean;
    barnInfoId: string;
}
export const setBorSammen = (value: boolean, barnInfoId: string): SetBorSammen => ({
    type: ActionType.SetBorSammen,
    value,
    barnInfoId,
});
export interface SetAleneOmOmsorgen {
    type: ActionType.SetAleneOmOmsorgen;
    value: boolean;
    barnInfoId: string;
}
export const setAleneOmOmsorgen = (value: boolean, barnInfoId: string): SetAleneOmOmsorgen => ({
    type: ActionType.SetAleneOmOmsorgen,
    value,
    barnInfoId,
});

export interface Beregn {
    type: ActionType.Beregn;
}
export const beregn: Beregn = {
    type: ActionType.Beregn,
};

export type Action =
    | SetNBarn
    | SetNBarnInvalid
    | ShowValidationErrorSummary
    | HideValidationErrorSummary
    | SetFodselsdatoForBarnInfo
    | FjernFodselsdatoForBarnInfo
    | SetKroniskSykt
    | SetBorSammen
    | SetAleneOmOmsorgen
    | Beregn;

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
    barnId: string;
    fodselsdato: ISODateString;
}
// TODO: Typeguard ISODateString
export const setFodselsdatoForBarnInfo = (fodselsdato: ISODateString, barnId: string): SetFodselsdatoForBarnInfo => ({
    type: ActionType.SetFodselsdatoForBarnInfo,
    fodselsdato,
    barnId,
});

export interface FjernFodselsdatoForBarnInfo {
    type: ActionType.FjernFodselsdatoForBarnInfo;
    barnId: string;
}
export const fjernFodselsdatoForBarnInfo = (barnId: string): FjernFodselsdatoForBarnInfo => ({
    type: ActionType.FjernFodselsdatoForBarnInfo,
    barnId,
});

export interface SetKroniskSykt {
    type: ActionType.SetKroniskSykt;
    value: boolean;
    barnId: string;
}
export const setKroniskSykt = (value: boolean, barnId: string): SetKroniskSykt => ({
    type: ActionType.SetKroniskSykt,
    value,
    barnId,
});
export interface SetBorSammen {
    type: ActionType.SetBorSammen;
    value: boolean;
    barnId: string;
}
export const setBorSammen = (value: boolean, barnId: string): SetBorSammen => ({
    type: ActionType.SetBorSammen,
    value,
    barnId,
});
export interface SetAleneOmOmsorgen {
    type: ActionType.SetAleneOmOmsorgen;
    value: boolean;
    barnId: string;
}
export const setAleneOmOmsorgen = (value: boolean, barnId: string): SetAleneOmOmsorgen => ({
    type: ActionType.SetAleneOmOmsorgen,
    value,
    barnId,
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

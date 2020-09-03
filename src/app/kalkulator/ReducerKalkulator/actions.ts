import { ISODateString } from 'nav-datovelger/lib/types';

export enum ActionType {
    SetBarn = 'SetBarn',
    ShowValidationErrorSummary = 'ShowValidationErrorSummary',
    HideValidationErrorSummary = 'HideValidationErrorSummary',
    SetAleneOmOmsorgenForBarnInfo = 'SetAleneOmOmsorgenForBarnInfo',
    SetFodselsdatoForBarnInfo = 'SetFodselsdatoForBarnInfo',
}

export interface SetBarn {
    type: ActionType.SetBarn;
    nBarn: number;
}
export const setBarn = (nBarn: number): SetBarn => ({
    type: ActionType.SetBarn,
    nBarn,
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

export interface SetAleneOmOmsorgenForBarnInfo {
    type: ActionType.SetAleneOmOmsorgenForBarnInfo;
    value: boolean;
    barnInfoId: string;
}
export const setAleneOmOmsorgenForBarnInfo = (value: boolean, barnInfoId: string): SetAleneOmOmsorgenForBarnInfo => ({
    type: ActionType.SetAleneOmOmsorgenForBarnInfo,
    value,
    barnInfoId,
});

export type Action =
    | SetBarn
    | ShowValidationErrorSummary
    | HideValidationErrorSummary
    | SetAleneOmOmsorgenForBarnInfo
    | SetFodselsdatoForBarnInfo;

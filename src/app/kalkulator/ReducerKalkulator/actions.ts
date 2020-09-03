export enum ActionType {
    SetBarn = 'SetBarn',
    ShowValidationErrorSummary = 'ShowValidationErrorSummary',
    HideValidationErrorSummary = 'HideValidationErrorSummary',
}

export interface SetBarn {
    type: ActionType.SetBarn;
    nBarn: number;
}

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

export type Action = SetBarn | ShowValidationErrorSummary | HideValidationErrorSummary;

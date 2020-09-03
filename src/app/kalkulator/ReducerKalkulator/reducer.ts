import { initialBarnInformasjon, State } from './state';
import { Action, ActionType } from './actions';

export type KalkulatorReducer = (state: State, action: Action) => State;

export const reducer: KalkulatorReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.SetBarn: {
            return {
                ...state,
                barn: Array.from({ length: action.nBarn }, (_, i) => initialBarnInformasjon),
            };
        }
        case ActionType.ShowValidationErrorSummary:
            return { ...state, showValidationErrorSummary: true };
        case ActionType.HideValidationErrorSummary:
            return { ...state, showValidationErrorSummary: false };
        default:
            return state;
    }
};

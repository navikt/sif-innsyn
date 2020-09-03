import { State } from './state';
import { Action, ActionType } from './actions';
import { createInitialBarnInformasjon } from './initializers';
import { BarnInfo } from './types';
import { right } from 'fp-ts/lib/Either';

export type KalkulatorReducer = (state: State, action: Action) => State;

export const reducer: KalkulatorReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.SetBarn: {
            return {
                ...state,
                nBarn: { ...state.nBarn, value: right(action.nBarn) },
                barn: Array.from({ length: action.nBarn }, (_, i) => createInitialBarnInformasjon()),
            };
        }
        case ActionType.ShowValidationErrorSummary:
            return { ...state, showValidationErrorSummary: true };
        case ActionType.HideValidationErrorSummary:
            return { ...state, showValidationErrorSummary: false };
        case ActionType.SetFodselsdatoForBarnInfo: {
            return {
                ...state,
                barn: state.barn.map((barn: BarnInfo) =>
                    barn.id === action.barnInfoId
                        ? { ...barn, fodselsdato: { ...barn.fodselsdato, value: right(action.isoDateString) } }
                        : barn
                ),
            };
        }
        case ActionType.SetAleneOmOmsorgenForBarnInfo: {
            return {
                ...state,
                barn: state.barn.map((barn: BarnInfo) =>
                    barn.id === action.barnInfoId
                        ? { ...barn, aleneOmOmsorgen: { ...barn.aleneOmOmsorgen, value: right(action.value) } }
                        : barn
                ),
            };
        }
        default:
            return state;
    }
};

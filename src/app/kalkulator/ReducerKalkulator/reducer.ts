import { State } from './state';
import { Action, ActionType } from './actions';
import { createFeiloppsummeringFeilZeroChildren, createInitialBarnInformasjon } from './initializers';
import { BarnInfo, ValidBarnInfo } from './types';
import { Either, left, right } from 'fp-ts/lib/Either';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { validateListOfBarnInfo } from './utils';

export type KalkulatorReducer = (state: State, action: Action) => State;

export const reducer: KalkulatorReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.SetNBarn: {
            return {
                ...state,
                nBarn: { ...state.nBarn, value: right(action.nBarn) },
                barn: Array.from({ length: action.nBarn }, (_, i) => createInitialBarnInformasjon()),
                showErrors: false,
            };
        }
        case ActionType.SetNBarnInvalid: {
            return {
                ...state,
                nBarn: { ...state.nBarn, value: left(createFeiloppsummeringFeilZeroChildren(state.nBarn.id)) },
                barn: [],
            };
        }
        case ActionType.ShowValidationErrorSummary:
            return { ...state, showErrors: true };
        case ActionType.HideValidationErrorSummary:
            return { ...state, showErrors: false };

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

        case ActionType.SetKroniskSykt: {
            return {
                ...state,
                barn: state.barn.map((barn: BarnInfo) =>
                    barn.id === action.barnInfoId
                        ? { ...barn, kroniskSykt: { ...barn.kroniskSykt, value: right(action.value) } }
                        : barn
                ),
            };
        }
        case ActionType.SetBorSammen: {
            return {
                ...state,
                barn: state.barn.map((barn: BarnInfo) =>
                    barn.id === action.barnInfoId
                        ? { ...barn, borSammen: { ...barn.borSammen, value: right(action.value) } }
                        : barn
                ),
            };
        }
        case ActionType.SetAleneOmOmsorgen: {
            return {
                ...state,
                barn: state.barn.map((barn: BarnInfo) =>
                    barn.id === action.barnInfoId
                        ? { ...barn, aleneOmOmsorgen: { ...barn.aleneOmOmsorgen, value: right(action.value) } }
                        : barn
                ),
            };
        }

        case ActionType.Beregn: {
            const validationResult: Either<FeiloppsummeringFeil[], ValidBarnInfo[]> = validateListOfBarnInfo(
                state.barn,
                state.nBarn.id
            );

            return {
                ...state,
                showErrors: true,
                validationResult: validationResult,
            };
        }
        default:
            return state;
    }
};

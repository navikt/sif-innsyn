import { State } from './state';
import { Action, ActionType } from './actions';
import { createInitialBarnInformasjon } from './initializers';
import { BarnInfo, ValidBarnInfo } from './types';
import { Either, right } from 'fp-ts/lib/Either';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { evaluateBarnInfo } from './utils';

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
            console.info('Beregner .....');
            const validationResult: Either<FeiloppsummeringFeil[], ValidBarnInfo[]> = evaluateBarnInfo(state.barn);
            console.info('Ferdig');

            return {
                ...state,
                showValidationErrorSummary: true,
                validationResult: validationResult,
            };
        }
        default:
            return state;
    }
};

import { createInitialState, State } from './state';
import { Action, ActionType } from './actions';
import { initializeNBarn } from './initializers';
import { BarnInfo } from './types';
import { validateAndCalculateIfValid } from './utils';
import {
    fjernFodselsdatoOgOppdaterDataForBarnet,
    setAleneOmOmsorgenOgOppdaterDataForBarnet,
    setBorSammenOgOppdaterDataForBarnet,
    setFodselsdatoOgOppdaterDataForBarnet,
    setKroniskSyktOgOppdaterDataForBarnet,
} from './reducerUtils';
import { isLeft } from 'fp-ts/lib/Either';

export type KalkulatorReducer = (state: State, action: Action) => State;

export const reducer: KalkulatorReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.SetNBarn: {
            return {
                ...state,
                nBarn: { ...state.nBarn, value: action.nBarn, errors: [] },
                barn: initializeNBarn(action.nBarn),
                showErrors: false,
            };
        }
        case ActionType.SetNBarnInvalid: {
            return createInitialState();
        }
        case ActionType.ShowValidationErrorSummary:
            return { ...state, showErrors: true };
        case ActionType.HideValidationErrorSummary:
            return { ...state, showErrors: false };

        case ActionType.SetFodselsdatoForBarnInfo: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? setFodselsdatoOgOppdaterDataForBarnet(action.fodselsdato, barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                showErrors: false,
                result: validateAndCalculateIfValid(listeAvBarnUpdated),
            };
        }
        case ActionType.FjernFodselsdatoForBarnInfo: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? fjernFodselsdatoOgOppdaterDataForBarnet(barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                result: validateAndCalculateIfValid(listeAvBarnUpdated),
            };
        }
        case ActionType.SetKroniskSykt: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? setKroniskSyktOgOppdaterDataForBarnet(action.value, barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                showErrors: false,
                result: validateAndCalculateIfValid(listeAvBarnUpdated),
            };
        }
        case ActionType.SetBorSammen: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? setBorSammenOgOppdaterDataForBarnet(action.value, barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                showErrors: false,
                result: validateAndCalculateIfValid(listeAvBarnUpdated),
            };
        }
        case ActionType.SetAleneOmOmsorgen: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? setAleneOmOmsorgenOgOppdaterDataForBarnet(action.value, barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                result: validateAndCalculateIfValid(listeAvBarnUpdated),
            };
        }

        case ActionType.Beregn: {
            const resultUpdated = validateAndCalculateIfValid(state.barn);
            return {
                ...state,
                showErrors: true,
                showResult: true,
                isInitial: state.isInitial && isLeft(resultUpdated),
                result: resultUpdated,
            };
        }
        default:
            return state;
    }
};

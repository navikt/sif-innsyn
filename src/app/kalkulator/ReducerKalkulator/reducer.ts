import { State } from './state';
import { Action, ActionType } from './actions';
import { initializeNBarn } from './initializers';
import { BarnApi, BarnInfo } from './types';
import { Either } from 'fp-ts/lib/Either';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { validateInputData } from './utils';
import {
    fjernFodselsdatoOgOppdaterDataForBarnet,
    setAleneOmOmsorgenOgOppdaterDataForBarnet,
    setBorSammenOgOppdaterDataForBarnet,
    setFodselsdatoOgOppdaterDataForBarnet,
    setKroniskSyktOgOppdaterDataForBarnet,
} from './reducerUtils';

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
        // case ActionType.SetNBarnInvalid: {
        //     return {
        //         ...state,
        //         nBarn: { ...state.nBarn, value: left(createFeiloppsummeringFeilZeroChildren(state.nBarn.id)) },
        //         barn: [],
        //     };
        // }
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
                validationResult: validateInputData(state.nBarn.id, listeAvBarnUpdated),
            };
        }
        case ActionType.FjernFodselsdatoForBarnInfo: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? fjernFodselsdatoOgOppdaterDataForBarnet(barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                validationResult: validateInputData(state.nBarn.id, listeAvBarnUpdated),
            };
        }
        case ActionType.SetKroniskSykt: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? setKroniskSyktOgOppdaterDataForBarnet(action.value, barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                validationResult: validateInputData(state.nBarn.id, listeAvBarnUpdated),
            };
        }
        case ActionType.SetBorSammen: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? setBorSammenOgOppdaterDataForBarnet(action.value, barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                validationResult: validateInputData(state.nBarn.id, listeAvBarnUpdated),
            };
        }
        case ActionType.SetAleneOmOmsorgen: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? setAleneOmOmsorgenOgOppdaterDataForBarnet(action.value, barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                validationResult: validateInputData(state.nBarn.id, listeAvBarnUpdated),
            };
        }

        case ActionType.Beregn: {
            const validationResult: Either<FeiloppsummeringFeil[], BarnApi[]> = validateInputData(
                state.nBarn.id,
                state.barn
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

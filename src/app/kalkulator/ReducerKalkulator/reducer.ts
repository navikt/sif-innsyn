import { createInitialState, State } from './state';
import { Action, ActionType } from './actions';
import { initializeNBarn } from './initializers';
import { BarnInfo } from './types';
import { doItAll } from './utils';
import { fjernFodselsdato, setAleneOmOmsorgen, setBorSammen, setFodselsdato, setKroniskSykt } from './reducerUtils';
import { beregnButton } from './types/ResultView';

export type KalkulatorReducer = (state: State, action: Action) => State;

export const reducer: KalkulatorReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.SetNBarn: {
            return {
                ...state,
                nBarn: { ...state.nBarn, value: action.nBarn },
                barn: initializeNBarn(action.nBarn),
                resultViewData: beregnButton,
            };
        }
        case ActionType.SetNBarnInvalid: {
            return createInitialState();
        }
        case ActionType.SetFodselsdatoForBarnInfo: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? setFodselsdato(action.fodselsdato, barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                resultViewData: doItAll(listeAvBarnUpdated, state.resultViewData, false),
            };
        }
        case ActionType.FjernFodselsdatoForBarnInfo: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? fjernFodselsdato(barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                resultViewData: doItAll(listeAvBarnUpdated, state.resultViewData, false),
            };
        }
        case ActionType.SetKroniskSykt: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? setKroniskSykt(action.value, barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                resultViewData: doItAll(listeAvBarnUpdated, state.resultViewData, false),
            };
        }
        case ActionType.SetBorSammen: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? setBorSammen(action.value, barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                resultViewData: doItAll(listeAvBarnUpdated, state.resultViewData, false),
            };
        }
        case ActionType.SetAleneOmOmsorgen: {
            const listeAvBarnUpdated: BarnInfo[] = state.barn.map((barn: BarnInfo) =>
                barn.id === action.barnId ? setAleneOmOmsorgen(action.value, barn) : barn
            );
            return {
                ...state,
                barn: listeAvBarnUpdated,
                resultViewData: doItAll(listeAvBarnUpdated, state.resultViewData, false),
            };
        }

        case ActionType.Beregn: {
            return {
                ...state,
                resultViewData: doItAll(state.barn, state.resultViewData, true),
            };
        }
        default:
            return state;
    }
};

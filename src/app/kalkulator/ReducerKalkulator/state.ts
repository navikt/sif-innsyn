import { BarnInfo, Value } from './types';
import { initializeWithValue } from './initializers';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import Omsorgsprinsipper from '@navikt/omsorgspenger-kalkulator/lib/types/Omsorgsprinsipper';
import { Either } from 'fp-ts/lib/Either';
import { evaluate } from './utils';

export interface State {
    readonly nBarnMaks: number;
    nBarn: Value<number>;
    barn: BarnInfo[];
    showValidationErrorSummary: boolean;
    resultat: Either<FeiloppsummeringFeil[], Omsorgsprinsipper>;
}

export const createInitialState = (listeAvBarnInfo: BarnInfo[]): State => ({
    nBarnMaks: 20,
    nBarn: initializeWithValue(listeAvBarnInfo.length),
    barn: listeAvBarnInfo,
    showValidationErrorSummary: false,
    resultat: evaluate(listeAvBarnInfo),
});

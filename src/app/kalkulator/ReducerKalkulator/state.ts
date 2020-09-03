import { BarnInfo, ValidBarnInfo, Value } from './types';
import { initializeWithValue } from './initializers';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import Omsorgsprinsipper from '@navikt/omsorgspenger-kalkulator/lib/types/Omsorgsprinsipper';
import { Either } from 'fp-ts/lib/Either';
import { evaluateBarnInfo } from './utils';
import { none, Option } from 'fp-ts/lib/Option';

export interface State {
    readonly nBarnMaks: number;
    nBarn: Value<number>;
    barn: BarnInfo[];
    showValidationErrorSummary: boolean;
    validationResult: Either<FeiloppsummeringFeil[], ValidBarnInfo[]>;
    resultat: Option<Omsorgsprinsipper>;
}

export const createInitialState = (listeAvBarnInfo: BarnInfo[]): State => ({
    nBarnMaks: 20,
    nBarn: initializeWithValue(listeAvBarnInfo.length),
    barn: listeAvBarnInfo,
    showValidationErrorSummary: false,
    validationResult: evaluateBarnInfo(listeAvBarnInfo),
    resultat: none,
});

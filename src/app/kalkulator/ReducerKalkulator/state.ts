import { BarnInfo, ValidBarnInfo, Value } from './types';
import { initializeNotAnswered, initializeWithValue } from './initializers';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import Omsorgsprinsipper from '@navikt/omsorgspenger-kalkulator/lib/types/Omsorgsprinsipper';
import { Either } from 'fp-ts/lib/Either';
import { validateListOfBarnInfo } from './utils';
import { none, Option } from 'fp-ts/lib/Option';

export interface State {
    readonly nBarnMaks: number;
    nBarn: Value<number>;
    barn: BarnInfo[];
    showErrors: boolean;
    validationResult: Either<FeiloppsummeringFeil[], ValidBarnInfo[]>;
    resultat: Option<Omsorgsprinsipper>;
}

export const createInitialState = (listeAvBarnInfo: BarnInfo[]): State => {
    const listeAvBarnLength = listeAvBarnInfo.length;
    const nBarnInitially =
        listeAvBarnLength > 0 ? initializeWithValue(listeAvBarnLength) : initializeNotAnswered<number>();
    return {
        nBarnMaks: 20,
        nBarn: nBarnInitially,
        barn: listeAvBarnInfo,
        showErrors: false,
        validationResult: validateListOfBarnInfo(listeAvBarnInfo, nBarnInitially.id),
        resultat: none,
    };
};

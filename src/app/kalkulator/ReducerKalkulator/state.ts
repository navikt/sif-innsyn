import { BarnInfo, Value } from './types';
import { initializeValue } from './initializers';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import Omsorgsprinsipper from '@navikt/omsorgspenger-kalkulator/lib/types/Omsorgsprinsipper';
import { Either } from 'fp-ts/lib/Either';
import { validateAndCalculateIfValid } from './utils';
import { none, Option } from 'fp-ts/lib/Option';

export interface State {
    readonly nBarnMaks: number;
    nBarn: Value<number>;
    barn: BarnInfo[];
    showErrors: boolean;
    validationResult: Either<FeiloppsummeringFeil[], Omsorgsprinsipper>;
    resultat: Option<Omsorgsprinsipper>;
}

export const createInitialState = (listeAvBarnInfo?: BarnInfo[]): State => {
    const listeAvBarnLength = listeAvBarnInfo?.length;
    const nBarnInitially: Value<number> =
        listeAvBarnLength && listeAvBarnLength > 0
            ? initializeValue<number>(listeAvBarnLength)
            : initializeValue<number>(0, ['error.unanswered']);
    return {
        nBarnMaks: 20,
        nBarn: nBarnInitially,
        barn: listeAvBarnInfo || [],
        showErrors: false,
        validationResult: validateAndCalculateIfValid(nBarnInitially.id, listeAvBarnInfo),
        resultat: none,
    };
};

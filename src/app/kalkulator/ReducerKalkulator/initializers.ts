import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { uuidv4 } from '@navikt/omsorgspenger-kalkulator/lib/utils';
import { BarnInfo, Value } from './types';
import { none } from 'fp-ts/lib/Option';
import { errorNotAnswered } from './validationUtils';

export const createFeiloppsummeringFeilNotAnswered = (id: string): FeiloppsummeringFeil => ({
    skjemaelementId: id,
    feilmelding: 'Feltet mangler',
});
export const createFeiloppsummeringFeilZeroChildren = (id: string): FeiloppsummeringFeil => ({
    skjemaelementId: id,
    feilmelding: 'Antall barn må være satt til et eller flere.',
});

export function initializeValue<T>(value: T, errors?: string[]): Value<T> {
    const uuid = uuidv4();
    return {
        id: uuid,
        value,
        errors: errors || [],
    };
}

export const createInitialBarnInformasjon = (): BarnInfo => ({
    id: uuidv4(),
    fodselsdato: initializeValue(none, [errorNotAnswered]),
    kroniskSykt: initializeValue(none, [errorNotAnswered]),
    borSammen: initializeValue(none, [errorNotAnswered]),
    aleneOmOmsorgen: initializeValue(none, [errorNotAnswered]),
});

export const initializeNBarn = (n: number) => Array.from({ length: n }, (_, i) => createInitialBarnInformasjon());

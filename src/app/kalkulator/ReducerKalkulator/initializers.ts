import { left, right } from 'fp-ts/lib/Either';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { uuidv4 } from '@navikt/omsorgspenger-kalkulator/lib/utils';
import { BarnInfo, Value } from './types';
import { none, Option } from 'fp-ts/lib/Option';

export const createFeiloppsummeringFeil = (id: string, feilmelding: string): FeiloppsummeringFeil => ({
    skjemaelementId: id,
    feilmelding,
});

export const createFeiloppsummeringFeilNotAnswered = (id: string): FeiloppsummeringFeil => ({
    skjemaelementId: id,
    feilmelding: 'Feltet mangler',
});
export const createFeiloppsummeringFeilZeroChildren = (id: string): FeiloppsummeringFeil => ({
    skjemaelementId: id,
    feilmelding: 'Antall barn må være satt til et eller flere.',
});

export function initializeWithValue<T>(value: T): Value<T> {
    const uuid = uuidv4();
    return {
        id: uuid,
        value: right(value),
    };
}

export function initializeNotAnswered<T>(): Value<T> {
    const uuid = uuidv4();
    return {
        id: uuid,
        value: left(createFeiloppsummeringFeilNotAnswered(uuid)),
    };
}

export function initializeWithOptionalValueNone<T>(): Value<Option<T>> {
    const uuid = uuidv4();
    return {
        id: uuid,
        value: right(none),
    };
}

export const createInitialBarnInformasjon = (): BarnInfo => ({
    id: uuidv4(),
    fodselsdato: initializeNotAnswered(),
    kroniskSykt: initializeWithOptionalValueNone(),
    borSammen: initializeWithOptionalValueNone(),
    aleneOmOmsorgen: initializeWithOptionalValueNone(),
});

export const initializeNBarn = (n: number) => Array.from({ length: n }, (_, i) => createInitialBarnInformasjon());

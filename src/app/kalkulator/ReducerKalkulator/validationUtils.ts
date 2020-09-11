import { isSome, none, Option, some } from 'fp-ts/lib/Option';
import { ISODateString } from 'nav-datovelger';
import { Value } from './types';
import { isISODateString } from './typeguards';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { toFeiloppsummeringsFeil } from './utils';

export const errorNotAnswered = 'Feltet er påkrevd';
export const errorNBarnIsZero = 'Antall barn må være satt til et eller flere.';

export const fodselsdatoIsValid = (value: Value<Option<ISODateString>>): Option<FeiloppsummeringFeil> =>
    isSome(value.value) && isISODateString(value.value)
        ? none
        : some(toFeiloppsummeringsFeil(value.id, errorNotAnswered));
export const kroniskSyktIsValid = (value: Value<Option<boolean>>): Option<FeiloppsummeringFeil> =>
    isSome(value.value) ? none : some(toFeiloppsummeringsFeil(value.id, errorNotAnswered));
export const borSammenIsValid = (value: Value<Option<boolean>>): Option<FeiloppsummeringFeil> =>
    isSome(value.value) ? none : some(toFeiloppsummeringsFeil(value.id, errorNotAnswered));
export const aleneOmOmsorgenIsValid = (value: Value<Option<boolean>>): Option<FeiloppsummeringFeil> =>
    isSome(value.value) ? none : some(toFeiloppsummeringsFeil(value.id, errorNotAnswered));

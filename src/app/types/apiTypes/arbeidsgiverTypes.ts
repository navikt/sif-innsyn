import { isString } from '@navikt/sif-common-core/lib/utils/typeGuardUtils';
import { allValuesInArrayAreTrue } from '../../utils/utilityFunctions';
import * as ioTs from 'io-ts';

export const ArbeidsgiverValidator = ioTs.type({
    navn: ioTs.string,
    organisasjonsnummer: ioTs.string,
});

export const ArbeidsgiverResponseValidator = ioTs.type({
    organisasjoner: ioTs.array(ArbeidsgiverValidator),
});

export type ArbeidsgiverResponse = ioTs.TypeOf<typeof ArbeidsgiverResponseValidator>;

export interface Arbeidsgiver {
    navn: string;
    organisasjonsnummer: string;
}

export interface ArbeidsgiverApiResponse {
    organisasjoner: Arbeidsgiver[];
}

export const isArbeidsgiver = (value: any): value is Arbeidsgiver => {
    if (value && isString(value.navn) && isString(value.organisasjonsnummer)) {
        return true;
    } else {
        return false;
    }
};

export const isArbeidsgiverApiResponse = (value: any): value is ArbeidsgiverApiResponse => {
    if (
        value &&
        value.organisasjoner &&
        Array.isArray(value.organisasjoner) &&
        allValuesInArrayAreTrue(value.organisasjoner.map(isArbeidsgiver))
    ) {
        return true;
    } else {
        return false;
    }
};

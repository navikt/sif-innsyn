import { isString } from '@navikt/sif-common-core/lib/utils/typeGuardUtils';
import { allValuesInArrayAreTrue } from '../../utils/utilityFunctions';
import * as IoTs from 'io-ts/lib';
import { getApiUrlByResourceType } from '../../utils/apiUtils';
import { ResourceType } from '../resourceTypes';
import { FetchRecipe } from '../../functional/fetcher/utilityFunctions';

export const ArbeidsgiverValidator = IoTs.type({
    navn: IoTs.string,
    organisasjonsnummer: IoTs.string,
});

export interface ArbeidsgiverP extends IoTs.Props {
    organisasjoner: IoTs.ArrayC<IoTs.TypeC<{ navn: IoTs.StringC; organisasjonsnummer: IoTs.StringC }>>;
}

export const ArbeidsgiverResponseValidator: IoTs.TypeC<ArbeidsgiverP> = IoTs.type({
    organisasjoner: IoTs.array(ArbeidsgiverValidator),
});

export type ArbeidsgiverFp = IoTs.TypeOf<typeof ArbeidsgiverResponseValidator>;

export const arbeidsgiverRecipe: FetchRecipe<ArbeidsgiverP> = {
    url: getApiUrlByResourceType(ResourceType.ARBEIDSGIVER),
    validator: ArbeidsgiverResponseValidator,
};

// ---------

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

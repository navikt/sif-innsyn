import { isString } from '@navikt/sif-common-core/lib/utils/typeGuardUtils';
import { allValuesInArrayAreTrue } from '../../utils/utilityFunctions';

export interface Barn {
    aktørId: string;
    fødselsdato: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}

export interface BarnApiResponse {
    barn: Barn[];
}

export const isBarn = (value: any): value is Barn => {
    if (
        value &&
        isString(value.aktørId) &&
        isString(value.fødselsnummer) &&
        isString(value.fornavn) &&
        isString(value.etternavn)
    ) {
        return true;
    } else {
        return false;
    }
};

export const isBarnApiResponse = (maybeBarnApiResponse: any): maybeBarnApiResponse is BarnApiResponse => {
    if (
        maybeBarnApiResponse &&
        maybeBarnApiResponse.barn &&
        Array.isArray(maybeBarnApiResponse.barn) &&
        allValuesInArrayAreTrue(maybeBarnApiResponse.barn.map(isBarn))
    ) {
        return true;
    } else {
        return false;
    }
};

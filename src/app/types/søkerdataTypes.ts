import { isStringOrNull } from '../utils/typeGuardUtilities';
import { isString } from '@navikt/sif-common-core/lib/utils/typeGuardUtils';

export interface Søkerdata {
    person: SøkerApiResponse;
}

export interface SøkerApiResponse {
    aktørId: string;
    fødselsdato: string; // TODO: Verifiser riktig, og bruk isDate hvis behov
    fødselsnummer: string;
    fornavn: string | null;
    mellomnavn: string | null;
    etternavn: string | null;
    myndig: boolean;
}

export const isSøkerApiResponse = (søkerApiResponse: any): søkerApiResponse is SøkerApiResponse => {
    if (
        søkerApiResponse &&
        isString(søkerApiResponse.aktørId) &&
        isString(søkerApiResponse.fødselsdato) &&
        isString(søkerApiResponse.fødselsnummer) &&
        isStringOrNull(søkerApiResponse.fornavn) &&
        isStringOrNull(søkerApiResponse.mellomnavn) &&
        isStringOrNull(søkerApiResponse.etternavn) &&
        søkerApiResponse.myndig
    ) {
        return true;
    } else {
        return false;
    }
};

export const isSøkerdata = (maybeSøkerdata: any): maybeSøkerdata is Søkerdata => {
    if (
        maybeSøkerdata &&
        typeof maybeSøkerdata === 'object' &&
        maybeSøkerdata.person &&
        isSøkerApiResponse(maybeSøkerdata.person)
    ) {
        return true;
    }
    return false;
};

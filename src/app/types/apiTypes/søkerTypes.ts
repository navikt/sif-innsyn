import { isStringOrNull } from '../../utils/typeGuardUtilities';
import { isString } from '@navikt/sif-common-core/lib/utils/typeGuardUtils';

export interface SøkerApiResponse {
    aktørId: string;
    fødselsnummer: string;
    fornavn: string;
    mellomnavn: string | null;
    etternavn: string;
}

export const isSøkerApiResponse = (søkerApiResponse: any): søkerApiResponse is SøkerApiResponse => {
    if (
        søkerApiResponse &&
        isString(søkerApiResponse.aktørId) &&
        isString(søkerApiResponse.fødselsnummer) &&
        isString(søkerApiResponse.fornavn) &&
        isStringOrNull(søkerApiResponse.mellomnavn) &&
        isString(søkerApiResponse.etternavn)
    ) {
        return true;
    } else {
        return false;
    }
};

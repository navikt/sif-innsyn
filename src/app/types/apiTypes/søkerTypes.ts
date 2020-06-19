import { isStringOrNull } from '../../utils/typeGuardUtilities';
import { isString } from '@navikt/sif-common-core/lib/utils/typeGuardUtils';
import * as ioTsTypes from 'io-ts-types/lib/option';
import * as ioTs from 'io-ts';

export const SøkerValidator: ioTs.TypeC<{
    aktørId: ioTs.StringC;
    fødselsnummer: ioTs.StringC;
    fornavn: ioTs.StringC;
    mellomnavn: ioTsTypes.OptionC<ioTs.StringC>;
    etternavn: ioTs.StringC;
}> = ioTs.type({
    aktørId: ioTs.string,
    fødselsnummer: ioTs.string,
    fornavn: ioTs.string,
    mellomnavn: ioTsTypes.option(ioTs.string),
    etternavn: ioTs.string,
});

export interface SøkerApiResponse {
    aktørId: string;
    fødselsnummer: string;
    fornavn: string;
    mellomnavn: string | null;
    etternavn: string;
}

export type Søker = ioTs.TypeOf<typeof SøkerValidator>;

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

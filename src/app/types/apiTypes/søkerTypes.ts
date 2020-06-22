import { isStringOrNull } from '../../utils/typeGuardUtilities';
import { isString } from '@navikt/sif-common-core/lib/utils/typeGuardUtils';
import * as ioTs from 'io-ts';

export type SøkerValidatorType = ioTs.TypeC<{
    mellomnavn: ioTs.UnionC<[ioTs.StringC, ioTs.NullC]>;
    etternavn: ioTs.StringC;
    aktørId: ioTs.StringC;
    fødselsnummer: ioTs.StringC;
    fornavn: ioTs.StringC;
}>;

export const SøkerValidator: SøkerValidatorType = ioTs.type({
    aktørId: ioTs.string,
    fødselsnummer: ioTs.string,
    fornavn: ioTs.string,
    mellomnavn: ioTs.union([ioTs.string, ioTs.nullType]),
    etternavn: ioTs.string,
});

export type Søker = ioTs.TypeOf<typeof SøkerValidator>;

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

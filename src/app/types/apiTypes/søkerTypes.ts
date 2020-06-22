import { isStringOrNull } from '../../utils/typeGuardUtilities';
import { isString } from '@navikt/sif-common-core/lib/utils/typeGuardUtils';
import * as ioTs from 'io-ts/es6';
import { getApiUrlByResourceType } from '../../utils/apiUtils';
import { ResourceType } from '../resourceTypes';
import { FetchRecipe } from '../../fpload/fetcher/utilityFunctions';

export interface SøkerApiResponse {
    aktørId: string;
    fødselsnummer: string;
    fornavn: string;
    mellomnavn: string | null;
    etternavn: string;
}

export interface SøkerP extends ioTs.Props {
    aktørId: ioTs.StringC;
    fødselsnummer: ioTs.StringC;
    mellomnavn: ioTs.UnionC<[ioTs.StringC, ioTs.NullC]>;
    etternavn: ioTs.StringC;
    fornavn: ioTs.StringC;
}

export type SøkerValidatorType = ioTs.TypeC<SøkerP>;

export const søkerValidator: SøkerValidatorType = ioTs.type({
    aktørId: ioTs.string,
    fødselsnummer: ioTs.string,
    fornavn: ioTs.string,
    mellomnavn: ioTs.union([ioTs.string, ioTs.nullType]),
    etternavn: ioTs.string,
});

export type Søker = ioTs.TypeOf<typeof søkerValidator>;

export const søkerRecipe: FetchRecipe<SøkerP> = {
    url: getApiUrlByResourceType(ResourceType.SØKER),
    validator: søkerValidator,
};

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

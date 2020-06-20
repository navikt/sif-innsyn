import { isString } from '@navikt/sif-common-core/lib/utils/typeGuardUtils';
import { allValuesInArrayAreTrue } from '../../utils/utilityFunctions';
import * as ioTs from 'io-ts';

export const BarnValidator = ioTs.type({
    aktørId: ioTs.string,
    fødselsnummer: ioTs.string,
    fornavn: ioTs.string,
    mellomnavn: ioTs.union([ioTs.string, ioTs.voidType]),
    etternavn: ioTs.string,
});

export const BarnResponseValidator = ioTs.type({
    barn: ioTs.array(BarnValidator),
});

export type BarnFp = ioTs.TypeOf<typeof BarnResponseValidator>;

export interface Barn {
    aktørId: string;
    fødselsnummer: string;
    fornavn: string;
    mellomnavn: string | void;
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

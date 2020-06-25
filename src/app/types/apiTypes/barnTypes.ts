import { isString } from '@navikt/sif-common-core/lib/utils/typeGuardUtils';
import { allValuesInArrayAreTrue } from '../../utils/utilityFunctions';
import * as IoTs from 'io-ts/lib';
import { getApiUrlByResourceType } from '../../utils/apiUtils';
import { ResourceType } from '../resourceTypes';
import { FetchRecipe } from '../../functional/fetcher/utilityFunctions';

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

export const BarnValidator = IoTs.type({
    aktørId: IoTs.string,
    fødselsnummer: IoTs.string,
    fornavn: IoTs.string,
    mellomnavn: IoTs.union([IoTs.string, IoTs.voidType]),
    etternavn: IoTs.string,
});

export interface BarnP extends IoTs.Props {
    barn: IoTs.ArrayC<
        IoTs.TypeC<{
            mellomnavn: IoTs.UnionC<[IoTs.StringC, IoTs.VoidC]>;
            etternavn: IoTs.StringC;
            aktørId: IoTs.StringC;
            fødselsnummer: IoTs.StringC;
            fornavn: IoTs.StringC;
        }>
    >;
}

export const barnResponseValidator: IoTs.TypeC<BarnP> = IoTs.type({
    barn: IoTs.array(BarnValidator),
});

export type BarnFp = IoTs.TypeOf<typeof barnResponseValidator>;

export const barnRecipe: FetchRecipe<BarnP> = {
    url: getApiUrlByResourceType(ResourceType.BARN),
    validator: barnResponseValidator,
};

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

import * as IoTs from 'io-ts/lib';
import { getApiUrlByResourceType } from '../../utils/apiUtils';
import { ResourceType } from '../resourceTypes';
import { allValuesInArrayAreTrue } from '../../utils/utilityFunctions';
import { UUID } from 'io-ts-types/es6/UUID';
import { FetchRecipe } from '../../functional/fetcher/types';

export enum Søknadsstatus {
    MOTTATT = 'MOTTATT',
    UNDER_BEHANDLING = 'UNDER_BEHANDLING',
    FERDIG_BEHANDLET = 'FERDIG_BEHANDLET',
}

export enum Søknadstype {
    PP_ETTERSENDING = 'PP_ETTERSENDING',
    PP_SYKT_BARN = 'PP_SYKT_BARN',
    // OMP_UTVIDET_RETT = 'OMP_UTVIDET_RETT',
    // OMP_UTBETALING_SNF = 'OMP_UTBETALING_SNF',
    // OMP_UTBETALING_ARBEIDSTAKER = 'OMP_UTBETALING_ARBEIDSTAKER',
    // OMP_ETTERSENDING = 'OMP_ETTERSENDING',
    // PP_NÆRSTÅENDE = 'PP_NÆRSTÅENDE',
    // OMD_OVERFØRING = 'OMD_OVERFØRING',
    // OPPLÆRINGSPENGER = 'OPPLÆRINGSPENGER',
}

export enum SupportedSøknadstype {
    PP_SYKT_BARN = 'PP_SYKT_BARN',
}

interface PleiepengesøknadInfo {
    søknadstype: Søknadstype.PP_SYKT_BARN;
    fraOgMed: Date;
    tilOgMed: Date;
}
interface EttersendingInfo {
    søknadstype: Søknadstype.PP_ETTERSENDING;
    beskrivelse: string;
}

interface SøknadBase {
    søknadId: UUID;
    søknadstype: Søknadstype;
    status: Søknadsstatus;
    søknad: PleiepengesøknadInfo | EttersendingInfo;
    journalpostId: string;
    opprettet: Date; // LocalDateTime e.g. 2007-12-03T10:15:30.948652
}
export interface Pleiepengesøknad extends SøknadBase {
    søknadstype: Søknadstype.PP_SYKT_BARN;
    søknad: PleiepengesøknadInfo;
}
export interface PleiepengerEttersending extends SøknadBase {
    søknadstype: Søknadstype.PP_ETTERSENDING;
    søknad: EttersendingInfo;
}

export type Søknad = Pleiepengesøknad | PleiepengerEttersending;

export type SøknadApiResponse = Søknad[];

export const isSøknad = (input: any): input is Søknad => {
    if (input && input.søknadstype && input.status && input.journalpostId) {
        return true;
    } else {
        return false;
    }
};

export const isSøknadApiResponse = (input: unknown): input is SøknadApiResponse => {
    if (Array.isArray(input) && allValuesInArrayAreTrue(input.map(isSøknad))) {
        return true;
    } else {
        return false;
    }
};

export const søknadApiResponseType: IoTs.Type<SøknadApiResponse> = new IoTs.Type<
    SøknadApiResponse,
    SøknadApiResponse,
    unknown
>(
    'SøknadApiResponse',
    isSøknadApiResponse,
    (input: unknown, context: IoTs.Context) =>
        isSøknadApiResponse(input) ? IoTs.success(input) : IoTs.failure(input, context),
    IoTs.identity
);

export const søknadRecipe: FetchRecipe<SøknadApiResponse> = {
    url: getApiUrlByResourceType(ResourceType.SØKNAD),
    validator: søknadApiResponseType,
};

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
    PP_ETTERSENDING = 'PP_ETTERSENDELSE',
    PP_SYKT_BARN = 'PP_SYKT_BARN',
    PP_ENDRINGSMELDING = 'PP_ENDRINGSMELDING',
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

export interface Organisasjon {
    navn: string;
    skalJobbe: string;
    skalJobbeProsent: number;
    vetIkkeEkstrainfo?: string | null;
    jobberNormaltTimer: number;
    organisasjonsnummer: string;
}

export interface Arbeidsgivere {
    organisasjoner: Organisasjon[];
}

export interface Arbeidsgiver {
    erAnsatt: boolean;
    navn: string;
    organisasjonsnummer: string;
}

export interface Dokument {
    tittel: string;
    url: string;
    filtype: string;
    dokumentInfoId: string;
}

export interface PleiepengerSøknadInfo {
    søknadstype: Søknadstype.PP_SYKT_BARN;
    arbeidsgivere: Arbeidsgivere | Arbeidsgiver[];
    fraOgMed: Date;
    tilOgMed: Date;
    mottatt: Date; // LocalDateTime e.g. 2007-12-03T10:15:30.948652
}
interface PleiepengerEttersendingInfo {
    søknadstype: Søknadstype.PP_ETTERSENDING;
    beskrivelse: string;
    mottatt: Date; // LocalDateTime e.g. 2007-12-03T10:15:30.948652
}

interface SøknadBase {
    søknadId: UUID;
    søknadstype: Søknadstype;
    status: Søknadsstatus;
    søknad: PleiepengerSøknadInfo | PleiepengerEttersendingInfo;
    journalpostId: string;
    opprettet: Date; // LocalDateTime e.g. 2007-12-03T10:15:30.948652
    dokumenter: Dokument[];
}
export interface Pleiepengesøknad extends SøknadBase {
    søknadstype: Søknadstype.PP_SYKT_BARN;
    søknad: PleiepengerSøknadInfo;
}
export interface PleiepengerEttersending extends SøknadBase {
    søknadstype: Søknadstype.PP_ETTERSENDING;
    søknad: PleiepengerEttersendingInfo;
}

export interface PleiepengerEndringsmelding extends SøknadBase {
    søknadstype: Søknadstype.PP_ENDRINGSMELDING;
    søknad: PleiepengerSøknadInfo;
}

export type Søknad = Pleiepengesøknad | PleiepengerEttersending | PleiepengerEndringsmelding;

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

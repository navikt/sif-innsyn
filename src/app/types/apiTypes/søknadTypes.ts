import * as IoTs from 'io-ts/lib';
import { getApiUrlByResourceType } from '../../utils/apiUtils';
import { ResourceType } from '../resourceTypes';
import { FetchRecipe } from '../../functional/fetcher/utilityFunctions';
import { allValuesInArrayAreTrue } from '../../utils/utilityFunctions';

export enum Søknadsstatus {
    MOTTATT = 'MOTTATT',
    UNDER_BEHANDLING = 'UNDER_BEHANDLING',
    FERDIG_BEHANDLET = 'FERDIG_BEHANDLET',
}

export enum Søknadstype {
    OMP_UTVIDET_RETT = 'OMP_UTVIDET_RETT',
    OMP_UTBETALING_SNF = 'OMP_UTBETALING_SNF',
    OMP_UTBETALING_ARBEIDSTAKER = 'OMP_UTBETALING_ARBEIDSTAKER',
    OMP_ETTERSENDING = 'OMP_ETTERSENDING',
    PP_ETTERSENDING = 'PP_ETTERSENDING',
    PP_SYKT_BARN = 'PP_SYKT_BARN',
    PP_NÆRSTÅENDE = 'PP_NÆRSTÅENDE',
    OMD_OVERFØRING = 'OMD_OVERFØRING',
    OPPLÆRINGSPENGER = 'OPPLÆRINGSPENGER',
}

export interface Søknad {
    søknadstype: Søknadstype;
    status: Søknadsstatus;
    søknad: any; // TODO: Lag søknadstyper for hver av søknadene
    saksId: string;
    journalpostId: string;
    opprettet: string | null; // LocalDateTime e.g. 2007-12-03T10:15:30.948652
    endret: string | null; // LocalDateTime e.g. 2020-06-23T09:11:21.948652
    behandlingsdato: string | null; // LocalDate e.g. 2007-12-03
}

export type SøknadApiResponse = Søknad[];

export const isSøknad = (input: any): input is Søknad => {
    if (input && input.søknadstype && input.status && input.saksId && input.journalpostId) {
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

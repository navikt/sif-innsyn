import * as IoTs from 'io-ts/lib';
import * as ioTs from 'io-ts';
import { stringEnum } from '../../functional/utilities';

export enum Søknadsstatus {
    MOTTATT = 'MOTTATT',
    UNDER_BEHANDLING = 'UNDER_BEHANDLING',
    FERDIG_BEHANDLET = 'FERDIG_BEHANDLET',
}

export const søknadsstatusValidator = stringEnum(Søknadsstatus, 'Søknadsstatus');

export enum Søknadstype {
    OMP_UTVIDET_RETT = 'OMP_UTVIDET_RETT',
    OMP_UTBETALING_SNF = 'OMP_UTBETALING_SNF',
    OMP_UTBETALING_ARBEIDSTAKER = 'OMP_UTBETALING_ARBEIDSTAKER',
    OMP_ETTERSENDING = 'OMP_ETTERSENDING',
    PP_ETTERSENDING = 'PP_ETTERSENDING',
    PP_SYKT_BARN = 'PP_SYKT_BARN',
    OMD_OVERFØRING = 'OMD_OVERFØRING',
}

export const søknadstypeValidator = stringEnum(Søknadstype, 'Søknadstype');

export interface Søknad {
    søknadstype: Søknadstype;
    status: Søknadstype;
    søknad: any; // TODO: Lag søknadstyper for hver av søknadene
    saksId: string;
    journalpostId: string;
    opprettet: string | null; // LocalDateTime e.g. 2007-12-03T10:15:30.948652
    endret: string | null; // LocalDateTime e.g. 2020-06-23T09:11:21.948652
    behandlingsdato: string | null; // LocalDate e.g. 2007-12-03
}

export const søknadValidator = IoTs.type({
    søknadstype: søknadstypeValidator,
    status: søknadsstatusValidator,
    søknad: IoTs.unknown, // TODO: Lag søknadstyper for hver av søknadene
    saksId: IoTs.string,
    journalpostId: IoTs.string,
    opprettet: ioTs.union([ioTs.string, ioTs.nullType]), // LocalDateTime e.g. 2007-12-03T10:15:30.948652
    endret: ioTs.union([ioTs.string, ioTs.nullType]), // LocalDateTime e.g. 2020-06-23T09:11:21.948652
    behandlingsdato: ioTs.union([ioTs.string, ioTs.nullType]), // LocalDate e.g. 2007-12-03
});

export type SøknadApiResponse = Søknad[];

export const søknadApiResponseValidator = IoTs.array(søknadValidator);

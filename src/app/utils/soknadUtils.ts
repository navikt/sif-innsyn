import { Søknad, Søknadstype } from '../types/apiTypes/søknadTypes';

export const erPleiepenger = (søknad: Søknad): boolean => {
    return søknad.søknadstype == Søknadstype.PP_ETTERSENDING || søknad.søknadstype == Søknadstype.PP_SYKT_BARN;
};
// export const erOmsorgspenger = (søknad: Søknad): boolean => {
//     return (
//         søknad.søknadstype === Søknadstype.OMP_UTVIDET_RETT ||
//         søknad.søknadstype === Søknadstype.OMP_UTBETALING_SNF ||
//         søknad.søknadstype === Søknadstype.OMP_UTBETALING_ARBEIDSTAKER ||
//         søknad.søknadstype === Søknadstype.OMP_ETTERSENDING
//     );
// };

// export const søknadTypeErPleiepengerNærstående = (type: Søknadstype): boolean => {
//     return type === Søknadstype.PP_NÆRSTÅENDE;
// };

export const søknadTypeErPleiepenger = (type: Søknadstype): boolean => {
    return type === Søknadstype.PP_ETTERSENDING || type === Søknadstype.PP_SYKT_BARN;
};

// export const søknadTypeErOmsorgspenger = (type: Søknadstype): boolean => {
//     return (
//         type === Søknadstype.OMP_UTVIDET_RETT ||
//         type === Søknadstype.OMP_UTBETALING_ARBEIDSTAKER ||
//         type === Søknadstype.OMP_UTBETALING_SNF ||
//         type === Søknadstype.OMP_ETTERSENDING
//     );
// };

// export const søknadTypeErOpplæringspenger = (type: Søknadstype): boolean => {
//     return type === Søknadstype.OPPLÆRINGSPENGER;
// };

export const getSøknadTitle = (søknad: Søknad, shortVersion?: boolean): string => {
    switch (søknad.søknadstype) {
        case Søknadstype.PP_SYKT_BARN:
            return shortVersion ? 'Søknad' : 'Søknad om pleiepenger for sykt barn';
        case Søknadstype.PP_ETTERSENDING:
            return shortVersion ? 'Ettersending' : 'Melding om ettersending for pleiepenger';
        // case Søknadstype.OMD_OVERFØRING:
        //     return 'Søknad om overføring av omsorgsdager';
        // case Søknadstype.OMP_UTBETALING_SNF:
        //     return 'Søknad om utbetaling av omsorgspenger for selvstendig næringsdrivende og frilans';
        // case Søknadstype.OMP_UTBETALING_ARBEIDSTAKER:
        //     return 'Søknad om utbetaling av omsorgspenger for arbeidstakere';
        // case Søknadstype.OMP_ETTERSENDING:
        //     return 'Melding om ettersending for omsorgspenger';
        // case Søknadstype.OMP_UTVIDET_RETT:
        //     return 'Søknad om utvidet rett av omsorgspenger';
        // case Søknadstype.OPPLÆRINGSPENGER:
        //     return 'Søknad om opplæringspenger';
        // case Søknadstype.PP_NÆRSTÅENDE:
        //     return 'Søknad om pleiepenger nærstående';
    }
};

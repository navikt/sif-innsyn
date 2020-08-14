import { Søknad, Søknadstype } from '../types/apiTypes/søknadTypes';

export const erPleiepenger = (søknad: Søknad) => {
    return søknad.søknadstype == Søknadstype.PP_ETTERSENDING || søknad.søknadstype == Søknadstype.PP_SYKT_BARN;
};
export const erOmsorgspenger = (søknad: Søknad) => {
    return (
        søknad.søknadstype == Søknadstype.OMP_UTVIDET_RETT ||
        søknad.søknadstype == Søknadstype.OMP_UTBETALING_SNF ||
        søknad.søknadstype == Søknadstype.OMP_UTBETALING_ARBEIDSTAKER ||
        søknad.søknadstype == Søknadstype.OMP_ETTERSENDING
    );
};

export const søknadTypeErPleiepengerNærstående = (type: Søknadstype) => {
    return type === Søknadstype.PP_NÆRSTÅENDE;
};

export const søknadTypeErPleiepenger = (type: Søknadstype) => {
    return type == Søknadstype.PP_ETTERSENDING || type == Søknadstype.PP_SYKT_BARN;
};

export const søknadTypeErOmsorgspenger = (type: Søknadstype) => {
    return (
        type == Søknadstype.OMP_UTVIDET_RETT ||
        type == Søknadstype.OMP_UTBETALING_ARBEIDSTAKER ||
        type === Søknadstype.OMP_UTBETALING_SNF ||
        type === Søknadstype.OMP_ETTERSENDING
    );
};

export const søknadTypeErOpplæringspenger = (type: Søknadstype) => {
    return type == Søknadstype.OPPLÆRINGSPENGER;
};

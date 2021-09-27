import { Søknad, Søknadstype } from '../types/apiTypes/søknadTypes';

export const erPleiepenger = (søknad: Søknad): boolean => {
    return søknad.søknadstype == Søknadstype.PP_ETTERSENDING || søknad.søknadstype == Søknadstype.PP_SYKT_BARN;
};

export const søknadstypeErPleiepenger = (type: Søknadstype): boolean => {
    return type === Søknadstype.PP_ETTERSENDING || type === Søknadstype.PP_SYKT_BARN;
};

export const getSøknadTitle = (søknad: Søknad, shortVersion?: boolean): string => {
    switch (søknad.søknadstype) {
        case Søknadstype.PP_SYKT_BARN:
            return shortVersion ? 'Søknad' : 'Søknad om pleiepenger';
        case Søknadstype.PP_ETTERSENDING:
            return shortVersion ? 'Ettersending' : 'Melding om ettersending for pleiepenger';
    }
};

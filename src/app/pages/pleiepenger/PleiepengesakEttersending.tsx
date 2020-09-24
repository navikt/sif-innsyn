import React from 'react';
import Lenke from 'nav-frontend-lenker';
import getLenker from '../../lenker';
import { PleiepengerEttersending } from '../../types/apiTypes/søknadTypes';
import SoknadInfo from '../../components/soknad-info/SoknadInfo';

interface Props {
    søknad: PleiepengerEttersending;
}

const PleiepengesakEttersending = ({ søknad }: Props) => {
    return (
        <div>
            <SoknadInfo søknad={søknad} />
            Informasjon er ikke bestemt for denne siden
            <p>
                Fordi denne siden er under utvikling kan du for øyeblikket ikke se søknaden din eller vedleggene du har
                sendt. Du vil heller ikke per i dag se om arbeidsgiver har sendt inn inntektsmelding til oss. Disse
                tjenestene kommer på et senere tidspunkt. Når søknaden din er ferdig behandlet får du beskjed om det på
                <Lenke href={getLenker().dittNAV}>Ditt NAV</Lenke>.
            </p>
        </div>
    );
};

export default PleiepengesakEttersending;

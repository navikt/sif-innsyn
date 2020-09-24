import Lenke from 'nav-frontend-lenker';
import React from 'react';
import Box from '../../components/elements/box/Box';
import Knappelenke from '../../components/knappelenke/Knappelenke';
import Knapperad from '../../components/knapperad/Knapperad';
import PrettyDate, { getPrettyDate } from '../../components/pretty-date/PrettyDate';
import SectionPanel from '../../components/section-panel/SectionPanel';
import getLenker from '../../lenker';
import { Pleiepengesøknad } from '../../types/apiTypes/søknadTypes';
import { getSøknadTitle } from '../../utils/soknadUtils';
import NyttigInforPanel from './NyttigInfo';

interface Props {
    søknad: Pleiepengesøknad;
}

const PleiepengesakSøknad = ({ søknad }: Props) => {
    console.log(getLenker().ettersending);

    return (
        <>
            <SectionPanel
                title={`${getSøknadTitle(søknad, true)} mottatt ${getPrettyDate(søknad.opprettet, 'dayDateAndTime')}`}
                header={<Box padBottom="s">Pleiepenger for sykt barn</Box>}>
                <Box margin="l">
                    <p>
                        <strong>
                            Gjelder for perioden <PrettyDate date={søknad.søknad.fraOgMed} /> -{' '}
                            <PrettyDate date={søknad.søknad.tilOgMed} />
                        </strong>
                    </p>
                    <p>
                        Fordi denne siden er under utvikling kan du for øyeblikket ikke se søknaden din eller vedleggene
                        du har sendt. Du vil heller ikke per i dag se om arbeidsgiver har sendt inn inntektsmelding til
                        oss. Disse tjenestene kommer på et senere tidspunkt.
                    </p>
                    <p>
                        Når søknaden din er ferdig behandlet får du beskjed om det på{' '}
                        <Lenke href={getLenker().dittNAV}>Ditt NAV</Lenke>.
                    </p>
                    <Box margin="xl" padBottom="xl">
                        <Knapperad align="left">
                            <Knappelenke mini={true} href={getLenker().ettersending}>
                                Ettersend dokumentasjon
                            </Knappelenke>
                        </Knapperad>
                    </Box>
                </Box>
            </SectionPanel>
            <NyttigInforPanel />
        </>
    );
};

export default PleiepengesakSøknad;

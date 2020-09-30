import React from 'react';
import Lenke from 'nav-frontend-lenker';
import Box from '../../../components/elements/box/Box';
import Knappelenke from '../../../components/knappelenke/Knappelenke';
import Knapperad from '../../../components/knapperad/Knapperad';
import PrettyDate, { getPrettyDate } from '../../../components/pretty-date/PrettyDate';
import SakstypeTittel from '../../../components/sakstype-tittel/SakstypeTittel';
import SectionPanel from '../../../components/section-panel/SectionPanel';
import getLenker from '../../../lenker';
import { Pleiepengesøknad } from '../../../types/apiTypes/søknadTypes';
import { Sakstype } from '../../../types/types';
import { getSøknadTitle } from '../../../utils/soknadUtils';
import NyttigInforPanel from './NyttigInfo';

interface Props {
    søknad: Pleiepengesøknad;
}

const PleiepengesakSøknad = ({ søknad }: Props) => {
    return (
        <>
            <SectionPanel
                title={`${getSøknadTitle(søknad, true)} er mottatt ${getPrettyDate(
                    søknad.opprettet,
                    'dayDateAndTime'
                )}`}
                titleTag="h1"
                header={
                    <Box padBottom="s">
                        <SakstypeTittel sakstype={Sakstype.PLEIEPENGER} />
                    </Box>
                }>
                <Box margin="l">
                    <p style={{ fontWeight: 'bold' }}>
                        Gjelder for perioden <PrettyDate date={søknad.søknad.fraOgMed} /> -{' '}
                        <PrettyDate date={søknad.søknad.tilOgMed} />
                    </p>
                    <p>Dette er en bekreftelse på at vi har mottatt søknaden din. </p>
                    <p>
                        Du vil ikke kunne se oppdatert status på søknaden din her, men når den er ferdigbehandlet får du
                        beskjed om det under saksoversikten din på <Lenke href={getLenker().dittNAV}>Ditt NAV</Lenke>.
                    </p>
                    <Box margin="xl" padBottom="xl">
                        <Knapperad align="left">
                            <Knappelenke mini={true} href={getLenker().ettersending}>
                                Ettersend dokumentasjon
                            </Knappelenke>
                        </Knapperad>
                    </Box>
                    <p>
                        Denne siden er under utvikling, og derfor kan du for øyeblikket ikke åpne søknaden din eller
                        vedleggende du har sendt. Disse tjenestene kommer på et senere tidspunkt.
                    </p>
                </Box>
            </SectionPanel>
            <NyttigInforPanel />
        </>
    );
};

export default PleiepengesakSøknad;

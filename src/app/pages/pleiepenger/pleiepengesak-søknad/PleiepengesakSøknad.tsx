import React from 'react';
import { useIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import AriaAlternative from '../../../components/aria/AriaAlternative';
import Box from '../../../components/elements/box/Box';
import Knappelenke from '../../../components/knappelenke/Knappelenke';
import Knapperad from '../../../components/knapperad/Knapperad';
import PrettyDate, { getPrettyDate } from '../../../components/pretty-date/PrettyDate';
import SectionPanel from '../../../components/section-panel/SectionPanel';
import getLenker from '../../../lenker';
import { Pleiepengesøknad } from '../../../types/apiTypes/søknadTypes';
import { Sakstype } from '../../../types/types';
import { getSakstypeTitle } from '../../../utils/sakstypeUtils';
import { getSøknadTitle } from '../../../utils/soknadUtils';
import InfoEtterSendtSøknad from './InfoEtterSendtSøknad';

interface Props {
    søknad: Pleiepengesøknad;
}

const PleiepengesakSøknad = ({ søknad }: Props) => {
    const intl = useIntl();
    const title = getSakstypeTitle(intl, Sakstype.PLEIEPENGER);
    return (
        <>
            <SectionPanel
                title={`${getSøknadTitle(søknad, true)} er mottatt ${getPrettyDate(
                    søknad.opprettet,
                    'dayDateAndTime'
                )}`}
                titleTag="h1"
                introHeader={
                    <Box padBottom="s">
                        <AriaAlternative ariaText={`Søknad om ${title}`} visibleText={title} />
                    </Box>
                }>
                <p style={{ fontWeight: 'bold' }}>
                    Gjelder for perioden <PrettyDate date={søknad.søknad.fraOgMed} /> til{' '}
                    <PrettyDate date={søknad.søknad.tilOgMed} />
                </p>
                <p>Dette er en bekreftelse på at vi har mottatt søknaden din. </p>
                <Box margin="xl">
                    <Knapperad align="left">
                        <Knappelenke mini={true} href={getLenker().ettersending}>
                            Ettersend dokumentasjon
                        </Knappelenke>
                    </Knapperad>
                </Box>
                <Box margin="xxl">
                    <p>Denne siden er under utvikling, og derfor kan du for øyeblikket ikke</p>
                    <ul>
                        <li>åpne søknaden eller vedleggene du har sendt</li>
                        <li>se oppdatert status på søknaden din</li>
                    </ul>
                    <p>
                        Disse tjenestene vil komme på et senere tidspunkt. Når søknaden din er ferdig behandlet får du
                        beskjed om det under{' '}
                        <Lenke href={getLenker().saksoversikt}>saksoversikten din på Ditt NAV</Lenke>.
                    </p>
                </Box>
            </SectionPanel>
            <InfoEtterSendtSøknad />
        </>
    );
};

export default PleiepengesakSøknad;

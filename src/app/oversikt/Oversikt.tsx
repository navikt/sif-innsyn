import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import Box from '../components/elements/box/Box';
import InfoManglendeSøknad from '../components/info-manglende-søknad/InfoManglendeSøknad';
import InnsynPage from '../components/innsyn-page/InnsynPage';
import PageBanner from '../components/page-banner/PageBanner';
import SectionPanel from '../components/section-panel/SectionPanel';
import SvgSykdomIFamilien from '../svg/SvgSykdomIFamilien';
import { Søknad } from '../types/apiTypes/søknadTypes';
import DineSakerListe from './dine-saker-liste/DineSakerListe';

interface Props {
    søknader: Søknad[];
}

const Oversikt = ({ søknader }: Props) => {
    return (
        <InnsynPage
            title="Sykdom i familien - din oversikt"
            topContentRenderer={() => (
                <PageBanner
                    title={
                        <span>
                            Din oversikt - <span style={{ whiteSpace: 'nowrap' }}>sykdom i familien</span>
                        </span>
                    }
                    illustration={<SvgSykdomIFamilien />}
                />
            )}>
            <SectionPanel>
                <p>
                    Du har kommet til siden Sykdom i familien – din oversikt. Denne siden er under utvikling, og etter
                    hvert vil du kunne få oversikt, og følge saken din fra du har sendt en søknad til du får svar fra
                    NAV
                </p>
                <Element tag="h3">Hva kan jeg finne av informasjon om mine saker her?</Element>
                <p>Per i dag kan du se:</p>
                <ul>
                    <li>om digital søknad om Pleiepenger for sykt barn er mottatt, og</li>
                    <li>når den er mottatt</li>
                </ul>
                <p>
                    Hvis du har sendt digital søknad om omsorgspenger, opplæringspenger eller pleiepenger i livets
                    sluttfase, kan du foreløpig ikke finne noe informasjon om disse på denne siden. Søknader som er
                    sendt inn per post vises ikke her
                </p>
            </SectionPanel>

            <SectionPanel title="Dine saker">
                <Box>
                    <DineSakerListe søknader={søknader} />
                </Box>
                <Box>
                    <InfoManglendeSøknad />
                </Box>
            </SectionPanel>
        </InnsynPage>
    );
};

export default Oversikt;

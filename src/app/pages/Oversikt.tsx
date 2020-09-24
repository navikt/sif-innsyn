import * as React from 'react';
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
                    På denne siden får du en bekreftelse på at vi har mottatt digitale søknader du har sendt om
                    pleiepenger for sykt barn. Siden er under utvikling og derfor kan du foreløpig ikke åpne og se
                    søknaden, eller vedleggene du har sendt. Disse tjenestene kommer på et senere tidspunkt.
                </p>
                <p>
                    Hvis du har sendt digital søknad om omsorgspenger, opplæringspenger eller pleiepenger i livets
                    sluttfase, finner du foreløpig ingen informasjon om disse på denne siden. Dette er også tjenester
                    som kommer på et senere tidspunkt.
                </p>
                <p>
                    <strong>Søknader som er sendt inn per post vises ikke her, de finner du i denne oversikten.</strong>
                </p>
            </SectionPanel>

            <SectionPanel title="Dine saker">
                <Box>
                    <DineSakerListe søknader={søknader} />
                </Box>
                <Box>
                    <InfoManglendeSøknad mode="expandable" />
                </Box>
            </SectionPanel>
        </InnsynPage>
    );
};

export default Oversikt;

import Lenke from 'nav-frontend-lenker';
import * as React from 'react';
import { useIntl } from 'react-intl';
import Box from '../../components/elements/box/Box';
import InformationIcon from '../../components/information-poster/InformationIcon';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import PageBanner from '../../components/page-banner/PageBanner';
import SectionPanel from '../../components/section-panel/SectionPanel';
import getLenker from '../../lenker';
import SvgSykdomIFamilien from '../../svg/SvgSykdomIFamilien';
import { Sakstype } from '../../types/types';
import SakstyperListe from './dine-saker-liste/DineSakerListe';

const Oversikt = () => {
    const intl = useIntl();
    return (
        <InnsynPage
            title="Sykdom i familien - din oversikt"
            topContentRenderer={() => (
                <PageBanner
                    title={
                        <>
                            Din oversikt - <span style={{ whiteSpace: 'nowrap' }}>sykdom i familien</span>
                        </>
                    }
                    illustration={<SvgSykdomIFamilien />}
                />
            )}>
            <Box margin="l">
                <SectionPanel
                    ariaTitle={'Introduksjon'}
                    illustration={<InformationIcon />}
                    illustrationPlacement="outside">
                    <p>
                        På denne siden får du en bekreftelse på at vi har mottatt digitale søknader du har sendt om
                        pleiepenger for sykt barn. Siden er under utvikling og derfor kan du foreløpig ikke åpne og se
                        søknaden, eller vedleggene du har sendt. Disse tjenestene kommer på et senere tidspunkt.
                    </p>
                    <p>
                        Hvis du har sendt digital søknad om omsorgspenger, opplæringspenger eller pleiepenger i livets
                        sluttfase, finner du foreløpig ingen informasjon om disse på denne siden. Dette er også
                        tjenester som kommer på et senere tidspunkt.
                    </p>
                    <p style={{ fontWeight: 'bold' }}>
                        Søknader som er sendt inn per post vises ikke her, de finner du{' '}
                        <Lenke href={getLenker(intl.locale).saksoversikt}>i denne oversikten</Lenke>.
                    </p>
                </SectionPanel>
            </Box>

            <SectionPanel title="Dine saker">
                <Box>
                    <SakstyperListe sakstyper={[Sakstype.PLEIEPENGER]} />
                </Box>
            </SectionPanel>
        </InnsynPage>
    );
};

export default Oversikt;

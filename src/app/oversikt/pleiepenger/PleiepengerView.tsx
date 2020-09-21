import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import ExpandableInfo from 'app/components/expandable-info/ExpandableInfo';
import ProcessDescription from 'app/components/process-description/ProcessDescription';
import Box from '../../components/elements/box/Box';
import Title from '../../components/elements/title/Title';
import InfoManglendeSøknad from '../../components/info-manglende-søknad/InfoManglendeSøknad';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import PageBannerCompact from '../../components/page-banner_compact/PageBannerCompact';
import SectionPanel from '../../components/sectionPanel/SectionPanel';
import SoknadList from '../../components/soknad-list/SoknadList';
import { SøknadApiResponse } from '../../types/apiTypes/søknadTypes';
import './PleiepengerView.less';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';

interface Props {
    søknader: SøknadApiResponse;
}

const PleiepengerView: React.FC<Props> = ({ søknader }: Props) => {
    const title = 'Pleiepenger for sykt barn';
    return (
        <InnsynPage
            title={title}
            topContentRenderer={() => <PageBannerCompact title={title} />}
            breadcrumbsRenderer={() => <Breadcrumbs title={title} />}>
            <AlertStripe type="info">
                Denne siden er under utvikling. Foreløpig kan du se søknader du har sendt inn om Pleiepenger for sykt
                barn. Etterhvert vil du kunne se mer informasjon om saken din.
            </AlertStripe>

            <Box margin="xl">
                <SectionPanel title="Dine søknader">
                    <SoknadList søknader={søknader} />
                    <Box margin="l">
                        <InfoManglendeSøknad />
                    </Box>
                </SectionPanel>
            </Box>

            <SectionPanel title="Nyttig informasjon">
                <Ekspanderbartpanel tittel="Dette kan du forvente deg etter at du har sendt søknad">
                    <ProcessDescription
                        steps={[
                            <div key={'legeerklæring'}>
                                <Title titleType="element">Du har sendt søknad med legeerklæring</Title>
                                <p>
                                    Hvis du ikke har sendt legeerklæring med søknaden din, må du{' '}
                                    <Lenke href="#TODO">ettersende denne</Lenke> så snart du kan
                                </p>
                            </div>,
                            <div key="inntektsmelding">
                                <Title titleType="element">Arbeidsgiveren din sender inntektsmelding til oss</Title>
                                <ExpandableInfo title="Hva betyr dette?">
                                    <p>
                                        Du må selv si fra til arbeidsgiveren din om at de må sende en inntektsmelding
                                        til oss. Inntektsmeldingen gir oss blant annet informasjon om lønna di, og om
                                        arbeidsgiver vil ha refusjon eller ei.
                                    </p>
                                </ExpandableInfo>
                            </div>,
                            <div key="behandling" style={{ display: 'grid', gridGap: '0.5em' }}>
                                <div>
                                    <Title titleType="element">Vi ser på søknaden din og behandler den</Title>
                                    <Lenke href="#TODO">Se saksbehandlingstider der du bor</Lenke>
                                </div>
                                <p>Vi kontakter deg hvis vi trenger mer informasjon</p>
                                <div>
                                    <Title titleType="element">
                                        Hvis noe i situasjonen din endrer seg må du si fra til oss
                                    </Title>
                                    <ExpandableInfo title="Hvilke endringer må jeg si fra om?">
                                        <ul>
                                            <li>barnet ikke lenger har behov for kontinuerlig omsorg og pleie.</li>
                                            <li>barnet begynner eller øker tiden i et omsorgstilbud.</li>
                                            <li>du begynner å jobbe igjen, eller øker antall arbeidstimer.</li>
                                            <li>omsorgen for barnet er overført til andre, helt eller delvis.</li>
                                            <li>du får omsorgsstønad fra kommunen.</li>
                                            <li>du skal ha lovbestemt ferie. Hva er lovbestemt ferie?</li>
                                            <li>du skal til utlandet.</li>
                                        </ul>
                                        <p>
                                            Du melder fra om endringer ved å skrive en beskjed til oss. Du kan også
                                            ringe 55 55 33 33, tastevalg 3.
                                        </p>
                                    </ExpandableInfo>
                                </div>
                            </div>,
                            <div key="svar">
                                <Title titleType="element">
                                    Når søknaden er ferdig behandlet får du tilsendt svar i saksoversikten på Ditt NAV
                                    og i posten.
                                </Title>
                                <ExpandableInfo title="Hvilke endringer må jeg si fra om?">
                                    <p>
                                        Når vi har sett på saken din vil vi sende deg et svar på søknaden din. I svaret
                                        vil det stå om du har fått innvilget det du har søkt om.
                                    </p>
                                </ExpandableInfo>
                            </div>,
                            <div key="saksoversikt">
                                <Title titleType="element">
                                    Hvis du får innvilget pleiepenger vil det registreres i saksoversikten din at du
                                    skal ha utbetaling
                                </Title>
                                <ExpandableInfo title="Når får jeg utbetaling?">
                                    <p>
                                        Utbetaling av pleiepenger fra NAV er i slutten av hver måned. Hvis du har fått
                                        innvilget pleiepenger for en periode tilbake i tid sender vi utbetaling for
                                        passerte måneder med en gang.
                                    </p>
                                    <p>
                                        Hvis arbeidsgiveren din skal ha refusjon (utbetale lønn til deg som vanlig og få
                                        tilbake pengene fra NAV) må du høre med arbeidsgiver om det er noe du lurer på
                                        angående lønnen din.
                                    </p>
                                </ExpandableInfo>
                            </div>,
                        ]}
                    />
                </Ekspanderbartpanel>
                <Box margin="xl" className="knapp-gruppe">
                    <code>Dersom dette er lenker, bør det ikke være knapper</code>
                    <ul>
                        <li>
                            <Hovedknapp>Ettersend dokumentasjon</Hovedknapp>
                        </li>
                        <li>
                            <Hovedknapp>Send en ny søknad</Hovedknapp>
                        </li>
                    </ul>
                </Box>
            </SectionPanel>
        </InnsynPage>
    );
};

export default PleiepengerView;

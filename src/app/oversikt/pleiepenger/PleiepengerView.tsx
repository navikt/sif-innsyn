import * as React from 'react';
import { SøknadApiResponse } from '../../types/apiTypes/søknadTypes';
import './PleiepengerView.less';
import SoknadstatusinfoComponent from 'app/components/soknadstatusinfoComponent/SoknadstatusinfoComponent';
import { Ingress, Undertittel} from 'nav-frontend-typografi';
import { Ingress, Normaltekst, Sidetittel, Undertittel } from 'nav-frontend-typografi';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { useHistory } from 'react-router-dom';
import { RouteConfig } from '../../config/routeConfig';
import Panel from 'nav-frontend-paneler';
import AlertStripe from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import ProcessDescription from 'app/components/process-description/ProcessDescription';
import ExpandableInfo from 'app/components/expandable-info/ExpandableInfo';
import Lenke from 'nav-frontend-lenker';

interface Props {
    søknader: SøknadApiResponse;
}

const PleiepengerView: React.FC<Props> = ({ søknader }: Props) => {
    const history = useHistory();
    return (
        <>
            <AlertStripe type="info" className={'mt-1'}>
                Denne siden er under utvikling. Foreløpig kan du se søknader du har sendt inn om Pleiepenger for sykt
                barn. Etterhvert vil du kunne se mer informasjon om saken din.
            </AlertStripe>

            <Tilbakeknapp className={'mt-1'} onClick={() => history.push(RouteConfig.ROOT)}>
                Tilbake til oversikt
            </Tilbakeknapp>
            {søknader && (
                <div>
                    <Sidetittel>Dine Pleiepenger</Sidetittel>

                    <Lesmerpanel intro={<Ingress>Dette kan du forvente av saksgangen</Ingress>} border>
                        <div>
                            <Ingress style={{ marginTop: 0 }}>
                                Du bestemmer selv om du vil bruke sykmeldingen eller avbryte den. Du kan også jobbe i
                                kombinasjon med sykmelding. Det kommer an på hva sykdommen din tillater og hva det er
                                praktisk mulig å få til på arbeidsplassen.
                            </Ingress>
                            <Ingress>
                                Greit å vite: Arbeidsgiveren har plikt til å legge til rette for at du kan jobbe helt
                                eller delvis selv om du er syk.
                            </Ingress>
                        </div>
                    </Lesmerpanel>

                    <Undertittel>Dine søknader</Undertittel>
                    <div>
                        {søknader.map((søknad, index) => {
                            return <SoknadstatusinfoComponent key={index} søknad={søknad}></SoknadstatusinfoComponent>;
                        })}
                    </div>

                    <Undertittel>Nyttig informasjon</Undertittel>
                    <Ekspanderbartpanel tittel="Dette kan du forvente deg etter at du har sendt søknad">
                        <ProcessDescription
                            steps={[
                                <>
                                    <Undertittel>Du har sendt søknad med legeerklæring</Undertittel>
                                    <Normaltekst>
                                        Hvis du ikke har sendt legeerklæring med søknaden din, må du{' '}
                                        <Lenke href="#TODO">ettersende denne</Lenke> så snart du kan
                                    </Normaltekst>
                                </>,
                                <>
                                    <Undertittel>Arbeidsgiveren din sender inntektsmelding til oss</Undertittel>
                                    <ExpandableInfo title="Hva betyr dette?">
                                        <Normaltekst>
                                            Du må selv si fra til arbeidsgiveren din om at de må sende en
                                            inntektsmelding til oss. Inntektsmeldingen gir oss blant annet informasjon
                                            om lønna di, og om arbeidsgiver vil ha refusjon eller ei.
                                        </Normaltekst>
                                    </ExpandableInfo>
                                </>,
                                <div style={{ display: 'grid', gridGap: '0.5em' }}>
                                    <div>
                                        <Undertittel>Vi ser på søknaden din og behandler den</Undertittel>
                                        <Lenke href="#TODO">Se saksbehandlingstider der du bor</Lenke>
                                    </div>

                                    <Undertittel>Vi kontakter deg hvis vi trenger mer informasjon</Undertittel>

                                    <div>
                                        <Undertittel>
                                            Hvis noe i situasjonen din endrer seg må du si fra til oss
                                        </Undertittel>
                                        <ExpandableInfo title="Hvilke endringer må jeg si fra om?">
                                            <Normaltekst>For å unngå feil må du straks gi beskjed hvis:</Normaltekst>
                                            <ul>
                                                <li> barnet ikke lenger har behov for kontinuerlig omsorg og pleie.</li>
                                                <li>barnet begynner eller øker tiden i et omsorgstilbud.</li>
                                                <li>du begynner å jobbe igjen, eller øker antall arbeidstimer.</li>
                                                <li>omsorgen for barnet er overført til andre, helt eller delvis.</li>
                                                <li>du får omsorgsstønad fra kommunen.</li>
                                                <li>du skal ha lovbestemt ferie. Hva er lovbestemt ferie?</li>
                                                <li>du skal til utlandet.</li>
                                            </ul>
                                            <Normaltekst>
                                                Du melder fra om endringer ved å skrive en beskjed til oss. Du kan også
                                                ringe 55 55 33 33, tastevalg 3.
                                            </Normaltekst>
                                        </ExpandableInfo>
                                    </div>
                                </div>,
                                <>
                                    <Undertittel>
                                        Når søknaden er ferdig behandlet får du tilsendt svar i saksoversikten på Ditt
                                        NAV og i posten.
                                    </Undertittel>
                                    <ExpandableInfo title="Hvilke endringer må jeg si fra om?">
                                        <Normaltekst>
                                            Når vi har sett på saken din vil vi sende deg et svar på søknaden din. I
                                            svaret vil det stå om du har fått innvilget det du har søkt om.
                                        </Normaltekst>
                                    </ExpandableInfo>
                                </>,
                                <>
                                    <Undertittel>
                                        Hvis du får innvilget pleiepenger vil det registreres i saksoversikten din at du
                                        skal ha utbetaling
                                    </Undertittel>
                                    <ExpandableInfo title="Når får jeg utbetaling?">
                                        <Normaltekst>
                                            Utbetaling av pleiepenger fra NAV er i slutten av hver måned. Hvis du har
                                            fått innvilget pleiepenger for en periode tilbake i tid sender vi utbetaling
                                            for passerte måneder med en gang.
                                        </Normaltekst>
                                        <Normaltekst>
                                            Hvis arbeidsgiveren din skal ha refusjon (utbetale lønn til deg som vanlig
                                            og få tilbake pengene fra NAV) må du høre med arbeidsgiver om det er noe du
                                            lurer på angående lønnen din.
                                        </Normaltekst>
                                    </ExpandableInfo>
                                </>,
                            ]}
                        />
                    </Ekspanderbartpanel>
                    <Panel className={'mt-1'}>
                        <Undertittel>Dine søknader</Undertittel>
                        <div>
                            {søknader.map((søknad, index) => {
                                return (
                                    <SoknadstatusinfoComponent key={index} søknad={søknad}></SoknadstatusinfoComponent>
                                );
                            })}
                        </div>

                        <Ekspanderbartpanel tittel={'Har du sendt inn en søknad som du ikke ser her?'}>
                            <Ingress>
                                Det kan ta noen minutter fra du har sendt en digital søknad til den vises her. Du kan
                                sjekke igjen om noen minutter. Hvis du fikk kvittering på at søknaden var innsendt, er
                                den mottatt av NAV selv om den ikke vises her enda.
                            </Ingress>
                            <br />
                            <Ingress>
                                Søknader som er sendt i posten vises ikke her. De vises på en annen saksoversikt (link
                                dit) når søknaden er mottatt og registrert inn. Det tar som regel 2 uker fra en søknad
                                er postlagt til den vises i saksoversikten.
                            </Ingress>
                        </Ekspanderbartpanel>
                    </Panel>

                </div>
            )}
            <Tilbakeknapp className={'mt-1'} onClick={() => history.push(RouteConfig.ROOT)}>
                Tilbake til oversikt
            </Tilbakeknapp>
        </>
    );
};

export default PleiepengerView;

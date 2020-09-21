import * as React from 'react';
import { useHistory } from 'react-router-dom';
import AlertStripe from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import Panel from 'nav-frontend-paneler';
import { Ingress, Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import ExpandableInfo from 'app/components/expandable-info/ExpandableInfo';
import ProcessDescription from 'app/components/process-description/ProcessDescription';
import SoknadstatusinfoComponent from 'app/components/soknadstatusinfoComponent/SoknadstatusinfoComponent';
import { RouteConfig } from '../../config/routeConfig';
import { SøknadApiResponse } from '../../types/apiTypes/søknadTypes';
import './PleiepengerView.less';

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
                    <Panel className={'mt-1'}>
                        <Systemtittel tag={'h3'}>Dine søknader</Systemtittel>
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

                    <Panel className={'mt-1'}>
                        <Undertittel>Nyttig informasjon</Undertittel>
                        <Ekspanderbartpanel tittel="Dette kan du forvente deg etter at du har sendt søknad">
                            <ProcessDescription
                                steps={[
                                    <div key={'legeerklæring'}>
                                        <Undertittel>Du har sendt søknad med legeerklæring</Undertittel>
                                        <Normaltekst>
                                            Hvis du ikke har sendt legeerklæring med søknaden din, må du{' '}
                                            <Lenke href="#TODO">ettersende denne</Lenke> så snart du kan
                                        </Normaltekst>
                                    </div>,
                                    <div key="inntektsmelding">
                                        <Undertittel>Arbeidsgiveren din sender inntektsmelding til oss</Undertittel>
                                        <ExpandableInfo title="Hva betyr dette?">
                                            <Normaltekst>
                                                Du må selv si fra til arbeidsgiveren din om at de må sende en
                                                inntektsmelding til oss. Inntektsmeldingen gir oss blant annet
                                                informasjon om lønna di, og om arbeidsgiver vil ha refusjon eller ei.
                                            </Normaltekst>
                                        </ExpandableInfo>
                                    </div>,
                                    <div key="behandling" style={{ display: 'grid', gridGap: '0.5em' }}>
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
                                                <Normaltekst>
                                                    For å unngå feil må du straks gi beskjed hvis:
                                                </Normaltekst>
                                                <ul>
                                                    <li>
                                                        barnet ikke lenger har behov for kontinuerlig omsorg og pleie.
                                                    </li>
                                                    <li>barnet begynner eller øker tiden i et omsorgstilbud.</li>
                                                    <li>du begynner å jobbe igjen, eller øker antall arbeidstimer.</li>
                                                    <li>
                                                        omsorgen for barnet er overført til andre, helt eller delvis.
                                                    </li>
                                                    <li>du får omsorgsstønad fra kommunen.</li>
                                                    <li>du skal ha lovbestemt ferie. Hva er lovbestemt ferie?</li>
                                                    <li>du skal til utlandet.</li>
                                                </ul>
                                                <Normaltekst>
                                                    Du melder fra om endringer ved å skrive en beskjed til oss. Du kan
                                                    også ringe 55 55 33 33, tastevalg 3.
                                                </Normaltekst>
                                            </ExpandableInfo>
                                        </div>
                                    </div>,
                                    <div key="svar">
                                        <Undertittel>
                                            Når søknaden er ferdig behandlet får du tilsendt svar i saksoversikten på
                                            Ditt NAV og i posten.
                                        </Undertittel>
                                        <ExpandableInfo title="Hvilke endringer må jeg si fra om?">
                                            <Normaltekst>
                                                Når vi har sett på saken din vil vi sende deg et svar på søknaden din. I
                                                svaret vil det stå om du har fått innvilget det du har søkt om.
                                            </Normaltekst>
                                        </ExpandableInfo>
                                    </div>,
                                    <div key="saksoversikt">
                                        <Undertittel>
                                            Hvis du får innvilget pleiepenger vil det registreres i saksoversikten din
                                            at du skal ha utbetaling
                                        </Undertittel>
                                        <ExpandableInfo title="Når får jeg utbetaling?">
                                            <Normaltekst>
                                                Utbetaling av pleiepenger fra NAV er i slutten av hver måned. Hvis du
                                                har fått innvilget pleiepenger for en periode tilbake i tid sender vi
                                                utbetaling for passerte måneder med en gang.
                                            </Normaltekst>
                                            <Normaltekst>
                                                Hvis arbeidsgiveren din skal ha refusjon (utbetale lønn til deg som
                                                vanlig og få tilbake pengene fra NAV) må du høre med arbeidsgiver om det
                                                er noe du lurer på angående lønnen din.
                                            </Normaltekst>
                                        </ExpandableInfo>
                                    </div>,
                                ]}
                            />
                        </Ekspanderbartpanel>
                        <div className={'mt-1 knapp-gruppe'}>
                            <ul>
                                <li>
                                    <Hovedknapp mini>Ettersend dokumentasjon</Hovedknapp>
                                </li>
                                <li>
                                    <Hovedknapp mini>Send en ny søknad</Hovedknapp>
                                </li>
                            </ul>
                        </div>
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

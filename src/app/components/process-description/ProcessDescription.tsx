import React from 'react';
import ExpandableInfo from '../expandable-info/ExpandableInfo';

export interface ProcessDescriptionProps {}

const ProcessDescription: React.FC<ProcessDescriptionProps> = () => (
    <ol>
        <li>
            <h2>Du har sendt søknad med legeerklæring</h2>
            <p>
                Hvis du ikke har sendt legeerklæring med søknaden din, må du <a href="#TODO">ettersende denne</a> så
                snart du kan
            </p>
        </li>
        <li>
            <h2>Arbeidsgiveren din sender inntektsmelding til oss</h2>
            <ExpandableInfo title="Hva betyr dette?">
                <p>
                    Du må selv si fra til arbeidsgiveren din om at de må sende en inntektsmelding til oss.
                    Inntektsmeldingen gir oss blant annet informasjon om lønna di, og om arbeidsgiver vil ha refusjon
                    eller ei.
                </p>
            </ExpandableInfo>
        </li>
        <li>
            <h2>Vi ser på søknaden din og behandler den</h2>
            <p>
                <a href="todo">Se saksbehandlingstider der du bor</a>
            </p>

            <h2>Vi kontakter deg hvis vi trenger mer informasjon</h2>

            <h2>Hvis noe i situasjonen din endrer seg må du si fra til oss</h2>
            <ExpandableInfo title="Hvilke endringer må jeg si fra om?">
                <p>For å unngå feil må du straks gi beskjed hvis:</p>
                <ul>
                    <li> barnet ikke lenger har behov for kontinuerlig omsorg og pleie.</li>
                    <li>barnet begynner eller øker tiden i et omsorgstilbud.</li>
                    <li>du begynner å jobbe igjen, eller øker antall arbeidstimer.</li>
                    <li>omsorgen for barnet er overført til andre, helt eller delvis.</li>
                    <li>du får omsorgsstønad fra kommunen.</li>
                    <li>du skal ha lovbestemt ferie. Hva er lovbestemt ferie?</li>
                    <li>du skal til utlandet.</li>
                </ul>
                <p>
                    Du melder fra om endringer ved å skrive en beskjed til oss. Du kan også ringe 55 55 33 33, tastevalg
                    3.
                </p>
            </ExpandableInfo>
        </li>
        <li>
            <h2>Når søknaden er ferdig behandlet får du tilsendt svar i saksoversikten på Ditt NAV og i posten.</h2>
            <ExpandableInfo title="Hvilke endringer må jeg si fra om?">
                <p>
                    Når vi har sett på saken din vil vi sende deg et svar på søknaden din. I svaret vil det stå om du
                    har fått innvilget det du har søkt om.
                </p>
            </ExpandableInfo>
        </li>
        <li>
            <h2>Hvis du får innvilget pleiepenger vil det registreres i saksoversikten din at du skal ha utbetaling</h2>
            <ExpandableInfo title="Når får jeg utbetaling?">
                <p>
                    Utbetaling av pleiepenger fra NAV er i slutten av hver måned. Hvis du har fått innvilget pleiepenger
                    for en periode tilbake i tid sender vi utbetaling for passerte måneder med en gang.
                </p>
                <p>
                    Hvis arbeidsgiveren din skal ha refusjon (utbetale lønn til deg som vanlig og få tilbake pengene fra
                    NAV) må du høre med arbeidsgiver om det er noe du lurer på angående lønnen din.
                </p>
            </ExpandableInfo>
        </li>
    </ol>
);

export default ProcessDescription;

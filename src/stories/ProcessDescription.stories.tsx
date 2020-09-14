import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ProcessDescription, { ProcessDescriptionProps } from '../app/components/process-description/ProcessDescription';
import ExpandableInfo from '../app/components/expandable-info/ExpandableInfo';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

export default {
    title: 'Process description',
    component: ProcessDescription,
} as Meta;

export const Pleiepenger: Story<ProcessDescriptionProps> = (args) => <ProcessDescription {...args} />;
Pleiepenger.args = {
    steps: [
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
                    Du må selv si fra til arbeidsgiveren din om at de må sende en inntektsmelding til oss.
                    Inntektsmeldingen gir oss blant annet informasjon om lønna di, og om arbeidsgiver vil ha refusjon
                    eller ei.
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
                <Undertittel>Hvis noe i situasjonen din endrer seg må du si fra til oss</Undertittel>
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
                        Du melder fra om endringer ved å skrive en beskjed til oss. Du kan også ringe 55 55 33 33,
                        tastevalg 3.
                    </Normaltekst>
                </ExpandableInfo>
            </div>
        </div>,
        <>
            <Undertittel>
                Når søknaden er ferdig behandlet får du tilsendt svar i saksoversikten på Ditt NAV og i posten.
            </Undertittel>
            <ExpandableInfo title="Hvilke endringer må jeg si fra om?">
                <Normaltekst>
                    Når vi har sett på saken din vil vi sende deg et svar på søknaden din. I svaret vil det stå om du
                    har fått innvilget det du har søkt om.
                </Normaltekst>
            </ExpandableInfo>
        </>,
        <>
            <Undertittel>
                Hvis du får innvilget pleiepenger vil det registreres i saksoversikten din at du skal ha utbetaling
            </Undertittel>
            <ExpandableInfo title="Når får jeg utbetaling?">
                <Normaltekst>
                    Utbetaling av pleiepenger fra NAV er i slutten av hver måned. Hvis du har fått innvilget pleiepenger
                    for en periode tilbake i tid sender vi utbetaling for passerte måneder med en gang.
                </Normaltekst>
                <Normaltekst>
                    Hvis arbeidsgiveren din skal ha refusjon (utbetale lønn til deg som vanlig og få tilbake pengene fra
                    NAV) må du høre med arbeidsgiver om det er noe du lurer på angående lønnen din.
                </Normaltekst>
            </ExpandableInfo>
        </>,
    ],
};

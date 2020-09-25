import React from 'react';
import Lenke from 'nav-frontend-lenker';
import Box from '../../../components/elements/box/Box';
import Title from '../../../components/elements/title/Title';
import ExpandableInfo from '../../../components/expandable-info/ExpandableInfo';
import ProcessDescription from '../../../components/process-description/ProcessDescription';
import SectionPanel from '../../../components/section-panel/SectionPanel';
import getLenker from '../../../lenker';

interface StepProps {
    title: string;
    children: React.ReactNode;
}

const Step = ({ title, children }: StepProps): JSX.Element => (
    <div>
        <Title tag="h3" titleType="element">
            {title}
        </Title>
        <Box margin="s">{children}</Box>
    </div>
);

const NyttigInforPanel = () => (
    <SectionPanel title="Dette kan du forvente deg etter at du har sendt søknad" titleTag="h2">
        <Box margin="l">
            <ProcessDescription
                steps={[
                    <Step key="legeerklæring" title="Du har sendt søknad med legeerklæring">
                        <p>
                            Hvis du ikke har sendt legeerklæring med søknaden din, må du{' '}
                            <Lenke href={getLenker().ettersending}>ettersende denne</Lenke> så snart du kan
                        </p>
                    </Step>,
                    <Step key="inntektsmelding" title="Arbeidsgiveren din sender inntektsmelding til oss">
                        <ExpandableInfo title="Hva betyr dette?">
                            <p>
                                Du må selv si fra til arbeidsgiveren din om at de må sende en inntektsmelding til oss.
                                Inntektsmeldingen gir oss blant annet informasjon om lønna di, og om arbeidsgiver vil ha
                                refusjon eller ei.
                            </p>
                        </ExpandableInfo>
                    </Step>,
                    <Step key="behandling" title="Vi ser på søknaden din og behandler den">
                        <p>
                            <Lenke href={getLenker().saksbehandlingstid}>Se saksbehandlingstider der du bor</Lenke>
                        </p>
                        <p>Vi kontakter deg hvis vi trenger mer informasjon</p>
                        <div>
                            <Title tag="h4" titleType="element">
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
                                    Du melder fra om endringer ved å skrive en beskjed til oss. Du kan også ringe 55 55
                                    33 33, tastevalg 3.
                                </p>
                            </ExpandableInfo>
                        </div>
                    </Step>,
                    <Step
                        key="svar"
                        title="Når søknaden er ferdig behandlet får du tilsendt svar i saksoversikten på Ditt NAV og i posten">
                        <ExpandableInfo title="Hvilke endringer må jeg si fra om?">
                            <p>
                                Når vi har sett på saken din vil vi sende deg et svar på søknaden din. I svaret vil det
                                stå om du har fått innvilget det du har søkt om.
                            </p>
                        </ExpandableInfo>
                    </Step>,
                    <Step
                        key="saksoversikt"
                        title="Hvis du får innvilget pleiepenger vil det registreres i saksoversikten din at du skal ha
                            utbetaling">
                        <ExpandableInfo title="Når får jeg utbetaling?">
                            <p>
                                Utbetaling av pleiepenger fra NAV er i slutten av hver måned. Hvis du har fått innvilget
                                pleiepenger for en periode tilbake i tid sender vi utbetaling for passerte måneder med
                                en gang.
                            </p>
                            <p>
                                Hvis arbeidsgiveren din skal ha refusjon (utbetale lønn til deg som vanlig og få tilbake
                                pengene fra NAV) må du høre med arbeidsgiver om det er noe du lurer på angående lønnen
                                din.
                            </p>
                        </ExpandableInfo>
                    </Step>,
                ]}
            />
        </Box>
    </SectionPanel>
);

export default NyttigInforPanel;

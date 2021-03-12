import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import Box from '../../../components/elements/box/Box';
import { getPrettyDate } from '../../../components/pretty-date/PrettyDate';
import getLenker from '../../../lenker';
import { Pleiepengesøknad } from '../../../types/apiTypes/søknadTypes';
import intlHelper from '../../../utils/intlUtils';
// import { getSøknadTitle } from '../../../utils/soknadUtils';
import InfoEtterSendtSøknad from './InfoEtterSendtSøknad';
// import Title from '../../../components/elements/title/Title';
import Alertstripe from 'nav-frontend-alertstriper';
import bemUtils from '../../../utils/bemUtils';
import SectionPanel from '../../../components/section-panel/SectionPanel';
import './pleiepengesakSøknad.less';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { UndertekstBold } from 'nav-frontend-typografi';
import Knappelenke from '../../../components/knappelenke/Knappelenke';
import Title from '../../../components/elements/title/Title';
// import { FileContent } from '@navikt/ds-icons';

interface Props {
    søknad: Pleiepengesøknad;
}
const FileIcon = () => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g>
            <path d="M20.5,24h-17C3.2,24,3,23.8,3,23.5v-23C3,0.2,3.2,0,3.5,0h11c0,0,0,0,0,0c0.1,0,0.3,0.1,0.4,0.1l6,6 C20.9,6.2,21,6.4,21,6.5c0,0,0,0,0,0v17C21,23.8,20.8,24,20.5,24z M4,23h16V7h-5.5C14.2,7,14,6.8,14,6.5V1H4V23z M15,6h4.3L15,1.7 V6z" />
        </g>
    </svg>
);

const bem = bemUtils('ppSoknad');

// const FileContent = require('@navikt/ds-icons/svg/FileContent.svg');

const PleiepengesakSøknad = ({ søknad }: Props) => {
    const intl = useIntl();
    return (
        <>
            <SectionPanel>
                <Box className={bem.element('infoOmSoknad')}>
                    <Title>
                        {intlHelper(intl, 'page.pleiepengesakSøknad.søknad.title', {
                            mottatt: getPrettyDate(søknad.opprettet, 'dayDateAndTime'),
                        })}
                    </Title>
                    <p style={{ fontWeight: 'bold', marginTop: '2rem', marginBottom: '3rem' }}>
                        <FormattedMessage
                            id="page.pleiepengesakSøknad.periode"
                            values={{
                                fom: getPrettyDate(søknad.søknad.fraOgMed),
                                tom: getPrettyDate(søknad.søknad.tilOgMed),
                            }}
                        />
                    </p>
                    <Box margin="l">
                        <Alertstripe type="advarsel">
                            Husk å be alle arbeidsgiverne dine sende oss inntektsmelding så fort som mulig hvis:
                            <ul>
                                <li>du søker for første gang, eller</li>
                                <li>det er mer enn 4 uker siden du hadde pleiepenger sist </li>
                            </ul>
                        </Alertstripe>
                    </Box>
                    <Box margin="xl">
                        <Box margin="m">
                            <Ekspanderbartpanel tittel="Bekreftelse til arbeidsgiver">
                                Her kan du se, laste ned eller skrive ut bekreftelse til arbeidsgiver for perioden du
                                søker pleiepenger
                                <Box margin="xl">
                                    <UndertekstBold>Dokumenter som kan lastes ned</UndertekstBold>
                                    <ul className={bem.element('no-bullets')}>
                                        <li>
                                            <Lenke href="#">
                                                <FileIcon />
                                                <span>
                                                    Bekreftelse/informasjon til Arbeids- og velferdsetaten (pdf)
                                                </span>
                                            </Lenke>
                                        </li>
                                        <li>
                                            <Lenke href="#">
                                                <FileIcon />
                                                <span>
                                                    Bekreftelse/informasjon til Den Norske Opera og Ballett (pdf)
                                                </span>
                                            </Lenke>
                                        </li>
                                        <li>
                                            <Lenke href="#">
                                                <FileIcon />
                                                <span>
                                                    Bekreftelse/informasjon til Sykehuset i Østfold avdeling ortopedi
                                                    (pdf)
                                                </span>
                                            </Lenke>
                                        </li>
                                    </ul>
                                </Box>
                            </Ekspanderbartpanel>
                        </Box>
                        <Box margin="m">
                            <Ekspanderbartpanel
                                tittel={intlHelper(intl, 'page.pleiepengesakSøknad.ekspanderbartpanel.label')}>
                                <p>
                                    For at vi skal kunne bahendle søknaden din, trenger vi dokumentasjon Her kan du
                                    laste opp legeerklæring og annen dokumentasjon{' '}
                                </p>
                                <ul>
                                    <li>Kanksje du må ettersende dette</li>
                                    <li>Kanskje du må ettersende dette også </li>
                                    <li>Eller dette?</li>
                                </ul>
                                <Box margin="l">
                                    <Knappelenke href={getLenker().ettersending}>
                                        <FormattedMessage id="page.pleiepengesakSøknad.ettersendKnapp.label" />
                                    </Knappelenke>
                                </Box>
                            </Ekspanderbartpanel>
                        </Box>
                    </Box>
                </Box>
            </SectionPanel>
            <InfoEtterSendtSøknad />
        </>
    );
};

export default PleiepengesakSøknad;

import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import Box from '../../../components/elements/box/Box';
import { getPrettyDate } from '../../../components/pretty-date/PrettyDate';
import getLenker from '../../../lenker';
import { Pleiepengesøknad } from '../../../types/apiTypes/søknadTypes';
import intlHelper from '../../../utils/intlUtils';
import InfoEtterSendtSøknad from './InfoEtterSendtSøknad';
import Alertstripe from 'nav-frontend-alertstriper';
import bemUtils from '../../../utils/bemUtils';
import SectionPanel from '../../../components/section-panel/SectionPanel';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { UndertekstBold } from 'nav-frontend-typografi';
import Knappelenke from '../../../components/knappelenke/Knappelenke';
import Title from '../../../components/elements/title/Title';
import { FileContentIcon } from '../../../svg/FellesIkoner';
import { getEnvironmentVariable } from '../../../utils/envUtils';
import './pleiepengesakSøknad.less';
import { mindreTimerEtterInnsendtEnnMaxAntallTimer } from '../../../utils/dateUtils';

interface Props {
    søknad: Pleiepengesøknad;
}

const bem = bemUtils('ppSoknad');

const getApiUrlBySoknadIdOgOrgnummer = (
    soknadID: string,
    organisasjonsnummer: string,
    organisasjonNavn: string
): string => {
    return `${getEnvironmentVariable(
        'API_URL'
    )}/soknad/${soknadID}/arbeidsgivermelding?organisasjonsnummer=${organisasjonsnummer}&filnavn=Bekreftelse_til_${organisasjonNavn.replace(
        / /g,
        '_'
    )}`;
};
const PleiepengesakSøknad = ({ søknad }: Props) => {
    const intl = useIntl();

    const harArbeidsgiver =
        søknad.søknad.arbeidsgivere.organisasjoner && søknad.søknad.arbeidsgivere.organisasjoner.length > 0;

    const visAlertstripe = harArbeidsgiver && mindreTimerEtterInnsendtEnnMaxAntallTimer(søknad.opprettet, 48);

    return (
        <>
            <SectionPanel>
                <Box>
                    <Title tag="h1">{intlHelper(intl, 'page.pleiepengesakSøknad.søknad.title')}</Title>
                    <p style={{ fontWeight: 'bold', marginTop: '2rem' }}>
                        <FormattedMessage
                            id="page.pleiepengesakSøknad.søknad.motatt"
                            values={{
                                mottatt: getPrettyDate(søknad.opprettet, 'dayDateAndTime'),
                            }}
                        />
                    </p>
                    <p style={{ fontWeight: 'bold', marginBottom: '3rem' }}>
                        <FormattedMessage
                            id="page.pleiepengesakSøknad.periode"
                            values={{
                                fom: getPrettyDate(søknad.søknad.fraOgMed),
                                tom: getPrettyDate(søknad.søknad.tilOgMed),
                            }}
                        />
                    </p>
                    {visAlertstripe && (
                        <Box margin="l">
                            <Alertstripe type="advarsel">
                                <FormattedMessage id="page.pleiepengesakSøknad.søknad.alertstripe.title" />
                                <ul>
                                    <li>
                                        <FormattedMessage id="page.pleiepengesakSøknad.søknad.alertstripe.list.1" />
                                    </li>
                                    <li>
                                        <FormattedMessage id="page.pleiepengesakSøknad.søknad.alertstripe.list.2" />
                                    </li>
                                </ul>
                                <FormattedMessage id="page.pleiepengesakSøknad.søknad.alertstripe.info" />
                            </Alertstripe>
                        </Box>
                    )}

                    <Box margin="xl">
                        {harArbeidsgiver && (
                            <Box margin="m">
                                <Ekspanderbartpanel
                                    tittel={intlHelper(intl, 'page.pleiepengesakSøknad.ekspanderbartpanel1.title')}>
                                    <FormattedMessage id="page.pleiepengesakSøknad.ekspanderbartpanel1.info" />

                                    <Box margin="xl">
                                        <UndertekstBold>
                                            <FormattedMessage id="page.pleiepengesakSøknad.ekspanderbartpanel1.list.tittle" />
                                        </UndertekstBold>
                                    </Box>
                                    <ul className={bem.element('no-bullets')}>
                                        {søknad.søknad.arbeidsgivere.organisasjoner.map((organisasjon) => (
                                            <li
                                                key={organisasjon.organisasjonsnummer}
                                                className={bem.element('listElement')}>
                                                <Lenke
                                                    target="_blank"
                                                    href={getApiUrlBySoknadIdOgOrgnummer(
                                                        søknad.søknadId,
                                                        organisasjon.organisasjonsnummer,
                                                        organisasjon.navn
                                                    )}>
                                                    <FileContentIcon />
                                                    <span>
                                                        <FormattedMessage
                                                            id="page.pleiepengesakSøknad.ekspanderbartpanel1.list.itemName"
                                                            values={{
                                                                organisasjonsnavn: organisasjon.navn,
                                                            }}
                                                        />
                                                    </span>
                                                </Lenke>
                                            </li>
                                        ))}
                                    </ul>
                                </Ekspanderbartpanel>
                            </Box>
                        )}

                        <Box margin="m">
                            <Ekspanderbartpanel
                                tittel={intlHelper(intl, 'page.pleiepengesakSøknad.ekspanderbartpanel2.title')}>
                                <p>
                                    <FormattedMessage id="page.pleiepengesakSøknad.ekspanderbartpanel2.info.1" />
                                </p>
                                <p>
                                    <FormattedMessage id="page.pleiepengesakSøknad.ekspanderbartpanel2.info.2" />
                                </p>
                                <p>
                                    <FormattedMessage id="page.pleiepengesakSøknad.ekspanderbartpanel2.info.3" />
                                </p>

                                <Box margin="l">
                                    <Knappelenke href={getLenker().ettersending}>
                                        <FormattedMessage id="page.pleiepengesakSøknad.ekspanderbartpanel2.ettersendKnapp.label" />
                                    </Knappelenke>
                                </Box>
                            </Ekspanderbartpanel>
                        </Box>
                    </Box>
                </Box>
            </SectionPanel>
            <InfoEtterSendtSøknad harArbeidsgiver={harArbeidsgiver} />
        </>
    );
};

export default PleiepengesakSøknad;

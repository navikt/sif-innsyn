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

interface Props {
    søknad: Pleiepengesøknad;
}

const bem = bemUtils('ppSoknad');

const getApiUrlBySoknadIdOrgNumber = (
    soknadID: string,
    organisasjonsnummer: string,
    organisasjonNavn: string
): string => {
    return `${getEnvironmentVariable(
        'API_URL'
    )}/soknad/${soknadID}/arbeidsgivermelding?organisasjonsnummer=${organisasjonsnummer}&filnavn=BekreftelseTil${organisasjonNavn}`;
};
const PleiepengesakSøknad = ({ søknad }: Props) => {
    const intl = useIntl();

    const listItems = søknad.søknad.arbeidsgivere.organisasjoner.map((organisasjon) => (
        <li key={organisasjon.organisasjonsnummer} className={bem.element('listElement')}>
            <Lenke
                target="_blank"
                href={getApiUrlBySoknadIdOrgNumber(
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
    ));

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
                            <FormattedMessage id="page.pleiepengesakSøknad.søknad.alertstripe.title" />
                            <ul>
                                <li>
                                    <FormattedMessage id="page.pleiepengesakSøknad.søknad.alertstripe.list.1" />
                                </li>
                                <li>
                                    <FormattedMessage id="page.pleiepengesakSøknad.søknad.alertstripe.list.2" />
                                </li>
                            </ul>
                        </Alertstripe>
                    </Box>
                    <Box margin="xl">
                        <Box margin="m">
                            <Ekspanderbartpanel
                                tittel={intlHelper(intl, 'page.pleiepengesakSøknad.ekspanderbartpanel1.title')}>
                                <FormattedMessage id="page.pleiepengesakSøknad.ekspanderbartpanel1.info" />

                                <Box margin="xl">
                                    <UndertekstBold>
                                        <FormattedMessage id="page.pleiepengesakSøknad.ekspanderbartpanel1.list.tittle" />
                                    </UndertekstBold>
                                </Box>
                                <ul className={bem.element('no-bullets')}>{listItems}</ul>
                            </Ekspanderbartpanel>
                        </Box>
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
            <InfoEtterSendtSøknad />
        </>
    );
};

export default PleiepengesakSøknad;

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
import { getEnvironmentVariable } from '../../../utils/envUtils';

interface Props {
    søknad: Pleiepengesøknad;
}
/*const FileIcon = () => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g>
            <path d="M20.5,24h-17C3.2,24,3,23.8,3,23.5v-23C3,0.2,3.2,0,3.5,0h11c0,0,0,0,0,0c0.1,0,0.3,0.1,0.4,0.1l6,6 C20.9,6.2,21,6.4,21,6.5c0,0,0,0,0,0v17C21,23.8,20.8,24,20.5,24z M4,23h16V7h-5.5C14.2,7,14,6.8,14,6.5V1H4V23z M15,6h4.3L15,1.7 V6z" />
        </g>
    </svg>
);*/

const bem = bemUtils('ppSoknad');

// const FileContent = require('@navikt/ds-icons/svg/FileContent.svg');
export const getApiUrlBySoknadIdOrgNumber = (soknadID: string, orgnummer: string): string => {
    return `${getEnvironmentVariable(
        'API_URL'
    )}/soknad/${soknadID}/arbeidsgivermelding?organisasjonsnummer=${orgnummer}`;
};
const PleiepengesakSøknad = ({ søknad }: Props) => {
    const intl = useIntl();
    console.log(søknad.søknad);
    // søknad.søknad.arbeidsgivere.
    const listItems = søknad.søknad.arbeidsgivere.organisasjoner.map((organisasjon) => (
        <li key={organisasjon.organisasjonsnummer}>
            <Lenke
                target="_blank"
                href={getApiUrlBySoknadIdOrgNumber(søknad.søknadId, organisasjon.organisasjonsnummer)}>
                Bekreftelse {organisasjon.navn}
            </Lenke>
        </li>
    ));
    console.log(søknad.søknad.arbeidsgivere);
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
                                <ul>{listItems}</ul>
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

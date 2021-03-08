import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import Box from '../../../components/elements/box/Box';
import { getPrettyDate } from '../../../components/pretty-date/PrettyDate';
import getLenker from '../../../lenker';
import { Pleiepengesøknad } from '../../../types/apiTypes/søknadTypes';
import intlHelper from '../../../utils/intlUtils';
import { getSøknadTitle } from '../../../utils/soknadUtils';
import InfoEtterSendtSøknad from './InfoEtterSendtSøknad';
import Title from '../../../components/elements/title/Title';
import Alertstripe from 'nav-frontend-alertstriper';
import bemUtils from '../../../utils/bemUtils';
import './pleiepengesakSøknad.less';

interface Props {
    søknad: Pleiepengesøknad;
}

const bem = bemUtils('ppSoknad');

const PleiepengesakSøknad = ({ søknad }: Props) => {
    const intl = useIntl();
    return (
        <>
            <Box className={bem.element('infoOmSoknad')}>
                <p>
                    <Title tag="h1">{intlHelper(intl, 'page.pleiepengesakSøknad.søknad.title')}</Title>
                </p>
                <Box margin="xl">
                    <p style={{ fontWeight: 'bold' }}>
                        <FormattedMessage
                            id="page.pleiepengesakSøknad.periode"
                            values={{
                                fom: getPrettyDate(søknad.søknad.fraOgMed),
                                tom: getPrettyDate(søknad.søknad.tilOgMed),
                            }}
                        />
                    </p>
                    <p>
                        <Alertstripe type="suksess" form="inline">
                            <FormattedMessage
                                id="page.pleiepengesakSøknad.søknad.mottatDato"
                                values={{
                                    søknad: getSøknadTitle(søknad, true),
                                    mottatt: getPrettyDate(søknad.opprettet, 'dayDateAndTime'),
                                }}
                            />
                        </Alertstripe>
                    </p>
                </Box>

                <Box margin="xl">
                    <Lenke href={getLenker().ettersending}>
                        <FormattedMessage id="page.pleiepengesakSøknad.ettersendKnapp.label" />
                    </Lenke>
                </Box>
                <Box margin="l">
                    <Lenke href={'#'}>
                        <FormattedMessage id="page.pleiepengesakSøknad.pdfLenke" />
                    </Lenke>
                </Box>
            </Box>
            <InfoEtterSendtSøknad />
        </>
    );
};

export default PleiepengesakSøknad;

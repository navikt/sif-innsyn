import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import AriaAlternative from '../../../components/aria/AriaAlternative';
import Box from '../../../components/elements/box/Box';
import Knappelenke from '../../../components/knappelenke/Knappelenke';
import Knapperad from '../../../components/knapperad/Knapperad';
import { getPrettyDate } from '../../../components/pretty-date/PrettyDate';
import SectionPanel from '../../../components/section-panel/SectionPanel';
import getLenker from '../../../lenker';
import { Pleiepengesøknad } from '../../../types/apiTypes/søknadTypes';
import { Sakstype } from '../../../types/types';
import { getSakstypeTitle } from '../../../utils/sakstypeUtils';
import { getSøknadTitle } from '../../../utils/soknadUtils';
import InfoEtterSendtSøknad from './InfoEtterSendtSøknad';
import intlHelper from '../../../utils/intlUtils';

interface Props {
    søknad: Pleiepengesøknad;
}

const PleiepengesakSøknad = ({ søknad }: Props) => {
    const intl = useIntl();
    const title = getSakstypeTitle(intl, Sakstype.PLEIEPENGER);
    const introAriaTitle = intlHelper(intl, 'generell.SøknadOm', { title });
    return (
        <>
            <SectionPanel
                title={intlHelper(intl, 'page.pleiepengesakSøknad.søknad.title', {
                    søknad: getSøknadTitle(søknad, true),
                    mottatt: getPrettyDate(søknad.opprettet, 'dayDateAndTime'),
                })}
                titleTag="h1"
                introHeader={
                    <Box padBottom="s">
                        <AriaAlternative ariaText={introAriaTitle} visibleText={title} />
                    </Box>
                }>
                <p style={{ fontWeight: 'bold' }}>
                    <FormattedMessage
                        id="page.pleiepengesakSøknad.periode"
                        values={{
                            fom: getPrettyDate(søknad.søknad.fraOgMed),
                            tom: getPrettyDate(søknad.søknad.tilOgMed),
                        }}
                    />
                </p>
                <FormattedMessage tagName="p" id="page.pleiepengesakSøknad.bekreftelse" />

                <Box margin="xl">
                    <Knapperad align="left">
                        <Knappelenke mini={true} href={getLenker().ettersending}>
                            <FormattedMessage id="page.pleiepengesakSøknad.ettersendKnapp.label" />
                        </Knappelenke>
                    </Knapperad>
                </Box>
                <Box margin="xxl">
                    <FormattedMessage tagName="p" id="page.pleiepengesakSøknad.info.1" />
                    <ul>
                        <FormattedMessage tagName="li" id="page.pleiepengesakSøknad.info.2.a" />
                        <FormattedMessage tagName="li" id="page.pleiepengesakSøknad.info.2.b" />
                    </ul>
                    <p>
                        <FormattedMessage id="page.pleiepengesakSøknad.info.3.a" />{' '}
                        <Lenke href={getLenker().saksoversikt}>
                            <FormattedMessage id="page.pleiepengesakSøknad.info.3.b" />
                        </Lenke>
                        <FormattedMessage id="page.pleiepengesakSøknad.info.3.c" />
                    </p>
                </Box>
            </SectionPanel>
            <InfoEtterSendtSøknad />
        </>
    );
};

export default PleiepengesakSøknad;

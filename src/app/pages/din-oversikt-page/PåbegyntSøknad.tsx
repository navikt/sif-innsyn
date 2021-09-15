import Box from '../../components/elements/box/Box';
import React from 'react';
import intlHelper from '../../utils/intlUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import Knappelenke from '../../components/knappelenke/Knappelenke';
import getLenker from '../../lenker';
import { getDateStringFromApiDateString, getTimeStringFromApiDateString } from '../../utils/dateUtils';
import SectionPanel from '../../components/section-panel/SectionPanel';

interface Props {
    updatedTimestemp?: string;
}

const PåbegyntSøknad = ({ updatedTimestemp }: Props) => {
    const intl = useIntl();
    const dato = getDateStringFromApiDateString(updatedTimestemp);
    const tid = getTimeStringFromApiDateString(updatedTimestemp);

    return (
        <SectionPanel title={intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.title')}>
            {dato && tid && (
                <>
                    <Box>{intlHelper(intl, `page.dinOversikt.påbegyntSøknad.info`, { dato, tid })}</Box>

                    <Box margin="xl">
                        <Knappelenke href={getLenker().pleiepengerURL} target={'blank'}>
                            <FormattedMessage id="page.dinOversikt.påbegyntSøknad.knappen" />
                        </Knappelenke>
                    </Box>
                </>
            )}
            {!dato && !tid && <Box>{intlHelper(intl, 'page.dinOversikt.påbegyntSøknad.ingenPåbegynt')}</Box>}
        </SectionPanel>
    );
};

export default PåbegyntSøknad;

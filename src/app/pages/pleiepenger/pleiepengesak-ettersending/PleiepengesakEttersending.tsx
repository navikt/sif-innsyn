import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '../../../components/elements/box/Box';
import { getPrettyDateNorwegianTime } from '../../../components/pretty-date/PrettyDate';
import SakstypeTittel from '../../../components/sakstype-tittel/SakstypeTittel';
import SectionPanel from '../../../components/section-panel/SectionPanel';
import { PleiepengerEttersending } from '../../../types/apiTypes/søknadTypes';
import { Sakstype } from '../../../types/types';
import intlHelper from '../../../utils/intlUtils';

interface Props {
    søknad: PleiepengerEttersending;
}

const PleiepengesakEttersending = ({ søknad }: Props) => {
    const intl = useIntl();
    return (
        <SectionPanel
            title={intlHelper(intl, 'page.pleiepengesakEttersending.title', {
                mottatt: getPrettyDateNorwegianTime(søknad.søknad.mottatt, 'dayDateAndTime'),
            })}
            titleTag="h1"
            introHeader={
                <Box padBottom="s">
                    <SakstypeTittel sakstype={Sakstype.PLEIEPENGER} />
                </Box>
            }>
            <FormattedMessage tagName="p" id="page.pleiepengesakEttersending.info" />
        </SectionPanel>
    );
};

export default PleiepengesakEttersending;

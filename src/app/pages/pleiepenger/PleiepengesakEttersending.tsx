import React from 'react';
import Box from '../../components/elements/box/Box';
import { getPrettyDate } from '../../components/pretty-date/PrettyDate';
import SectionPanel from '../../components/section-panel/SectionPanel';
import { PleiepengerEttersending } from '../../types/apiTypes/søknadTypes';
import { getSøknadTitle } from '../../utils/soknadUtils';

interface Props {
    søknad: PleiepengerEttersending;
}

const PleiepengesakEttersending = ({ søknad }: Props) => {
    return (
        <SectionPanel
            title={`${getSøknadTitle(søknad, true)} mottatt ${getPrettyDate(søknad.opprettet, 'dayDateAndTime')}`}
            header={<Box padBottom="s">Pleiepenger for sykt barn</Box>}>
            <Box margin="l">
                <p>Hva skal stå på denne siden?</p>
            </Box>
        </SectionPanel>
    );
};

export default PleiepengesakEttersending;

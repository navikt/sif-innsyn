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
            title={`${getSøknadTitle(søknad, true)} av dokument`}
            header={<Box padBottom="s">Pleiepenger for sykt barn</Box>}>
            <p>Mottatt {getPrettyDate(søknad.opprettet, 'dayDateAndTime')}.</p>
            <Box margin="l">
                <p>Ettersending av dokument er mottatt og registrert på din søknad.</p>
            </Box>
        </SectionPanel>
    );
};

export default PleiepengesakEttersending;

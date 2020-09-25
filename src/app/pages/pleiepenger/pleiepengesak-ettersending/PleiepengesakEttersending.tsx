import React from 'react';
import Box from '../../../components/elements/box/Box';
import { getPrettyDate } from '../../../components/pretty-date/PrettyDate';
import SectionPanel from '../../../components/section-panel/SectionPanel';
import { PleiepengerEttersending } from '../../../types/apiTypes/søknadTypes';

interface Props {
    søknad: PleiepengerEttersending;
}

const PleiepengesakEttersending = ({ søknad }: Props) => {
    return (
        <SectionPanel
            title={`Ettersendte dokumenter er mottatt ${getPrettyDate(søknad.opprettet, 'dayDateAndTime')}`}
            titleTag="h1"
            header={<Box padBottom="s">Pleiepenger for sykt barn</Box>}>
            <Box margin="l">
                <p>Ettersendte dokumenter er mottatt og registrert på din sak.</p>
            </Box>
        </SectionPanel>
    );
};

export default PleiepengesakEttersending;

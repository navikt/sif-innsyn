import React from 'react';
import Box from '../../../components/elements/box/Box';
import { getPrettyDateNorwegianTime } from '../../../components/pretty-date/PrettyDate';
import SakstypeTittel from '../../../components/sakstype-tittel/SakstypeTittel';
import SectionPanel from '../../../components/section-panel/SectionPanel';
import { PleiepengerEttersending } from '../../../types/apiTypes/søknadTypes';
import { Sakstype } from '../../../types/types';

interface Props {
    søknad: PleiepengerEttersending;
}

const PleiepengesakEttersending = ({ søknad }: Props) => {
    return (
        <SectionPanel
            title={`Ettersendte dokumenter er mottatt ${getPrettyDateNorwegianTime(
                søknad.opprettet,
                'dayDateAndTime'
            )}`}
            titleTag="h1"
            introHeader={
                <Box padBottom="s">
                    <SakstypeTittel sakstype={Sakstype.PLEIEPENGER} />
                </Box>
            }>
            <Box margin="l">
                <p>Ettersendte dokumenter er mottatt og registrert på din sak.</p>
            </Box>
        </SectionPanel>
    );
};

export default PleiepengesakEttersending;

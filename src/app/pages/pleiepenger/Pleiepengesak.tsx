import React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import Box from '../../components/elements/box/Box';
import Knapperad from '../../components/knapperad/Knapperad';
import SoknadInfo from '../../components/soknad-info/SoknadInfo';
import { Søknad } from '../../types/apiTypes/søknadTypes';

interface Props {
    søknad: Søknad;
}

const Pleiepengesak = ({ søknad }: Props) => {
    return (
        <div>
            <SoknadInfo søknad={søknad} />
            <Box margin="xl">
                <Knapperad align="left">
                    <Knapp mini={true}>Ettersend dokumentasjon</Knapp>
                    <Knapp mini={true}>Send en ny søknad</Knapp>
                </Knapperad>
            </Box>
        </div>
    );
};

export default Pleiepengesak;

import React from 'react';
import { Søknad } from '../../types/apiTypes/søknadTypes';

interface Props {
    søknad: Søknad;
}

const Pleiepengesak = ({ søknad }: Props) => {
    return (
        <div>
            Søknads: <pre>{JSON.stringify(søknad)}</pre>
        </div>
    );
};

export default Pleiepengesak;

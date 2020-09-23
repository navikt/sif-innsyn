import React from 'react';
import { Søknad } from '../../types/apiTypes/søknadTypes';

interface Props {
    søknad: Søknad;
}

const Pleiepengesak = ({ søknad }: Props) => {
    return (
        <div>
            SøknadJSON: <code style={{ wordBreak: 'break-all' }}>{JSON.stringify(søknad)}</code>
        </div>
    );
};

export default Pleiepengesak;

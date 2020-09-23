import React from 'react';
import SoknadInfo from '../../components/soknad-info/SoknadInfo';
import { Søknad } from '../../types/apiTypes/søknadTypes';

interface Props {
    søknad: Søknad;
}

const Pleiepengesak = ({ søknad }: Props) => {
    return (
        <div>
            <SoknadInfo søknad={søknad} />
        </div>
    );
};

export default Pleiepengesak;

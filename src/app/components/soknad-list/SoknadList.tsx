import React from 'react';
import { Søknad } from '../../types/apiTypes/søknadTypes';
import SoknadListElement from './SoknadListElement';

interface Props {
    søknader: Søknad[];
}

const SoknadList = ({ søknader }: Props) => (
    <>
        {søknader.map((søknad) => {
            return <SoknadListElement key={søknad.søknadId} søknad={søknad}></SoknadListElement>;
        })}
    </>
);

export default SoknadList;

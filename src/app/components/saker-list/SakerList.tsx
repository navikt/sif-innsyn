import React from 'react';
import { Søknad } from '../../types/apiTypes/søknadTypes';
import SakerListElement from './SakerListElement';

interface Props {
    søknader: Søknad[];
}

const SakerList = ({ søknader }: Props) => (
    <>
        {søknader.map((søknad) => {
            return <SakerListElement key={søknad.søknadId} søknad={søknad}></SakerListElement>;
        })}
    </>
);

export default SakerList;

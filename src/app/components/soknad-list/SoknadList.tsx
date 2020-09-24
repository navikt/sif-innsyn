import React from 'react';
import { Søknad } from '../../types/apiTypes/søknadTypes';
import AriaText from '../aria/AriaText';
import SoknadListElement from './SoknadListElement';

interface Props {
    søknader: Søknad[];
}

const SoknadList = ({ søknader }: Props) => (
    <>
        <AriaText tag="h2">Dine saker</AriaText>
        {søknader.map((søknad) => {
            return <SoknadListElement key={søknad.søknadId} søknad={søknad}></SoknadListElement>;
        })}
    </>
);

export default SoknadList;

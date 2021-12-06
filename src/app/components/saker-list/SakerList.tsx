import React from 'react';
import { Søknad } from '../../types/apiTypes/søknadTypes';
import SakerListElement from './SakerListElement';

interface Props {
    søknader: Søknad[];
}

const SakerList = ({ søknader }: Props) => (
    <ul style={{ listStyleType: 'none', paddingInlineStart: 0 }}>
        {søknader.map((søknad) => {
            return (
                <li key={søknad.søknadId}>
                    <SakerListElement søknad={søknad}></SakerListElement>
                </li>
            );
        })}
    </ul>
);

export default SakerList;

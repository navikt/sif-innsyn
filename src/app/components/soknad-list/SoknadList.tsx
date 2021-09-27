import { InnsynRouteConfig } from 'app/config/innsynRouteConfig';
import React from 'react';
import { Søknad } from '../../types/apiTypes/søknadTypes';
import SoknadListElement from './SoknadListElement';

interface Props {
    søknader: Søknad[];
    link?: InnsynRouteConfig;
}

const SoknadList = ({ søknader, link }: Props) => (
    <>
        {søknader.map((søknad) => {
            return <SoknadListElement key={søknad.søknadId} søknad={søknad} link={link}></SoknadListElement>;
        })}
    </>
);

export default SoknadList;

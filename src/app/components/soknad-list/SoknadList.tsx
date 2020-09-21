import React from 'react';
import { Søknad } from '../../types/apiTypes/søknadTypes';
import Box from '../elements/box/Box';
import Soknadstatus from '../soknadstatus/Soknadstatus';

interface Props {
    søknader: Søknad[];
}

const SoknadList = ({ søknader }: Props) => (
    <>
        {søknader.map((søknad, index) => {
            return (
                <Box padBottom="m" key={index}>
                    <Soknadstatus søknad={søknad}></Soknadstatus>
                </Box>
            );
        })}
    </>
);

export default SoknadList;

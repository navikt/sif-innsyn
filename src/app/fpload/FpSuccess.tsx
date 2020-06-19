import * as React from 'react';
import { Søker } from '../types/apiTypes/søkerTypes';

interface Props {
    søker: Søker;
}

const FpSuccess: React.FC<Props> = ({ søker }: Props) => {
    return <div>Søker: {JSON.stringify(søker, null, 4)}</div>;
};

export default FpSuccess;

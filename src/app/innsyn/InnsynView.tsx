import * as React from 'react';
import { Søkerdata } from '../types/søkerdataTypes';

interface Props {
    søkerdata: Søkerdata;
}

const InnsynView: React.FC<Props> = ({ søkerdata }: Props) => {
    return <div>Innsyn logged in.</div>;
};

export default InnsynView;

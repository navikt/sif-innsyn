import * as React from 'react';
import { Barn } from '../types/apiTypes/barnTypes';
import { Søker } from '../types/apiTypes/søkerTypes';
import { Arbeidsgiver } from '../types/apiTypes/arbeidsgiverTypes';
import ReactJson from 'react-json-view';

interface Props {
    søker: Søker;
    listeAvBarn: Barn[];
    organisasjoner: Arbeidsgiver[];
}

const FpSuccess3: React.FC<Props> = ({ søker, listeAvBarn, organisasjoner }: Props) => {
    return (
        <div>
            <div>Søker:</div>
            <ReactJson src={søker} />
            <div>Barn:</div>
            <ReactJson src={listeAvBarn} />
            <div>Arbeidsgiver:</div>
            <ReactJson src={organisasjoner} />
        </div>
    );
};

export default FpSuccess3;

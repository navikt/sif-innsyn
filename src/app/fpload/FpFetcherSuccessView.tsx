import * as React from 'react';
import { BarnFp } from '../types/apiTypes/barnTypes';
import { Søker } from '../types/apiTypes/søkerTypes';
import { ArbeidsgiverFp } from '../types/apiTypes/arbeidsgiverTypes';
import ReactJson from 'react-json-view';

interface Props {
    søker: Søker;
    listeAvBarn: BarnFp;
    organisasjoner: ArbeidsgiverFp;
}

const FpFetcherSuccessView: React.FC<Props> = ({ søker, listeAvBarn, organisasjoner }: Props) => {
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

export default FpFetcherSuccessView;

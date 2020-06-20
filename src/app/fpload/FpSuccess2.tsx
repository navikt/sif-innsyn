import * as React from 'react';
import { Barn } from '../types/apiTypes/barnTypes';
import { Søker } from '../types/apiTypes/søkerTypes';

interface Props {
    søker: Søker;
    listeAvBarn: Barn[];
}

const FpSuccess2: React.FC<Props> = ({ søker, listeAvBarn }: Props) => {
    return (
        <div>
            <div>Søker:</div>
            <div>
                Navn: {søker.fornavn} {søker.mellomnavn} {søker.etternavn}
            </div>
            <div>
                Barn:
                <div>
                    {listeAvBarn.map((barn: Barn, index: number) => {
                        return (
                            <div key={index}>
                                Barn1 :
                                <div>
                                    navn: {barn.fornavn} {barn.mellomnavn} {barn.etternavn}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FpSuccess2;

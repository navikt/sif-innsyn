import * as React from 'react';
import { Barn } from '../types/apiTypes/barnTypes';
import { Søker } from '../types/apiTypes/søkerTypes';
import { Arbeidsgiver } from '../types/apiTypes/arbeidsgiverTypes';

interface Props {
    søker: Søker;
    listeAvBarn: Barn[];
    organisasjoner: Arbeidsgiver[];
}

const FpSuccess3: React.FC<Props> = ({ søker, listeAvBarn, organisasjoner }: Props) => {
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
                <div>{JSON.stringify(organisasjoner, null, 4)}</div>
            </div>
        </div>
    );
};

export default FpSuccess3;

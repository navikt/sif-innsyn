import * as React from 'react';
import { EssentialData2 } from './Fetchable2';
import { Barn, BarnFp } from '../types/apiTypes/barnTypes';
import { Søker } from '../types/apiTypes/søkerTypes';

interface Props {
    data: EssentialData2<Søker, BarnFp>;
}

const FpSuccess2: React.FC<Props> = ({ data }: Props) => {
    return (
        <div>
            <div>Søker:</div>
            <div>
                Navn: {data.t1.fornavn} {data.t1.mellomnavn} {data.t1.etternavn}
            </div>
            <div>
                Barn:
                <div>
                    {data.t2.barn.map((barn: Barn) => {
                        return (
                            <div>
                                Barn1 :
                                <div>
                                    navn: {barn.fornavn} {barn.mellomnavn} {barn.etternavn}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            Søker: {JSON.stringify(data, null, 4)}
        </div>
    );
};

export default FpSuccess2;

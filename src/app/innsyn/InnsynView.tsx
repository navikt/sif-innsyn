import * as React from 'react';
import { SøkerApiResponse } from '../types/apiTypes/søkerTypes';
import ReactJson from 'react-json-view';
import { Søknad, SøknadApiResponse } from '../types/apiTypes/søknadTypes';
import InnsynPage from '../components/innsyn-page/InnsynPage';

interface Props {
    bruker?: SøkerApiResponse;
    søknad?: SøknadApiResponse;
}

const InnsynView: React.FC<Props> = ({ bruker, søknad }: Props) => {
    return (
        <InnsynPage>
            {bruker && (
                <div>
                    Innsyn logged in. Hi {bruker.fornavn} {bruker.etternavn} :)
                    <div>
                        <ReactJson src={bruker} />
                    </div>
                </div>
            )}
            {søknad && (
                <div>
                    {søknad.map((søknad: Søknad, index: number) => (
                        <div id={`${index}`}>{søknad.søknadstype}</div>
                    ))}
                    <ReactJson src={søknad} />
                </div>
            )}
        </InnsynPage>
    );
};

export default InnsynView;

import * as React from 'react';
import { SøkerApiResponse } from '../types/apiTypes/søkerTypes';
import ReactJson from 'react-json-view';
import { SøknadApiResponse } from '../types/apiTypes/søknadTypes';
import InnsynPage from '../components/innsyn-page/InnsynPage';
import Lenkepanel from 'nav-frontend-lenkepanel';
import { getEnvironmentVariable } from '../utils/envUtils';

interface Props {
    bruker?: SøkerApiResponse;
    søknad?: SøknadApiResponse;
}

const OversiktView: React.FC<Props> = ({ bruker, søknad }: Props) => {
    const publicPath = getEnvironmentVariable('PUBLIC_PATH');
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
                    <h1>Ytelsesoversikt</h1>
                    <br />
                    <Lenkepanel tittelProps={'sidetittel'} href={`${publicPath}/dine-pleiepenger`} border>
                        Dine pleiepenger
                    </Lenkepanel>
                    <Lenkepanel tittelProps={'sidetittel'} href={`${publicPath}/dine-omsorgspenger`} border>
                        Dine omsorgspenger
                    </Lenkepanel>
                    <Lenkepanel tittelProps={'sidetittel'} href={`${publicPath}/dine-opplæringspenger`} border>
                        Dine opplæringspenger
                    </Lenkepanel>
                    <Lenkepanel tittelProps={'sidetittel'} href={`${publicPath}/dine-pleiepeneger-nærstående`} border>
                        Pleiepenger nærstående
                    </Lenkepanel>
                </div>
            )}
        </InnsynPage>
    );
};

export default OversiktView;

import * as React from 'react';
import { SøkerApiResponse } from '../types/apiTypes/søkerTypes';
import ReactJson from 'react-json-view';
import { SøknadApiResponse, Søknadstype } from '../types/apiTypes/søknadTypes';
import { getEnvironmentVariable } from '../utils/envUtils';
import { PleiepengerIkon } from '../svg/FellesIkoner';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { Undertittel } from 'nav-frontend-typografi';
import './OversiktView.less';
import {
    søknadTypeErOmsorgspenger,
    søknadTypeErOpplæringspenger,
    søknadTypeErPleiepenger,
    søknadTypeErPleiepengerNærstående,
} from '../utils/SøknadUtils';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import InformationPoster from '@navikt/sif-common-core/lib/components/information-poster/InformationPoster';
import InnsynPage from '../components/innsyn-page/InnsynPage';

const uniq = require('lodash.uniq');

interface Props {
    bruker?: SøkerApiResponse;
    søknad?: SøknadApiResponse;
}

const OversiktView: React.FC<Props> = ({ bruker, søknad }: Props) => {
    const publicPath = getEnvironmentVariable('PUBLIC_PATH');
    const søknadTyper: Søknadstype[] | undefined = uniq(søknad?.map((value) => value.søknadstype));
    const harOmsorgspenger = søknadTyper?.filter((type) => søknadTypeErOmsorgspenger(type)).length !== 0;
    const harPleiepenger = søknadTyper?.filter((type) => søknadTypeErPleiepenger(type)).length !== 0;
    const harPleiepengerNærstående =
        søknadTyper?.filter((type) => søknadTypeErPleiepengerNærstående(type)).length !== 0;
    const harOpplæringspenger = søknadTyper?.filter((type) => søknadTypeErOpplæringspenger(type)).length !== 0;
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
                    {søknad?.length === 0 && (
                        <InformationPoster>
                            <Box padBottom={'l'}>Du har ingen registrerte søknader</Box>
                        </InformationPoster>
                    )}
                    {harPleiepenger && genererLenkeBase(`${publicPath}/dine-pleiepenger`, ' Dine Pleiepenger')}
                    {harOmsorgspenger && genererLenkeBase(`${publicPath}/dine-omsorgspenger`, ' Dine Omsorgspenger')}
                    {harOpplæringspenger &&
                        genererLenkeBase(`${publicPath}/dine-opplæringspenger`, ' Dine Opplæringspenger')}
                    {harPleiepengerNærstående &&
                        genererLenkeBase(`${publicPath}/dine-pleiepeneger-nærstående`, 'Pleiepenger Nærstående')}
                </div>
            )}
        </InnsynPage>
    );
};

const genererLenkeBase = (href: string, tittel: string) => (
    <LenkepanelBase href={href} border>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
                <PleiepengerIkon></PleiepengerIkon>
            </div>
            <div>
                <Undertittel className="lenkepanel_heading ml-1 ">{tittel}</Undertittel>
            </div>
        </div>
    </LenkepanelBase>
);

export default OversiktView;

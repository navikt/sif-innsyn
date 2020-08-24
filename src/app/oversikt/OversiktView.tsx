import * as React from 'react';
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
import { RouteConfig } from '../config/routeConfig';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const uniq = require('lodash.uniq');

interface Props {
    søknad: SøknadApiResponse;
}

const OversiktView: React.FC<Props> = ({ søknad }: Props) => {
    const publicPath = getEnvironmentVariable('PUBLIC_PATH');
    const søknadTyper: Søknadstype[] | undefined = uniq(søknad.map((value) => value.søknadstype));
    const harOmsorgspenger = søknadTyper?.filter((type) => søknadTypeErOmsorgspenger(type)).length !== 0;
    const harPleiepenger = søknadTyper?.filter((type) => søknadTypeErPleiepenger(type)).length !== 0;
    const harPleiepengerNærstående =
        søknadTyper?.filter((type) => søknadTypeErPleiepengerNærstående(type)).length !== 0;
    const harOpplæringspenger = søknadTyper?.filter((type) => søknadTypeErOpplæringspenger(type)).length !== 0;

    useEffect(() => {
        console.warn(JSON.stringify(window.location.href, null, 4));
    });

    return (
        <>
            {søknad && (
                <div>
                    {søknad?.length === 0 && (
                        <InformationPoster>
                            <Box padBottom={'l'}>Du har ingen registrerte søknader</Box>
                        </InformationPoster>
                    )}
                    {harPleiepenger && genererLenkeBase(`${RouteConfig.DINE_PLEIEPENGER}`, ' Dine Pleiepenger')}
                    {harOmsorgspenger && genererLenkeBase(`${RouteConfig.DINE_OMSORGSPENGER}`, ' Dine Omsorgspenger')}
                    {harOpplæringspenger &&
                        genererLenkeBase(`${publicPath}/dine-opplæringspenger`, ' Dine Opplæringspenger')}
                    {harPleiepengerNærstående &&
                        genererLenkeBase(`${publicPath}/dine-pleiepeneger-nærstående`, 'Pleiepenger Nærstående')}
                </div>
            )}
        </>
    );
};

const genererLenkeBase = (href: string, tittel: string) => (
    <LenkepanelBase
        href={'#'}
        border
        linkCreator={(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
            <Link to={href} {...props}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        <PleiepengerIkon></PleiepengerIkon>
                    </div>
                    <div>
                        <Undertittel className="lenkepanel_heading ml-1 ">{tittel}</Undertittel>
                    </div>
                </div>
            </Link>
        )}>
        <div></div>
    </LenkepanelBase>
);

export default OversiktView;

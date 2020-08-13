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

const uniq = require('lodash.uniq');

interface Props {
    bruker?: SøkerApiResponse;
    søknad?: SøknadApiResponse;
}

const OversiktView: React.FC<Props> = ({ bruker, søknad }: Props) => {
    const publicPath = getEnvironmentVariable('PUBLIC_PATH');
    const søknadTyper: Søknadstype[] | undefined = uniq(søknad?.map((value) => value.søknadstype));
    return (
        <div>
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
                    {søknadTyper?.map((type, index) => {
                        if (søknadTypeErPleiepenger(type)) {
                            return genererLenkeBase(`${publicPath}/dine-pleiepenger`, ' Dine Pleiepenger', index);
                        } else if (søknadTypeErOmsorgspenger(type)) {
                            return genererLenkeBase(`${publicPath}/dine-omsorgspenger`, ' Dine Omsorgspenger', index);
                        } else if (søknadTypeErOpplæringspenger(type)) {
                            return genererLenkeBase(
                                `${publicPath}/dine-opplæringspenger`,
                                ' Dine Opplæringspenger',
                                index
                            );
                        } else if (søknadTypeErPleiepengerNærstående(type)) {
                            return genererLenkeBase(
                                `${publicPath}/dine-pleiepeneger-nærstående`,
                                'Pleiepenger Nærstående',
                                index
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
};

const genererLenkeBase = (href: string, tittel: string, index: number) => (
    <LenkepanelBase key={index} href={href} border>
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

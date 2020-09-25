import React from 'react';
import { useIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { Breadcrumb } from '../../components/breadcrumbs/Breadcrumbs';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import { RouteConfig } from '../../config/routeConfig';
import { Søknad, Søknadstype } from '../../types/apiTypes/søknadTypes';
import { Sakstype } from '../../types/types';
import { getSakstypeTitle } from '../../utils/sakstypeUtils';
import { getSøknadTitle } from '../../utils/soknadUtils';
import PleiepengesakEttersending from './pleiepengesak-ettersending/PleiepengesakEttersending';
import PleiepengesakSøknad from './pleiepengesak-søknad/PleiepengesakSøknad';

interface Props {
    søknader: Søknad[];
    søknadId: string;
}

const PleiepengesakPage = ({ søknader, søknadId }: Props) => {
    const intl = useIntl();
    const søknad = søknader.find((s) => s.søknadId === søknadId);
    if (søknad === undefined) {
        return <Redirect to={RouteConfig.DINE_PLEIEPENGER} />;
    }
    const crumbs: Breadcrumb[] = [
        {
            route: RouteConfig.DINE_PLEIEPENGER,
            title: getSakstypeTitle(intl, Sakstype.PLEIEPENGER),
        },
    ];
    return (
        <InnsynPage title={getSøknadTitle(søknad, true)} breadcrumbs={crumbs}>
            {søknad.søknadstype === Søknadstype.PP_SYKT_BARN && <PleiepengesakSøknad søknad={søknad} />}
            {søknad.søknadstype === Søknadstype.PP_ETTERSENDING && <PleiepengesakEttersending søknad={søknad} />}
        </InnsynPage>
    );
};

export default PleiepengesakPage;

import React from 'react';
import { useIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import { Breadcrumb } from '../../components/breadcrumbs/Breadcrumbs';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import { InnsynRouteConfig } from '../../config/innsynRouteConfig';
import { PageKey } from '../../config/pageKey';
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
    useLogSidevisning(PageKey.pleiepengesak);
    if (søknad === undefined) {
        return <Redirect to={InnsynRouteConfig.DINE_PLEIEPENGER} />;
    }
    const crumbs: Breadcrumb[] = [
        {
            route: InnsynRouteConfig.OVERSIKT,
            title: getSakstypeTitle(intl, Sakstype.PLEIEPENGER),
        },
    ];
    return (
        <InnsynPage title={getSøknadTitle(søknad, true)} breadcrumbs={crumbs} focusOnContent={false}>
            {søknad.søknadstype === Søknadstype.PP_SYKT_BARN && <PleiepengesakSøknad søknad={søknad} />}
            {søknad.søknadstype === Søknadstype.PP_ETTERSENDING && <PleiepengesakEttersending søknad={søknad} />}
        </InnsynPage>
    );
};

export default PleiepengesakPage;

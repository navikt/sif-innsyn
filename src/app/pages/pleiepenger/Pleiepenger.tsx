import * as React from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import Breadcrumbs, { Breadcrumb } from '../../components/breadcrumbs/Breadcrumbs';
import Box from '../../components/elements/box/Box';
import InfoManglendeSøknad from '../../components/info-manglende-søknad/InfoManglendeSøknad';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import PageBannerCompact from '../../components/page-banner-compact/PageBannerCompact';
import SectionPanel from '../../components/section-panel/SectionPanel';
import SoknadList from '../../components/soknad-list/SoknadList';
import { RouteConfig } from '../../config/routeConfig';
import { SøknadApiResponse, Søknadstype } from '../../types/apiTypes/søknadTypes';
import { getSøknadTitle } from '../../utils/soknadUtils';
import PleiepengesakEttersending from './PleiepengesakEttersending';
import PleiepengesakSøknad from './PleiepengesakSøknad';

interface OwnProps {
    søknader: SøknadApiResponse;
}

export type PleiepengerSakProps = RouteComponentProps<{ id: string }>;

type Props = OwnProps & PleiepengerSakProps;

const PleiepengerPage: React.FC<Props> = ({ søknader, match: { params } }: Props) => {
    const søknad = params.id ? søknader.find((s) => s.søknadId === params.id) : undefined;
    if (params.id && søknad === undefined) {
        return <Redirect to={RouteConfig.DINE_PLEIEPENGER} />;
    }
    const crumbs: Breadcrumb[] = [];
    let pageTitle = 'Pleiepenger sykt barn';
    let crumbPageTitle: string;
    if (søknad) {
        crumbs.push({ route: RouteConfig.DINE_PLEIEPENGER, title: pageTitle });
        pageTitle = getSøknadTitle(søknad, false);
        crumbPageTitle = getSøknadTitle(søknad, true);
    }
    return (
        <InnsynPage
            title={pageTitle}
            topContentRenderer={() => <PageBannerCompact title={'Din oversikt - sykdom i familien'} />}
            breadcrumbsRenderer={() => <Breadcrumbs currentPageTitle={crumbPageTitle || pageTitle} crumbs={crumbs} />}>
            {søknad && (
                <>
                    {søknad.søknadstype === Søknadstype.PP_SYKT_BARN && <PleiepengesakSøknad søknad={søknad} />}
                    {søknad.søknadstype === Søknadstype.PP_ETTERSENDING && (
                        <PleiepengesakEttersending søknad={søknad} />
                    )}
                </>
            )}
            {søknad === undefined && (
                <SectionPanel title="Pleiepenger sykt barn" titleTag="h1">
                    <SoknadList søknader={søknader} />
                    <Box margin="l">
                        <InfoManglendeSøknad mode="text" />
                    </Box>
                </SectionPanel>
            )}
        </InnsynPage>
    );
};

export default withRouter(PleiepengerPage);

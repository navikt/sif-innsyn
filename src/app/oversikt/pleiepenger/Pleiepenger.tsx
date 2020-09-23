import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Breadcrumbs, { Breadcrumb } from '../../components/breadcrumbs/Breadcrumbs';
import Box from '../../components/elements/box/Box';
import InfoManglendeSøknad from '../../components/info-manglende-søknad/InfoManglendeSøknad';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import PageBannerCompact from '../../components/page-banner-compact/PageBannerCompact';
import SectionPanel from '../../components/section-panel/SectionPanel';
import SoknadList from '../../components/soknad-list/SoknadList';
import { RouteConfig } from '../../config/routeConfig';
import { SøknadApiResponse } from '../../types/apiTypes/søknadTypes';
import { getSøknadTitle } from '../../utils/soknadUtils';
import Pleiepengesak from './Pleiepengesak';

interface OwnProps {
    søknader: SøknadApiResponse;
}

export type PleiepengerSakProps = RouteComponentProps<{ id: string }>;

type Props = OwnProps & PleiepengerSakProps;

const PleiepengerPage: React.FC<Props> = ({ søknader, match: { params } }: Props) => {
    const søknad = params.id ? søknader.find((s) => s.søknadId) : undefined;
    const crumbs: Breadcrumb[] = [];
    let pageTitle = 'Dine pleiepengesaker';
    if (søknad) {
        crumbs.push({ route: RouteConfig.DINE_PLEIEPENGER, title: pageTitle });
        pageTitle = getSøknadTitle(søknad);
    }
    return (
        <InnsynPage
            title={pageTitle}
            topContentRenderer={() => <PageBannerCompact title={'Pleiepenger for sykt barn'} />}
            breadcrumbsRenderer={() => <Breadcrumbs currentPageTitle={pageTitle} crumbs={crumbs} />}>
            {søknad && (
                <SectionPanel title={pageTitle}>
                    <Box margin="l">
                        <Pleiepengesak søknad={søknad} />
                    </Box>
                </SectionPanel>
            )}
            {søknad === undefined && (
                <SectionPanel title="Dine pleiepengesaker">
                    <SoknadList søknader={søknader} />
                    <Box margin="l">
                        <InfoManglendeSøknad />
                    </Box>
                </SectionPanel>
            )}
        </InnsynPage>
    );
};

export default withRouter(PleiepengerPage);

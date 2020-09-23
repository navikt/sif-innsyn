import * as React from 'react';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import Box from '../../components/elements/box/Box';
import InfoManglendeSøknad from '../../components/info-manglende-søknad/InfoManglendeSøknad';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import PageBannerCompact from '../../components/page-banner_compact/PageBannerCompact';
import SectionPanel from '../../components/sectionPanel/SectionPanel';
import SoknadList from '../../components/soknad-list/SoknadList';
import { SøknadApiResponse } from '../../types/apiTypes/søknadTypes';

interface Props {
    søknader: SøknadApiResponse;
}

const PleiepengerPage: React.FC<Props> = ({ søknader }: Props) => {
    const title = 'Pleiepenger for sykt barn';
    return (
        <InnsynPage
            title={title}
            topContentRenderer={() => <PageBannerCompact title={title} />}
            breadcrumbsRenderer={() => <Breadcrumbs title={title} />}>
            <SectionPanel title="Dine pleiepengesaker">
                <SoknadList søknader={søknader} />
                <Box margin="l">
                    <InfoManglendeSøknad />
                </Box>
            </SectionPanel>
        </InnsynPage>
    );
};

export default PleiepengerPage;

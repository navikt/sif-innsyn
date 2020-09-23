import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import Box from '../../components/elements/box/Box';
import InfoManglendeSøknad from '../../components/info-manglende-søknad/InfoManglendeSøknad';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import PageBannerCompact from '../../components/page-banner_compact/PageBannerCompact';
import SectionPanel from '../../components/sectionPanel/SectionPanel';
import SoknadList from '../../components/soknad-list/SoknadList';
import { SøknadApiResponse } from '../../types/apiTypes/søknadTypes';
import Pleiepengesak from './Pleiepengesak';

interface OwnProps {
    søknader: SøknadApiResponse;
}

export type PleiepengerSakProps = RouteComponentProps<{ id: string }>;

type Props = OwnProps & PleiepengerSakProps;

const PleiepengerPage: React.FC<Props> = ({ søknader, match: { params } }: Props) => {
    const saksid = params.id;
    // Todo - rewrite herfra og innover i sak/liste
    if (saksid) {
        return <Pleiepengesak id={saksid} />;
    }
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

export default withRouter(PleiepengerPage);

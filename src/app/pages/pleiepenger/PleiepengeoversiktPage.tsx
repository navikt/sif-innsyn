import * as React from 'react';
import { Breadcrumb } from '../../components/breadcrumbs/Breadcrumbs';
import Box from '../../components/elements/box/Box';
import InfoManglendeSøknad from '../../components/info-manglende-søknad/InfoManglendeSøknad';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import SectionPanel from '../../components/section-panel/SectionPanel';
import SoknadList from '../../components/soknad-list/SoknadList';
import { Søknad } from '../../types/apiTypes/søknadTypes';
import { erPleiepenger } from '../../utils/soknadUtils';

interface Props {
    søknader: Søknad[];
}

const PleiepengeroversiktPage = ({ søknader }: Props) => {
    const crumbs: Breadcrumb[] = [];
    const pageTitle = 'Pleiepenger for sykt barn';
    const pleiepengesoknader = søknader.filter((søknad) => erPleiepenger(søknad));
    return (
        <InnsynPage title={pageTitle} breadcrumbs={crumbs}>
            <SectionPanel title="Pleiepenger for sykt barn" titleTag="h1">
                <SoknadList søknader={pleiepengesoknader} />
                <Box margin="l">
                    <InfoManglendeSøknad mode="text" />
                </Box>
            </SectionPanel>
        </InnsynPage>
    );
};

export default PleiepengeroversiktPage;

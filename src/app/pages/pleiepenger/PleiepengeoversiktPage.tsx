import * as React from 'react';
import { useIntl } from 'react-intl';
import { Breadcrumb } from '../../components/breadcrumbs/Breadcrumbs';
import Box from '../../components/elements/box/Box';
import InfoManglendeSøknad from '../../components/info-manglende-søknad/InfoManglendeSøknad';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import SectionPanel from '../../components/section-panel/SectionPanel';
import SoknadList from '../../components/soknad-list/SoknadList';
import { Søknad } from '../../types/apiTypes/søknadTypes';
import { Sakstype } from '../../types/types';
import { getSakstypeTitle } from '../../utils/sakstypeUtils';
import { erPleiepenger } from '../../utils/soknadUtils';

interface Props {
    søknader: Søknad[];
}

const PleiepengeroversiktPage = ({ søknader }: Props) => {
    const intl = useIntl();
    const crumbs: Breadcrumb[] = [];
    const pageTitle = getSakstypeTitle(intl, Sakstype.PLEIEPENGER);
    const pleiepengesoknader = søknader.filter((søknad) => erPleiepenger(søknad));
    return (
        <InnsynPage title={pageTitle} breadcrumbs={crumbs}>
            <SectionPanel title={pageTitle} titleTag="h1" ariaTitle={`Dine saker - ${pageTitle}`}>
                <SoknadList søknader={pleiepengesoknader} />
                <Box margin="l">
                    <InfoManglendeSøknad mode="text" />
                </Box>
            </SectionPanel>
        </InnsynPage>
    );
};

export default PleiepengeroversiktPage;

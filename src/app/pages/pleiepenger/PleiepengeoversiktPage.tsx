import * as React from 'react';
import { useIntl } from 'react-intl';
import AriaAlternative from '../../components/aria/AriaAlternative';
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
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

interface Props {
    søknader: Søknad[];
}

const PleiepengeroversiktPage = ({ søknader }: Props) => {
    const intl = useIntl();
    const crumbs: Breadcrumb[] = [];
    const pageTitle = getSakstypeTitle(intl, Sakstype.PLEIEPENGER);
    const pleiepengesoknader = søknader.filter((søknad) => erPleiepenger(søknad));
    return (
        <InnsynPage title={pageTitle} breadcrumbs={crumbs} focusOnContent={true}>
            <SectionPanel
                title={<AriaAlternative visibleText={pageTitle} ariaText={`${pageTitle} - dine saker`} />}
                titleTag="h1">
                {pleiepengesoknader.length > 0 && <SoknadList søknader={pleiepengesoknader} />}
                {pleiepengesoknader.length === 0 && (
                    <Box margin="m">
                        <AlertStripeInfo>Vi finner ikke pleiepengesaker fra deg</AlertStripeInfo>
                    </Box>
                )}
                <Box margin="l">
                    <InfoManglendeSøknad mode="expandable" />
                </Box>
            </SectionPanel>
        </InnsynPage>
    );
};

export default PleiepengeroversiktPage;

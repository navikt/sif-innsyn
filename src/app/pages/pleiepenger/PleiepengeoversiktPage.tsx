import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import AriaAlternative from '../../components/aria/AriaAlternative';
import { Breadcrumb } from '../../components/breadcrumbs/Breadcrumbs';
import Box from '../../components/elements/box/Box';
import InfoManglendeSøknad from '../../components/info-manglende-søknad/InfoManglendeSøknad';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import SectionPanel from '../../components/section-panel/SectionPanel';
import SoknadList from '../../components/soknad-list/SoknadList';
import { PageKey } from '../../config/pageKey';
import useLogSidevisning from '../../sif-amplitude/hooks/useLogSidevisning';
import { Søknad } from '../../types/apiTypes/søknadTypes';
import { Sakstype } from '../../types/types';
import intlHelper from '../../utils/intlUtils';
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
    useLogSidevisning(PageKey.pleiepengeoversikt, { antallSøknader: pleiepengesoknader.length });
    return (
        <InnsynPage title={pageTitle} breadcrumbs={crumbs} focusOnContent={true}>
            <SectionPanel
                title={
                    <AriaAlternative
                        visibleText={pageTitle}
                        ariaText={intlHelper(intl, 'page.pleiepengesaker.oversikt.ariaTitle', { pageTitle })}
                    />
                }
                titleTag="h1">
                {pleiepengesoknader.length > 0 && <SoknadList søknader={pleiepengesoknader} />}
                {pleiepengesoknader.length === 0 && (
                    <Box margin="m">
                        <AlertStripeInfo>
                            <FormattedMessage id="page.pleiepengesaker.oversikt.ingenSakerFunnet" />
                        </AlertStripeInfo>
                    </Box>
                )}
                <Box margin="xl">
                    <InfoManglendeSøknad mode="expandable-text" />
                </Box>
            </SectionPanel>
        </InnsynPage>
    );
};

export default PleiepengeroversiktPage;

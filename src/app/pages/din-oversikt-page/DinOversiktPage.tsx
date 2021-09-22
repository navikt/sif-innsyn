import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Box from '../../components/elements/box/Box';
import InfoManglendeSøknad from '../../components/info-manglende-søknad/InfoManglendeSøknad';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import PageBanner from '../../components/page-banner/PageBanner';
import SectionPanel from '../../components/section-panel/SectionPanel';
import SoknadList from '../../components/soknad-list/SoknadList';
import { PageKey } from '../../config/pageKey';
import SvgSykdomIFamilien from '../../svg/SvgSykdomIFamilien';
import { Søknad } from '../../types/apiTypes/søknadTypes';
import intlHelper from '../../utils/intlUtils';
import { erPleiepenger } from '../../utils/soknadUtils';
import MellomlagringDataFetcher from '../MellomlagringDataFetcher';

interface Props {
    søknader: Søknad[];
}

const Oversikt = ({ søknader }: Props) => {
    const intl = useIntl();
    const pleiepengesoknader = søknader.filter((søknad) => erPleiepenger(søknad));
    const harSøknader = pleiepengesoknader.length > 0;

    useLogSidevisning(PageKey.frontpage);
    return (
        <InnsynPage
            title={intlHelper(intl, 'page.dinOversikt.title')}
            topContentRenderer={() => (
                <PageBanner title={intlHelper(intl, 'page.dinOversikt.title')} illustration={<SvgSykdomIFamilien />} />
            )}>
            <MellomlagringDataFetcher />

            <SectionPanel title={intlHelper(intl, 'page.dinOversikt.saker.title')}>
                {harSøknader && <SoknadList søknader={pleiepengesoknader} />}
                {harSøknader === false && (
                    <>
                        <AlertStripeInfo>
                            <FormattedMessage id="page.dinOversikt.saker.ingenFunnet" />
                        </AlertStripeInfo>
                    </>
                )}
                <Box margin="xl">
                    <InfoManglendeSøknad mode="expandable-text" />
                </Box>
            </SectionPanel>
        </InnsynPage>
    );
};

export default Oversikt;

import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import Box from '../../components/elements/box/Box';
import InfoManglendeSøknad from '../../components/info-manglende-søknad/InfoManglendeSøknad';
import InformationIcon from '../../components/information-poster/InformationIcon';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import PageBanner from '../../components/page-banner/PageBanner';
import SectionPanel from '../../components/section-panel/SectionPanel';
import SoknadList from '../../components/soknad-list/SoknadList';
import { PageKey } from '../../config/pageKey';
import getLenker from '../../lenker';
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
            <Box margin="l">
                <SectionPanel
                    ariaTitle={intlHelper(intl, 'page.dinOversikt.intro.section.ariaTitle')}
                    illustration={<InformationIcon />}
                    illustrationPlacement="outside">
                    <FormattedMessage tagName="p" id="page.dinOversikt.intro.1" />
                    <p style={{ fontWeight: 'bold' }}>
                        <FormattedMessage id="page.dinOversikt.intro.3.a" />{' '}
                        <Lenke href={getLenker(intl.locale).saksoversikt}>
                            <FormattedMessage id="page.dinOversikt.intro.3.b" />
                        </Lenke>
                        .
                    </p>
                </SectionPanel>
            </Box>

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

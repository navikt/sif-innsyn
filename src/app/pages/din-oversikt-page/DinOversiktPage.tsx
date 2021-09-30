import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
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
import { InnsynRouteConfig } from '../../config/innsynRouteConfig';
import DocumenterIkon from '../../svg/dokumenterIkon';
import NavFrontendChevron from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';
import './dinOversiktPage.less';
import bemUtils from '../../utils/bemUtils';
import Box from '../../components/elements/box/Box';
import Title from '../../components/elements/title/Title';
import getLenker from '../../lenker';
import Knappelenke from '../../components/knappelenke/Knappelenke';

const bem = bemUtils('dinOversiktPage');

interface Props {
    søknader: Søknad[];
}

const Oversikt = ({ søknader }: Props) => {
    const intl = useIntl();

    const pleiepengesoknader = søknader.filter((søknad) => erPleiepenger(søknad));
    const harSøknader = pleiepengesoknader.length > 0;
    const seksFørsteSoknader = pleiepengesoknader.slice(0, 5);

    useLogSidevisning(PageKey.frontpage);

    return (
        <InnsynPage
            title={intlHelper(intl, 'page.dinOversikt.title')}
            topContentRenderer={() => (
                <PageBanner title={intlHelper(intl, 'page.dinOversikt.title')} illustration={<SvgSykdomIFamilien />} />
            )}>
            <MellomlagringDataFetcher />
            <div className={bem.classNames(bem.block, bem.element('sectionPanelSoknader'))}>
                <SectionPanel
                    illustration={<DocumenterIkon />}
                    illustrationPlacement="outside"
                    title={intlHelper(intl, 'page.dinOversikt.saker.title')}
                    additionalInfo={<InfoManglendeSøknad mode="expandable-text" />}>
                    {harSøknader && (
                        <>
                            <Box margin="xxl">
                                <SoknadList søknader={seksFørsteSoknader} />
                            </Box>

                            {pleiepengesoknader.length > 6 && (
                                <div className={bem.classNames(bem.block, bem.element('alleSoknaderLenke'))}>
                                    <Lenke href={InnsynRouteConfig.SØKNADER}>
                                        {intlHelper(intl, 'page.dinOversikt.saker.visAlle')}
                                        <NavFrontendChevron className={bem.element('chevron')} type={'høyre'} />
                                    </Lenke>
                                </div>
                            )}
                        </>
                    )}

                    {harSøknader === false && (
                        <>
                            <AlertStripeInfo>
                                <FormattedMessage id="page.dinOversikt.saker.ingenFunnet" />
                            </AlertStripeInfo>
                        </>
                    )}
                </SectionPanel>
            </div>
            <div className={bem.classNames(bem.block, bem.element('sectionPanel'))}>
                <SectionPanel>
                    <Box margin="xl">
                        <Title>{intlHelper(intl, 'page.dinOversikt.lenker.endring.title')}</Title>
                        <Box margin="l">
                            <FormattedMessage id="page.dinOversikt.lenker.endring.info" />{' '}
                            <Box margin="l">
                                <Knappelenke href={getLenker().endringerDuMåGiBeskjedOm}>
                                    <FormattedMessage id="page.dinOversikt.lenker.endring.knapp.title" />
                                </Knappelenke>
                            </Box>
                        </Box>
                    </Box>
                    <Box margin="xxl" padBottom="xxl">
                        <Title>{intlHelper(intl, 'page.dinOversikt.lenker.nySøknad.title')}</Title>
                        <Box margin="l">
                            <FormattedMessage id="page.dinOversikt.lenker.nySøknad.info" />{' '}
                            <Box margin="l">
                                <Knappelenke href={getLenker().pleiepenger}>
                                    <FormattedMessage id="page.dinOversikt.lenker.nySøknad.knapp.title" />
                                </Knappelenke>
                            </Box>
                        </Box>
                    </Box>
                </SectionPanel>
            </div>
        </InnsynPage>
    );
};

export default Oversikt;

import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import InfoManglendeSøknad from '../../components/info-manglende-søknad/InfoManglendeSøknad';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import PageBanner from '../../components/page-banner/PageBanner';
import SectionPanel from '../../components/section-panel/SectionPanel';
// import SoknadList from '../../components/soknad-list/SoknadList';
import { PageKey } from '../../config/pageKey';
import Alertstripe from 'nav-frontend-alertstriper';
// import SvgSykdomIFamilien from '../../svg/SvgSykdomIFamilien';
import { Søknad } from '../../types/apiTypes/søknadTypes';
import intlHelper from '../../utils/intlUtils';
import { erPleiepenger } from '../../utils/soknadUtils';
import MellomlagringDataFetcher from '../MellomlagringDataFetcher';
import { getRouteUrl, InnsynRouteConfig } from '../../config/innsynRouteConfig';
import DocumenterIkon from '../../svg/dokumenterIkon';
import NavFrontendChevron from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';
import './dinOversiktPage.less';
import bemUtils from '../../utils/bemUtils';
import Box from '../../components/elements/box/Box';
// import Title from '../../components/elements/title/Title';
import getLenker from '../../lenker';
// import Knappelenke from '../../components/knappelenke/Knappelenke';
import Info from './Info';
import SakerList from '../../components/saker-list/SakerList';
import { mindreTimerEtterInnsendtEnnMaxAntallTimer } from '../../utils/dateUtils';
import LinkPanel from '../../components/link-panel/LinkPanel';
import EttersendIkon from '../../svg/ettersendIkon';
import FrontpagePanelWrapper from '../../components/frontpage-panel-wrapper/FrontpagePanelWrapper';
import EndringIkon from '../../svg/endringIkon';
import NySøknadIkon from '../../svg/nySøknadIcon';

const bem = bemUtils('dinOversiktPage');

interface Props {
    søknader: Søknad[];
}

const Oversikt = ({ søknader }: Props) => {
    const intl = useIntl();

    const pleiepengesoknader = søknader.filter((søknad) => erPleiepenger(søknad));
    const harSøknader = pleiepengesoknader.length > 0;
    const seksFørsteSoknader = pleiepengesoknader.slice(0, 5);
    const harArbeidsgiver = (søknad: Søknad) => {
        if ('arbeidsgivere' in søknad.søknad) {
            return 'organisasjoner' in søknad.søknad.arbeidsgivere
                ? søknad.søknad.arbeidsgivere.organisasjoner && søknad.søknad.arbeidsgivere.organisasjoner.length > 0
                : søknad.søknad.arbeidsgivere && søknad.søknad.arbeidsgivere.length > 0;
        }
        return false;
    };
    const visAlertstripe =
        harSøknader &&
        pleiepengesoknader.some((søknad) => harArbeidsgiver(søknad)) &&
        pleiepengesoknader.some((søknad) => mindreTimerEtterInnsendtEnnMaxAntallTimer(søknad.opprettet, 48));

    useLogSidevisning(PageKey.frontpage);

    return (
        <InnsynPage
            title={intlHelper(intl, 'page.dinOversikt.title')}
            topContentRenderer={() => <PageBanner title={intlHelper(intl, 'page.dinOversikt.title')}></PageBanner>}>
            {visAlertstripe && (
                <Box padBottom="xl">
                    <Alertstripe type="advarsel">
                        <FormattedMessage id="page.pleiepengesakSøknad.søknad.alertstripe.title" />
                        <ul>
                            <li>
                                <FormattedMessage id="page.pleiepengesakSøknad.søknad.alertstripe.list.1" />
                            </li>
                            <li>
                                <FormattedMessage id="page.pleiepengesakSøknad.søknad.alertstripe.list.2" />
                            </li>
                        </ul>
                        <FormattedMessage id="page.pleiepengesakSøknad.søknad.alertstripe.info" />
                    </Alertstripe>
                </Box>
            )}
            <MellomlagringDataFetcher />
            <Box>
                <FrontpagePanelWrapper maxColumns={3} title={intlHelper(intl, 'page.dinOversikt.linkPanel.title')}>
                    <LinkPanel
                        image={<EttersendIkon />}
                        title={intlHelper(intl, 'page.dinOversikt.linkPanel.ettersending.title')}
                        lenke={getLenker().ettersending}
                        lenkeTekst={intlHelper(intl, 'page.dinOversikt.linkPanel.ettersending.lenkeTekst')}>
                        <>
                            <FormattedMessage id="page.dinOversikt.linkPanel.ettersending.lenkeTekst.info" />
                            <br />
                            <br />
                        </>
                    </LinkPanel>
                    <LinkPanel
                        image={<EndringIkon />}
                        title={intlHelper(intl, 'page.dinOversikt.linkPanel.endringsmelding.title')}
                        lenke={getLenker().minInnboksSkrivMelding}
                        lenkeTekst={intlHelper(intl, 'page.dinOversikt.linkPanel.endringsmelding.lenkeTekst')}>
                        <FormattedMessage id="page.dinOversikt.linkPanel.endringsmelding.lenkeTekst.info" />
                    </LinkPanel>
                    <LinkPanel
                        image={<NySøknadIkon />}
                        title={intlHelper(intl, 'page.dinOversikt.linkPanel.søknad.title')}
                        lenke={getLenker().pleiepengerURL}
                        lenkeTekst={intlHelper(intl, 'page.dinOversikt.linkPanel.søknad.lenkeTekst')}>
                        <FormattedMessage id="page.dinOversikt.linkPanel.søknad.lenkeTekst.info" />
                    </LinkPanel>
                </FrontpagePanelWrapper>
            </Box>
            <Box>
                <SectionPanel
                    illustration={<DocumenterIkon />}
                    illustrationPlacement="outside"
                    title={intlHelper(intl, 'page.dinOversikt.saker.title')}
                    additionalInfo={<InfoManglendeSøknad mode="expandable-text" />}>
                    {harSøknader && (
                        <>
                            <Box margin="l">
                                <SakerList søknader={seksFørsteSoknader} />
                            </Box>

                            {pleiepengesoknader.length > 6 && (
                                <div className={bem.classNames(bem.block, bem.element('alleSoknaderLenke'))}>
                                    <Lenke href={getRouteUrl(InnsynRouteConfig.SØKNADER)}>
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
            </Box>
            <Box margin="xl">
                <Info />
            </Box>
        </InnsynPage>
    );
};

export default Oversikt;

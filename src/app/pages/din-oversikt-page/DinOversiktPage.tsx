import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import Alertstripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import NavFrontendChevron from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';
import Box from '../../components/elements/box/Box';
import FrontpagePanelWrapper from '../../components/frontpage-panel-wrapper/FrontpagePanelWrapper';
import InfoManglendeSøknad from '../../components/info-manglende-søknad/InfoManglendeSøknad';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import LinkPanel from '../../components/link-panel/LinkPanel';
import PageBanner from '../../components/page-banner/PageBanner';
import SakerList from '../../components/saker-list/SakerList';
import SectionPanel from '../../components/section-panel/SectionPanel';
import { getRouteUrl, InnsynRouteConfig } from '../../config/innsynRouteConfig';
import { PageKey } from '../../config/pageKey';
import getLenker from '../../lenker';
import DocumenterIkon from '../../svg/dokumenterIkon';
import EndringIkon from '../../svg/endringIkon';
import EttersendIkon from '../../svg/ettersendIkon';
import NySøknadIkon from '../../svg/nySøknadIcon';
import { PleiepengerSøknadInfo, Søknad, Søknadstype } from '../../types/apiTypes/søknadTypes';
import bemUtils from '../../utils/bemUtils';
import { mindreTimerEtterInnsendtEnnMaxAntallTimer } from '../../utils/dateUtils';
import { Feature, isFeatureEnabled } from '../../utils/featureToggleUtils';
import intlHelper from '../../utils/intlUtils';
import { erPleiepenger } from '../../utils/soknadUtils';
import MellomlagringDataFetcher from '../MellomlagringDataFetcher';
import Info from './Info';
import './dinOversiktPage.less';

const bem = bemUtils('dinOversiktPage');

interface Props {
    søknader: Søknad[];
}

const Oversikt = ({ søknader }: Props) => {
    const intl = useIntl();

    const pleiepengesoknader = søknader.filter((søknad) => erPleiepenger(søknad));

    const harSøknader = pleiepengesoknader.length > 0;
    const seksFørsteSoknader = pleiepengesoknader.slice(0, 5);
    const harArbeidsgiver = (søknad: PleiepengerSøknadInfo) => {
        if ('arbeidsgivere' in søknad) {
            return 'organisasjoner' in søknad.arbeidsgivere
                ? søknad.arbeidsgivere.organisasjoner && søknad.arbeidsgivere.organisasjoner.length > 0
                : søknad.arbeidsgivere &&
                      søknad.arbeidsgivere.length > 0 &&
                      søknad.arbeidsgivere.some((arbeidsgiver) => !arbeidsgiver.sluttetFørSøknadsperiode);
        }
        return false;
    };

    const visAlertstripe =
        harSøknader &&
        pleiepengesoknader.some(
            (søknad) =>
                søknad.søknadstype === Søknadstype.PP_SYKT_BARN &&
                harArbeidsgiver(søknad.søknad) &&
                mindreTimerEtterInnsendtEnnMaxAntallTimer(søknad.opprettet, 48)
        );

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
                <FrontpagePanelWrapper maxColumns={3}>
                    <LinkPanel
                        image={<EttersendIkon />}
                        title={intlHelper(intl, 'page.dinOversikt.linkPanel.ettersending.title')}
                        lenke={getLenker().ettersending}
                        lenkeTekst={intlHelper(intl, 'page.dinOversikt.linkPanel.ettersending.lenkeTekst')}>
                        <FormattedMessage id="page.dinOversikt.linkPanel.ettersending.lenkeTekst.info" />
                    </LinkPanel>
                    {isFeatureEnabled(Feature.ENDRINGSDIALOG) ? (
                        <LinkPanel
                            image={<EndringIkon />}
                            title={intlHelper(intl, 'page.dinOversikt.linkPanel.endringsmelding.title')}
                            lenke={getRouteUrl(InnsynRouteConfig.PLEIEPENGER_ENDRING)}
                            lenkeTekst={intlHelper(intl, 'page.dinOversikt.linkPanel.endringsmelding.lenkeTekst')}>
                            <FormattedMessage id="page.dinOversikt.linkPanel.endringsmelding.lenkeTekst.info" />
                        </LinkPanel>
                    ) : (
                        <LinkPanel
                            image={<EndringIkon />}
                            title={intlHelper(intl, 'page.dinOversikt.linkPanel.endring.skrivTilOss.title')}
                            lenke={getLenker().skrivTilOss}
                            lenkeTekst={intlHelper(intl, 'page.dinOversikt.linkPanel.endring.skrivTilOss.lenkeTekst')}>
                            <FormattedMessage id="page.dinOversikt.linkPanel.endring.skrivTilOss.lenkeTekst.info" />
                        </LinkPanel>
                    )}
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

            <Info />
        </InnsynPage>
    );
};

export default Oversikt;

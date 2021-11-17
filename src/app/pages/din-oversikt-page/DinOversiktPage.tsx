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
    console.log(pleiepengesoknader);
    return (
        <InnsynPage
            title={intlHelper(intl, 'page.dinOversikt.title')}
            topContentRenderer={() => (
                <PageBanner title={intlHelper(intl, 'page.dinOversikt.title')}>
                    <div> Her finner du dine innsendte søknader og endringsmeldinger.</div>{' '}
                    <div>Hvis du har en påbegynt og lagret søknad vil den også dukke opp her</div>
                </PageBanner>
            )}>
            {visAlertstripe && (
                <Box margin="l">
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

            <FrontpagePanelWrapper maxColumns={3} title={'Er det noe du vil melde fra til oss om? '}>
                <LinkPanel
                    image={<EttersendIkon />}
                    title="Ettersende noe?"
                    lenke={getLenker().ettersending}
                    lenkeTekst={'Gå til ettersending'}>
                    Hvis du vil dette eller dette så kan du gjøre det her
                </LinkPanel>
                <LinkPanel
                    image={<EndringIkon />}
                    title="Melde fra om endring?"
                    lenke={'/'}
                    lenkeTekst={'Gå til endringsmelding'}>
                    Hvis du vil dette eller dette så kan du gjøre det her
                </LinkPanel>
                <LinkPanel
                    image={<NySøknadIkon />}
                    title="Sende ny søknad?"
                    lenke={getLenker().pleiepengerURL}
                    lenkeTekst={'Gå til ny søknad'}>
                    Hvis du vil dette eller dette så kan du gjøre det her
                </LinkPanel>
            </FrontpagePanelWrapper>

            <div className={bem.classNames(bem.block, bem.element('sectionPanelSoknader'))}>
                <SectionPanel
                    illustration={<DocumenterIkon />}
                    illustrationPlacement="outside"
                    title={'Dette har vi mottatt fra deg'}
                    additionalInfo={<InfoManglendeSøknad mode="expandable-text" />}>
                    {harSøknader && (
                        <>
                            <Box margin="xxl">
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
            </div>

            <div className={bem.classNames(bem.block, bem.element('sectionPanel'))}>
                <Box margin="xl">
                    <Info />
                </Box>
            </div>
        </InnsynPage>
    );
};

export default Oversikt;

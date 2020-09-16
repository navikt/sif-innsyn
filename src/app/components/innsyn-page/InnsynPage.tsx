import * as React from 'react';
import { useIntl } from 'react-intl';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import Banner from '@navikt/sif-common-core/lib/components/banner/Banner';
import SvgSykdomIFamilien from '../../svg/SvgSykdomIFamilien';
import './innsynPage.less';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { useLocation } from 'react-router-dom';
import { RouteConfig } from '../../config/routeConfig';

const bem = bemUtils('innsynPage');

const InnsynPage: React.FC = (props): JSX.Element => {
    const intl = useIntl();
    const location = useLocation();
    return (
        <Page
            className={bem.block}
            title={intlHelper(intl, 'innsyn.root.tittel')}
            topContentRenderer={(): JSX.Element => {
                return (
                    <Banner size="small" className={'innsynPage__bannerPadding'}>
                        <div className={'innsynPage__bannerWrapper'}>
                            <div className={'innsynPage__bannerContentWrapper'}>
                                <div className={'innsynPage__title'}>
                                    <Innholdstittel tag={'h2'}>
                                        Sykdom i familien <br /> - {sideTittel(location)}
                                    </Innholdstittel>
                                </div>
                                <SvgSykdomIFamilien />
                            </div>
                        </div>
                    </Banner>
                );
            }}>
            {props.children}

            <div className={'innsyn-footer'}>
                <span>
                    <Undertittel>Du vil kanskje vite mer om</Undertittel>
                </span>
                <hr />
                <ul>
                    <li>
                        <Lenke href="#">Sykdom i familien</Lenke>
                    </li>
                    <li>
                        <Lenke href="#">Sakbehandlingstid</Lenke>
                    </li>
                    <li>
                        <Lenke href="#">Regelverk</Lenke>
                    </li>
                    <li>
                        <Lenke href="#">Klage</Lenke>
                    </li>
                </ul>
            </div>
        </Page>
    );
};

const sideTittel = (location: any) => {
    const path = location.pathname.split('/').pop();
    const pleiepengerSyktBarnPath = RouteConfig.DINE_PLEIEPENGER.split('/').pop();
    const omsorgspengerPath = RouteConfig.DINE_PLEIEPENGER.split('/').pop();
    const pleiepengerPath = RouteConfig.DINE_PLEIEPENGER.split('/').pop();
    console.log('urlpath = ', pleiepengerPath);
    switch (path) {
        case '':
            return 'din oversikt';
        case pleiepengerSyktBarnPath:
            return 'Pleiepenger for sykt barn';
        case omsorgspengerPath:
            return 'Utvidet rett om omsorgspenger';
        default:
            return path;
    }
};

export default InnsynPage;

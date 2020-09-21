import * as React from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import Lenke from 'nav-frontend-lenker';
import { Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import { RouteConfig } from '../../config/routeConfig';
import SvgSykdomIFamilien from '../../svg/SvgSykdomIFamilien';
import bemUtils from '../../utils/bemUtils';
import { getEnvironmentVariable } from '../../utils/envUtils';
import intlHelper from '../../utils/intlUtils';
import Banner from '../banner/Banner';
import Page from '../page/Page';
import './innsynPage.less';

const bem = bemUtils('innsynPage');

const InnsynPage: React.FC = (props): JSX.Element => {
    const intl = useIntl();
    const location = useLocation();

    const sykdomIFamilienInfoUrl = getEnvironmentVariable('SYKDOM_I_FAMILIEN_INFO_URL');
    const sakBehandlingstidInfoUrl = getEnvironmentVariable('SAKBEHANDLINGSTID_INFO_URL');
    const regelverkInfoInfoUrl = getEnvironmentVariable('REGELVERK_INFO_URL');
    const klageInfoUrl = getEnvironmentVariable('KLAGE_INFO_URL');

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
                        <Lenke target="_blank" href={sykdomIFamilienInfoUrl}>
                            Sykdom i familien
                        </Lenke>
                    </li>
                    <li>
                        <Lenke target="_blank" href={sakBehandlingstidInfoUrl}>
                            Sakbehandlingstid
                        </Lenke>
                    </li>
                    <li>
                        <Lenke target="_blank" href={regelverkInfoInfoUrl}>
                            Regelverk
                        </Lenke>
                    </li>
                    <li>
                        <Lenke target="_blank" href={klageInfoUrl}>
                            Klage
                        </Lenke>
                    </li>
                </ul>
            </div>
        </Page>
    );
};

const sideTittel = (location: any) => {
    const path = location.pathname.split('/').pop();
    const pleiepengerSyktBarnPath = RouteConfig.DINE_PLEIEPENGER.split('/').pop();
    const omsorgspengerPath = RouteConfig.DINE_OMSORGSPENGER.split('/').pop();
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

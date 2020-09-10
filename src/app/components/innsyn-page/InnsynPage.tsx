import * as React from 'react';
import { useIntl } from 'react-intl';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import Banner from '@navikt/sif-common-core/lib/components/banner/Banner';
import SvgSykdomIFamilien from '../../svg/SvgSykdomIFamilien';
import './innsynPage.less';
import { Systemtittel } from 'nav-frontend-typografi';

const bem = bemUtils('innsynPage');

const InnsynPage: React.FC = (props): JSX.Element => {
    const intl = useIntl();

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
                                    <Systemtittel>Sykdom i familien - Innsyn</Systemtittel>
                                </div>
                                <SvgSykdomIFamilien />
                            </div>
                        </div>
                    </Banner>
                );
            }}>
            {props.children}
        </Page>
    );
};

export default InnsynPage;

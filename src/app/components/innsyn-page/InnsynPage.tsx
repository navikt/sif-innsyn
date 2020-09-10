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
                    <Banner size="small">
                        <div className={bem.element('bannerWrapper')}>
                            <div className={bem.element('bannerContentWrapper')}>
                                <div className={bem.element('title')}>
                                    <Systemtittel>Sykdom i familien - Innsyn</Systemtittel>
                                </div>
                                <div className={bem.element('svgWrapper')}>
                                    <div className={bem.element('svgInnerWrapper')}>
                                        <SvgSykdomIFamilien />
                                    </div>
                                </div>
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

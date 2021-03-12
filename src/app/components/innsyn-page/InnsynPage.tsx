import React from 'react';
import { useIntl } from 'react-intl';
import bemUtils from '../../utils/bemUtils';
import intlHelper from '../../utils/intlUtils';
import Breadcrumbs, { Breadcrumb } from '../breadcrumbs/Breadcrumbs';
import Box from '../elements/box/Box';
import FocusRegion from '../focus-region/FocusRegion';
import PageBannerCompact from '../page-banner-compact/PageBannerCompact';
import Page from '../page/Page';
import InnsynFooter from './InnsynFooter';
import './innsynPage.less';

const bem = bemUtils('innsynPage');

interface Props {
    title: string;
    logDetails?: any;
    topContentRenderer?: () => React.ReactNode;
    breadcrumbs?: Breadcrumb[];
    focusOnContent?: boolean;
    children?: React.ReactNode;
}
const InnsynPage = ({ topContentRenderer, breadcrumbs, title, focusOnContent, children }: Props) => {
    const intl = useIntl();
    return (
        <Page
            className={bem.block}
            title={title}
            topContentRenderer={() =>
                topContentRenderer ? topContentRenderer() : <PageBannerCompact title={intlHelper(intl, 'site.title')} />
            }>
            {breadcrumbs && (
                <div className={bem.element('breadcrumbs')}>
                    {<Breadcrumbs currentPageTitle={title} crumbs={breadcrumbs} />}
                </div>
            )}

            <FocusRegion active={focusOnContent}>{children}</FocusRegion>
            <Box className={bem.element('footer')}>
                <InnsynFooter />
            </Box>
        </Page>
    );
};

export default InnsynPage;

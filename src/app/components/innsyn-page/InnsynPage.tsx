import * as React from 'react';
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
    topContentRenderer?: () => React.ReactNode;
    breadcrumbs?: Breadcrumb[];
    children?: React.ReactNode;
}
const InnsynPage = ({ topContentRenderer, breadcrumbs, title, children }: Props) => {
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
            <FocusRegion>{children}</FocusRegion>
            <Box margin="xxxl">
                <InnsynFooter />
            </Box>
        </Page>
    );
};

export default InnsynPage;

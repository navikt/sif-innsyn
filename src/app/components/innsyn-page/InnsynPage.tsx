import * as React from 'react';
import bemUtils from '../../utils/bemUtils';
import Breadcrumbs, { Breadcrumb } from '../breadcrumbs/Breadcrumbs';
import Box from '../elements/box/Box';
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
    return (
        <Page
            className={bem.block}
            title={title}
            topContentRenderer={() =>
                topContentRenderer ? (
                    topContentRenderer()
                ) : (
                    <PageBannerCompact title={'Din oversikt - sykdom i familien'} />
                )
            }>
            {breadcrumbs && (
                <div className={bem.element('breadcrumbs')}>
                    {<Breadcrumbs currentPageTitle={title} crumbs={breadcrumbs} />}
                </div>
            )}
            {children}
            <Box margin="xxxl">
                <InnsynFooter />
            </Box>
        </Page>
    );
};

export default InnsynPage;

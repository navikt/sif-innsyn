import * as React from 'react';
import bemUtils from '../../utils/bemUtils';
import Box from '../elements/box/Box';
import Page from '../page/Page';
import InnsynFooter from './InnsynFooter';
import './innsynPage.less';

const bem = bemUtils('innsynPage');

interface Props {
    title: string;
    topContentRenderer: () => React.ReactNode;
    breadcrumbsRenderer?: () => React.ReactNode;
    children?: React.ReactNode;
}
const InnsynPage = ({ topContentRenderer, breadcrumbsRenderer, title, children }: Props) => {
    return (
        <Page className={bem.block} title={title} topContentRenderer={topContentRenderer}>
            {breadcrumbsRenderer && <div className={bem.element('breadcrumbs')}>{breadcrumbsRenderer()}</div>}
            {children}
            <Box margin="xxxl">
                <InnsynFooter />
            </Box>
        </Page>
    );
};

export default InnsynPage;

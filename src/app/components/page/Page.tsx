import React from 'react';
import useEffectOnce from '../../hooks/useEffectOnce';
import DocumentTitle from '../document-title/DocumentTitle';
import './page.less';

interface Props {
    className?: string;
    title: string;
    topContentRenderer?: () => React.ReactNode;
}

const Page: React.FunctionComponent<Props> = ({ className, title, topContentRenderer, children }) => {
    useEffectOnce(() => {
        window.scrollTo(0, 0);
    });
    return (
        <DocumentTitle title={title}>
            <>
                {topContentRenderer && topContentRenderer()}
                <div className={`page ${className}`}>{children}</div>
            </>
        </DocumentTitle>
    );
};

export default Page;

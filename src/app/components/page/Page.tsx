import * as React from 'react';
import DocumentTitle from '../document-title/DocumentTitle';
import './page.less';

interface PageProps {
    className?: string;
    title: string;
    topContentRenderer?: () => React.ReactNode;
}

class Page extends React.Component<PageProps> {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        const { className, title, topContentRenderer, children } = this.props;
        return (
            <DocumentTitle title={title}>
                <>
                    {topContentRenderer && topContentRenderer()}
                    <div className={`page ${className}`}>{children}</div>
                </>
            </DocumentTitle>
        );
    }
}

export default Page;

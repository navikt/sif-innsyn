import React from 'react';

import useDocumentTitle from './useDocumentTitle';

interface DocumentTitleProps {
    title: string;
    children: React.ReactNode;
}

const DocumentTitle: React.FunctionComponent<DocumentTitleProps> = ({ title, children }: DocumentTitleProps) => {
    useDocumentTitle(title);
    return <>{children}</>;
};

export default DocumentTitle;

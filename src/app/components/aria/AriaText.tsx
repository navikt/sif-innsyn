import * as React from 'react';

interface Props {
    id?: string;
    children?: React.ReactNode;
    tag?: string;
}

const AriaText = ({ id, children, tag }: Props) => {
    const tagName = tag || 'span';
    return React.createElement(tagName, { id, className: 'sr-only' }, children);
};
export default AriaText;

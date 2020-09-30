import * as React from 'react';

import AriaText from './AriaText';

export interface Props {
    ariaText?: React.ReactNode;
    visibleText: React.ReactNode;
}

const AriaAlternative = ({ ariaText, visibleText }: Props) => {
    if (!ariaText) {
        return <>{visibleText}</>;
    }
    return (
        <>
            <AriaText>{ariaText}</AriaText>
            <span aria-hidden={true} role="presentation">
                {visibleText}
            </span>
        </>
    );
};

export default AriaAlternative;

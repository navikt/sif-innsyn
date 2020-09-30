import React, { useEffect, useRef } from 'react';

interface Props {
    children: React.ReactNode;
}
const FocusRegion = ({ children }: Props) => {
    const el = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (el.current) {
            el.current.focus();
        }
    });
    return (
        <div aria-live="polite" ref={el} tabIndex={-1}>
            {children}
        </div>
    );
};

export default FocusRegion;

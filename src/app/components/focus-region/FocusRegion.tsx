import React, { useEffect, useRef } from 'react';
import './focusRegion.less';

interface Props {
    active?: boolean;
    children: React.ReactNode;
}
const FocusRegion = ({ active, children }: Props) => {
    const el = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (active && el.current) {
            el.current.focus();
        }
    }, [active]);
    return (
        <div aria-live="polite" ref={el} tabIndex={active ? -1 : undefined} className="focusRegion">
            {children}
        </div>
    );
};

export default FocusRegion;

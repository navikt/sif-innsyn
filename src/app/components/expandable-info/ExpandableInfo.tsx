import React, { useRef, useState } from 'react';
import { Collapse } from 'react-collapse';
import Chevron from 'nav-frontend-chevron';
import { guid } from 'nav-frontend-js-utils';
import bemUtils from '../../utils/bemUtils';
import './expandableInfo.less';

export interface ExpandableInfoProps {
    title: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
}

const ExpandableInfo: React.FC<ExpandableInfoProps> = ({ title, children, defaultExpanded = false }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
    const id = useRef(guid()).current;

    return (
        <>
            <button
                type="button"
                className={bemUtils('toggleButton').block}
                aria-expanded={isExpanded}
                aria-controls={id}
                onClick={() => setIsExpanded((isExpanded) => !isExpanded)}>
                {title}
                <Chevron type={isExpanded ? 'opp' : 'ned'} />
            </button>
            <div id={id}>
                <Collapse isOpened={isExpanded}>
                    <div aria-live="polite">{isExpanded && children}</div>
                </Collapse>
            </div>
        </>
    );
};

export default ExpandableInfo;

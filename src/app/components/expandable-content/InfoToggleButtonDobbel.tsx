import React from 'react';
import NavFrontendChevron from 'nav-frontend-chevron';
import bemUtils from '../../utils/bemUtils';
import './infoToggleButtonDobbel.less';

const cls = bemUtils('infoToggleButtonDobbel');

interface Props {
    controlsId: string;
    children: React.ReactNode;
    isOpen?: boolean;
    child1isOpen?: boolean;
    child2isOpen?: boolean;
    child1onToggle: () => void;
    child2onToggle: () => void;
}

const InfoToggleButtonDobbel = (props: Props) => {
    const {
        isOpen = false,
        child1isOpen = false,
        child2isOpen = false,
        children,
        child1onToggle,
        child2onToggle,
        controlsId,
    } = props;
    const show2Button = children && children[0] && children[1];

    return (
        <span>
            <button
                type="button"
                className={cls.classNames(cls.block, cls.modifierConditional('open', isOpen))}
                onClick={child1onToggle}
                aria-expanded={isOpen}
                aria-controls={controlsId}>
                <span className={cls.element('content')}>
                    <span className={cls.element('label')}>{show2Button ? children[0] : children}</span>
                    <span className={cls.element('chevron')}>
                        <NavFrontendChevron
                            type={show2Button ? (child1isOpen ? 'opp' : 'ned') : isOpen ? 'opp' : 'ned'}
                        />
                    </span>
                </span>
            </button>
            {show2Button && (
                <button
                    type="button"
                    className={cls.classNames(cls.block, cls.modifierConditional('open', isOpen))}
                    onClick={child2onToggle}
                    style={{ float: 'right' }}
                    aria-expanded={child2isOpen}
                    aria-controls={controlsId}>
                    <span className={cls.element('content')}>
                        <span className={cls.element('label')}>{children ? children[1] : children}</span>
                        <span className={cls.element('chevron')}>
                            <NavFrontendChevron type={child2isOpen ? 'opp' : 'ned'} />
                        </span>
                    </span>
                </button>
            )}
        </span>
    );
};

export default InfoToggleButtonDobbel;

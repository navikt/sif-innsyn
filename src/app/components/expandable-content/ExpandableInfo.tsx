import React, { useState } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { guid } from 'nav-frontend-js-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import bemUtils from '../../utils/bemUtils';
import CollapsableContainer from './CollapsableContainer';
import InfoToggleButton from './InfoToggleButton';
import './expandableInfo.less';
import InfoToggleButtonDobbel from './InfoToggleButtonDobbel';

interface Props {
    children: React.ReactNode;
    title?: string;
    closeTitle?: string;
    initialOpen?: boolean;
    filledBackground?: boolean;
    dobbelButton?: boolean;
    title2?: string;
}

const bem = bemUtils('expandableInfo');

const ExpandableInfo = ({
    children,
    initialOpen,
    closeTitle,
    title,
    filledBackground = false,
    dobbelButton = false,
    title2,
}: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(initialOpen || false);
    const [toggleContentId] = useState(guid());
    const [child1isOpen, setChild1isOpen] = useState<boolean>(initialOpen || false);
    const [child2isOpen, setChild2isOpen] = useState<boolean>(initialOpen || false);

    return (
        <div className={bem.block}>
            {!dobbelButton && (
                <div className={bem.element('toggler', isOpen ? 'open' : undefined)}>
                    <InfoToggleButton onToggle={() => setIsOpen(!isOpen)} isOpen={isOpen} controlsId={toggleContentId}>
                        <Normaltekst tag="span">{isOpen ? closeTitle || title : title}</Normaltekst>
                    </InfoToggleButton>
                </div>
            )}
            {dobbelButton && (
                <div className={bem.element('toggler', isOpen ? 'open' : undefined)}>
                    <InfoToggleButtonDobbel
                        child1onToggle={() => {
                            if (child2isOpen) {
                                setChild1isOpen(!child1isOpen);
                                setChild2isOpen(false);
                            } else setChild1isOpen(!child1isOpen);
                        }}
                        child1isOpen={child1isOpen}
                        child2onToggle={() => {
                            if (child1isOpen) {
                                setChild2isOpen(!child2isOpen);
                                setChild1isOpen(false);
                            } else setChild2isOpen(!child2isOpen);
                        }}
                        child2isOpen={child2isOpen}
                        controlsId={toggleContentId}>
                        <Normaltekst tag="span">{isOpen ? closeTitle || title : title}</Normaltekst>
                        <Normaltekst tag="span">{isOpen ? closeTitle || title2 : title2}</Normaltekst>
                    </InfoToggleButtonDobbel>
                </div>
            )}
            {!dobbelButton && (
                <div className={bem.element('content')} id={toggleContentId}>
                    <CollapsableContainer isOpen={isOpen} animated={true} ariaLive="polite">
                        {filledBackground ? <AlertStripeInfo>{children}</AlertStripeInfo> : children}
                    </CollapsableContainer>
                </div>
            )}
            {dobbelButton && (
                <div className={bem.element('content')} id={toggleContentId}>
                    <CollapsableContainer isOpen={child1isOpen} animated={true} ariaLive="polite">
                        {filledBackground ? (
                            <AlertStripeInfo>{children ? children[0] : children}</AlertStripeInfo>
                        ) : children ? (
                            children[0]
                        ) : (
                            children
                        )}
                    </CollapsableContainer>
                    <CollapsableContainer isOpen={child2isOpen} animated={true} ariaLive="polite">
                        {filledBackground ? (
                            <AlertStripeInfo>{children ? children[1] : children}</AlertStripeInfo>
                        ) : children ? (
                            children[1]
                        ) : (
                            children
                        )}
                    </CollapsableContainer>
                </div>
            )}
        </div>
    );
};

export default ExpandableInfo;

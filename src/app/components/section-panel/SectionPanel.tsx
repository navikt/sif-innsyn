import React, { ReactNode } from 'react';
import PanelBase from 'nav-frontend-paneler';
import bemUtils from '../../utils/bemUtils';
import Title, { TitleStyle, TitleTag } from '../elements/title/Title';
import './sectionPanel.less';

const bem = bemUtils('sectionPanel');

interface Props {
    id?: string;
    title?: string;
    illustration?: React.ReactNode;
    children: ReactNode;
    titleTag?: TitleTag;
    illustrationPlacement?: 'inside' | 'outside';
    titleStyle?: TitleStyle;
    header?: React.ReactNode;
}

const SectionPanel = ({
    id,
    title,
    illustration,
    children,
    titleTag = 'h2',
    titleStyle = 'normal',
    illustrationPlacement = 'inside',
    header,
}: Props) => {
    return (
        <section
            tabIndex={-1}
            id={id}
            aria-label={title}
            className={bem.classNames(
                bem.block,
                bem.modifierConditional(
                    'illustrationOutside',
                    illustration !== undefined && illustrationPlacement === 'outside'
                )
            )}>
            <PanelBase className={bem.element('panel')}>
                {header && <header>{header}</header>}
                {illustration && <div className={bem.element('illustration')}>{illustration}</div>}
                {title && (
                    <div className={bem.element('title')}>
                        <Title tag={titleTag} titleStyle={titleStyle}>
                            {title}
                        </Title>
                    </div>
                )}
                {children}
            </PanelBase>
        </section>
    );
};

export default SectionPanel;

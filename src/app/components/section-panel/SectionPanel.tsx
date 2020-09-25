import React, { ReactNode } from 'react';
import PanelBase from 'nav-frontend-paneler';
import bemUtils from '../../utils/bemUtils';
import Title, { TitleStyle, TitleTag } from '../elements/title/Title';
import './sectionPanel.less';

const bem = bemUtils('sectionPanel');

interface Props {
    id?: string;
    title?: string;
    ariaTitle?: string;
    illustration?: React.ReactNode;
    children: ReactNode;
    titleTag?: TitleTag;
    illustrationPlacement?: 'inside' | 'outside';
    titleStyle?: TitleStyle;
    header?: React.ReactNode;
    tag?: 'section' | 'article';
}

const SectionOrArticle = (
    props: { tag: 'section' | 'article'; children: React.ReactNode } & React.PropsWithChildren<any>
) => {
    const { tag, children, ...rest } = props;
    return React.createElement(tag, rest, children);
};

const SectionPanel = ({
    id,
    title,
    ariaTitle,
    illustration,
    children,
    tag = 'section',
    titleTag = 'h2',
    titleStyle = 'normal',
    illustrationPlacement = 'inside',
    header,
}: Props) => {
    return (
        <SectionOrArticle
            tag={tag}
            tabIndex={-1}
            id={id}
            aria-label={tag === 'section' ? ariaTitle || title : undefined}
            className={bem.classNames(
                bem.block,
                bem.modifierConditional(
                    'illustrationOutside',
                    illustration !== undefined && illustrationPlacement === 'outside'
                )
            )}>
            <PanelBase className={bem.element('panel')}>
                {header && <div>{header}</div>}
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
        </SectionOrArticle>
    );
};

export default SectionPanel;

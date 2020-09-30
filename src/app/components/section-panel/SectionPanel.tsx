import React, { ReactNode } from 'react';
import PanelBase from 'nav-frontend-paneler';
import bemUtils from '../../utils/bemUtils';
import Title, { TitleStyle, TitleTag } from '../elements/title/Title';
import CircleIllustration from './circle-illustration/CircleIllustration';
import './sectionPanel.less';

const bem = bemUtils('sectionPanel');

interface Props {
    id?: string;
    title?: React.ReactNode;
    ariaTitle?: string;
    illustration?: React.ReactNode;
    children: ReactNode;
    titleTag?: TitleTag;
    illustrationPlacement?: 'inside' | 'outside';
    titleStyle?: TitleStyle;
    introHeader?: React.ReactNode;
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
    introHeader,
}: Props) => {
    return (
        <SectionOrArticle
            tag={tag}
            tabIndex={-1}
            id={id}
            aria-label={ariaTitle}
            className={bem.classNames(
                bem.block,
                bem.modifierConditional(
                    'illustrationOutside',
                    illustration !== undefined && illustrationPlacement === 'outside'
                )
            )}>
            <PanelBase className={bem.element('panel')}>
                {illustration && (
                    <div className={bem.element('illustration')}>
                        <CircleIllustration backgroundColor="#C1B5D0" illustration={illustration} />
                    </div>
                )}
                {(introHeader || title) && (
                    <div className={bem.element('headerAndTitle')}>
                        {introHeader && <div>{introHeader}</div>}
                        {title && (
                            <div className={bem.element('title')}>
                                <Title tag={titleTag} titleStyle={titleStyle}>
                                    {title}
                                </Title>
                            </div>
                        )}
                    </div>
                )}
                {children}
            </PanelBase>
        </SectionOrArticle>
    );
};

export default SectionPanel;

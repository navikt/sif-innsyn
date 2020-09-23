import React, { createElement } from 'react';
import bemUtils from '../../../utils/bemUtils';
import './title.less';

export type TitleStyle = 'normal' | 'centerlined' | 'underlined';
export type TitleTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface Props {
    children: React.ReactNode;
    tag?: TitleTag;
    titleStyle?: TitleStyle;
    titleType?: 'sidetittel' | 'systemtittel' | 'innholdstittel' | 'undertittel' | 'ingress' | 'element';
}

const bem = bemUtils('title');

const Title: React.FunctionComponent<Props> = ({
    children,
    tag = 'h2',
    titleStyle = 'normal',
    titleType = 'systemtittel',
}: Props) => {
    return createElement(
        tag,
        {
            className: bem.classNames(bem.block, bem.modifier(titleStyle), `typo-${titleType}`),
        },
        <span>{children}</span>
    );
};

export default Title;

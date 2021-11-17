import bemUtils from '../../utils/bemUtils';
import React, { Children } from 'react';
import './frontpagePanelWrapper.less';
import Title from '../elements/title/Title';

interface Props {
    maxColumns?: number;
    title: string;
}

const bem = bemUtils('frontpagePanelWrapper');

const FrontpagePanelWrapper: React.FC<Props> = ({ maxColumns = 3, title, children }) => {
    return (
        <>
            <div className={bem.element('title')}>
                <Title tag={'h1'} titleStyle={'normal'}>
                    {title}
                </Title>
            </div>

            <div className={bem.classNames(bem.block, bem.modifier(`columns-${maxColumns}`))}>
                {Children.map(children, (child) => (
                    <div className={bem.element('item')}>{child}</div>
                ))}
            </div>
        </>
    );
};
export default FrontpagePanelWrapper;

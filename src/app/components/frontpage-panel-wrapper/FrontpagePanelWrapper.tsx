import { Systemtittel } from 'nav-frontend-typografi';
import React, { Children } from 'react';
import bemUtils from '../../utils/bemUtils';
import './frontpagePanelWrapper.less';

interface Props {
    maxColumns?: number;
    title?: string;
}

const bem = bemUtils('frontpagePanelWrapper');

const FrontpagePanelWrapper: React.FC<Props> = ({ maxColumns = 3, title = undefined, children }) => {
    return (
        <>
            {title && (
                <div className={bem.element('title')}>
                    <Systemtittel>{title}</Systemtittel>
                </div>
            )}

            <div className={bem.classNames(bem.block, bem.modifier(`columns-${maxColumns}`))}>
                {Children.map(children, (child) => (
                    <div className={bem.element('item')}>{child}</div>
                ))}
            </div>
        </>
    );
};
export default FrontpagePanelWrapper;

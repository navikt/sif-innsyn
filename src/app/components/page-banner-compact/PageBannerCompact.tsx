import React from 'react';
import bemUtils from '../../utils/bemUtils';
import './pageBannerCompact.less';

interface Props {
    title: string;
}

const bem = bemUtils('pageBannerCompact');

const PageBannerCompact = ({ title }: Props) => {
    return (
        <div className={bem.classNames(bem.block)}>
            <span className={bem.element('title')}>{title}</span>
        </div>
    );
};

export default PageBannerCompact;

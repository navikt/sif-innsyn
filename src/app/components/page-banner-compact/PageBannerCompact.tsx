import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import './pageBannerCompact.less';
import bemUtils from '../../utils/bemUtils';

interface Props {
    title: string;
}

const bem = bemUtils('pageBannerCompact');

const PageBannerCompact = ({ title }: Props) => {
    return (
        <header className={bem.classNames(bem.block)}>
            <Sidetittel className={bem.element('title')}>{title}</Sidetittel>
        </header>
    );
};

export default PageBannerCompact;

import React from 'react';
import Lenke from 'nav-frontend-lenker';
import getLenker from '../../lenker';
import bemUtils from '../../utils/bemUtils';
import MinSideIconSvg from './MinSideIconSvg';
import './minSideBreadcrumbs.less';

const bem = bemUtils('minSideBreadcrumbs');

const MinSideBreadcrumbs = () => (
    <div className={bem.block}>
        <div className={bem.element('icon')} role="presentation" aria-hidden={true}>
            <MinSideIconSvg />
        </div>
        <Lenke href={getLenker().minside}>Min side</Lenke> <span className={bem.element('separator')}>/</span> Dine
        pleiepenger
    </div>
);

export default MinSideBreadcrumbs;

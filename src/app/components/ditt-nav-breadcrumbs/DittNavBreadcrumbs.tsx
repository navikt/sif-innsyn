import React from 'react';
import Lenke from 'nav-frontend-lenker';
import getLenker from '../../lenker';
import bemUtils from '../../utils/bemUtils';
import DittNavIconSvg from './DittNavnIconSvg';
import './dittNavBreadcrumbs.less';

const bem = bemUtils('dittNavBreadcrumbs');

const DittNavBreadcrumbs = () => (
    <div className={bem.block}>
        <div className={bem.element('icon')} role="presentation" aria-hidden={true}>
            <DittNavIconSvg />
        </div>
        <Lenke href={getLenker().dittNAV}>Ditt NAV</Lenke> <span className={bem.element('separator')}>/</span> Dine
        pleiepenger
    </div>
);

export default DittNavBreadcrumbs;

import React from 'react';
import Lenke from 'nav-frontend-lenker';
import bemUtils from '../../utils/bemUtils';
import DittNavnIconSvg from './DittNavnIconSvg';
import './dittNavBreadcrumbs.less';
import getLenker from '../../lenker';

const bem = bemUtils('dittNavBreadcrumbs');

const DittNavBreadcrumbs = () => (
    <div className={bem.block}>
        <div className={bem.element('icon')} role="presentation" aria-hidden={true}>
            <DittNavnIconSvg />
        </div>
        <Lenke href={getLenker().dittNAV}>Ditt NAV</Lenke> <span className={bem.element('separator')}>/</span> Sykdom i
        familien
    </div>
);

export default DittNavBreadcrumbs;

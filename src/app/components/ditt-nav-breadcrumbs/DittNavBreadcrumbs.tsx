import React from 'react';
import Lenke from 'nav-frontend-lenker';
import DittNavnIconSvg from './DittNavnIconSvg';
import './dittNavBreadcrumbs.less';
import bemUtils from '../../utils/bemUtils';

const bem = bemUtils('dittNavBreadcrumbs');

const DittNavBreadcrumbs = () => (
    <div className={bem.block}>
        <div className={bem.element('icon')} role="presentation" aria-hidden={true}>
            <DittNavnIconSvg />
        </div>
        <Lenke href="https://www.nav.no/person/dittnav/">Ditt NAV</Lenke>{' '}
        <span className={bem.element('separator')}>/</span> Sykdom i familien
    </div>
);

export default DittNavBreadcrumbs;

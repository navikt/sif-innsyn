import React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Undertittel } from 'nav-frontend-typografi';
import bemUtils from '../../utils/bemUtils';
import './lenkepanelUtenIkon.less';

interface Props {
    href: string;
    tittel: string;
    tekst: string;
}

const bem = bemUtils('lenkepanelUtenIkon');

const LenkepanelUtenIkon = ({ tittel, tekst, href }: Props) => {
    return (
        <LenkepanelBase href={href} border>
            <div className={bem.element('content')}>
                <Undertittel className="lenkepanel__heading">{tittel}</Undertittel>
                <span className={bem.element('tekst')}>{tekst}</span>
            </div>
        </LenkepanelBase>
    );
};
export default LenkepanelUtenIkon;

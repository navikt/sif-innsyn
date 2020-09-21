import React from 'react';
import { Link } from 'react-router-dom';
import { HoyreChevron } from 'nav-frontend-chevron';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Undertittel } from 'nav-frontend-typografi';
import bemUtils from '../../utils/bemUtils';
import './lenkepanelMedIkon.less';

interface Props {
    href: string;
    tittel: React.ReactNode;
    ikon: React.ReactNode;
}

const bem = bemUtils('lenkepanelMedIkon');

const LenkepanelMedIkon = ({ tittel, href, ikon }: Props) => (
    <LenkepanelBase
        href={'#'}
        border={true}
        className={bem.block}
        linkCreator={(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
            <Link to={href} {...props}>
                <div className={bem.element('innhold')}>
                    <div className={bem.element('ikon')}>{ikon}</div>
                    <Undertittel tag={'h3'} className="lenkepanel_heading">
                        {tittel}
                    </Undertittel>
                </div>
                <HoyreChevron />
            </Link>
        )}
    />
);

export default LenkepanelMedIkon;

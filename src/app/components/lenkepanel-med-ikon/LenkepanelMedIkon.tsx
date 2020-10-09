import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { HoyreChevron } from 'nav-frontend-chevron';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import bemUtils from '../../utils/bemUtils';
import intlHelper from '../../utils/intlUtils';
import AriaAlternative from '../aria/AriaAlternative';
import './lenkepanelMedIkon.less';

interface Props {
    href: string;
    tittel: React.ReactNode;
    ikon: React.ReactNode;
}

const bem = bemUtils('lenkepanelMedIkon');

const LenkepanelMedIkon = ({ tittel, href, ikon }: Props) => {
    const intl = useIntl();
    return (
        <LenkepanelBase
            href={'#'}
            border={true}
            className={bem.block}
            linkCreator={(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
                <Link to={href} {...props}>
                    <div className={bem.element('innhold')}>
                        <div className={bem.element('ikon')}>{ikon}</div>
                        <div className={bem.element('title')}>
                            <AriaAlternative
                                visibleText={tittel}
                                ariaText={
                                    <>
                                        {intlHelper(intl, 'lenkepanel.aria.gåTil')} {tittel}
                                    </>
                                }
                            />
                        </div>
                    </div>
                    <HoyreChevron />
                </Link>
            )}>
            {' '}
        </LenkepanelBase>
    );
};
export default LenkepanelMedIkon;

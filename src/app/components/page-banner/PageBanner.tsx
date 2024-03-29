import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import bemUtils from '../../utils/bemUtils';
import './pageBanner.less';
import MinSideBreadcrumbs from '../min-side-breadcrumbs/MinSideBreadcrumbs';

interface Props {
    title: React.ReactNode;
    illustration?: React.ReactNode;
    footer?: React.ReactNode;
    wide?: boolean;
    children?: React.ReactNode;
}

const bem = bemUtils('pageBanner');

const PageBanner: React.FC<Props> = ({ title, illustration, footer, children, wide }: Props) => {
    return (
        <div className={bem.classNames(bem.block, bem.modifierConditional('wide', wide))}>
            <div className={bem.element('borderBox')}>
                <div className={bem.element('contentWrapper')}>
                    <div className={bem.element('minSideBreadcrumbs')}>
                        <MinSideBreadcrumbs />
                    </div>
                </div>
                <div className={bem.element('contentWrapper')}>
                    <div className={bem.element('text')}>
                        <Sidetittel className={bem.element('title')}>{title}</Sidetittel>
                        {children && <div className={bem.element('content')}>{children}</div>}
                    </div>
                    {illustration && (
                        <div className={bem.element('illustration')} role="presentation" aria-hidden={true}>
                            {illustration}
                        </div>
                    )}
                </div>
            </div>
            {footer && (
                <div className={bem.element('footer')}>
                    <div className={bem.element('contentWrapper')}>{footer}</div>
                </div>
            )}
        </div>
    );
};

export default PageBanner;

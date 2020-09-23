import React from 'react';
import { Link } from 'react-router-dom';
import NavFrontendChevron from 'nav-frontend-chevron';
// import NavFrontendChevron from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';
import { RouteConfig } from '../../config/routeConfig';
import getLenker from '../../lenker';
import bemUtils from '../../utils/bemUtils';
import useWindowSize from '../../utils/useWindowSize';
import DittNavIconSvg from '../ditt-nav-breadcrumbs/DittNavnIconSvg';
import './breadcrumbs.less';

const bem = bemUtils('breadcrumbs');

export interface Breadcrumb {
    href?: string;
    route?: string;
    title: string;
}

interface OwnProps {
    currentPageTitle: string;
    crumbs?: Breadcrumb[];
}

type Props = OwnProps;

const Crumb = ({ title, href, route, isCurrent }: Breadcrumb & { isCurrent?: boolean }) => (
    <div className={bem.element('crumb', isCurrent ? 'current' : undefined)}>
        {route && <Link to={route}>{title}</Link>}
        {href && <Lenke href={href}>{title}</Lenke>}
        {!route && !href && <div>{title}</div>}
    </div>
);

const Breadcrumbs = (props: Props) => {
    const { width } = useWindowSize();
    const { currentPageTitle, crumbs = [] } = props;
    const frontpageUrl = '/';

    let crumbsToRender: Array<Breadcrumb> = [];

    if (width && width < 576) {
        crumbsToRender = [
            {
                title: 'Tilbake',
                href: crumbs.length > 0 ? crumbs[crumbs.length - 1].route : undefined,
                route: crumbs.length === 0 ? frontpageUrl : undefined,
            },
        ];
    } else {
        crumbsToRender = [
            {
                title: 'Ditt NAV',
                href: getLenker().dittNAV,
            },
            {
                title: 'Sykdom i familien',
                route: RouteConfig.OVERSIKT,
            },
            ...crumbs,
            { title: currentPageTitle },
        ];
    }
    return (
        <nav aria-label="Du er her" className={bem.block}>
            {crumbsToRender.length > 1 && <DittNavIconSvg key={'dittNavIkon'} />}
            {crumbsToRender.map((c, idx) => (
                <>
                    <span role="presentation" aria-hidden={true}>
                        <NavFrontendChevron type="høyre" />
                    </span>
                    <Crumb key={idx} {...c} isCurrent={idx === crumbsToRender.length - 1} />
                </>
            ))}
        </nav>
    );
};

export default Breadcrumbs;

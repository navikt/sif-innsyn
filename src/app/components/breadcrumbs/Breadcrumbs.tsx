import React from 'react';
import { Link } from 'react-router-dom';
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

const crumbBem = bem.child('crumb');
const Crumb = ({
    title,
    href,
    route,
    isCurrent,
    noChevron,
}: Breadcrumb & { isCurrent?: boolean; noChevron?: boolean }) => {
    return (
        <span
            className={crumbBem.classNames(
                crumbBem.block,
                crumbBem.modifierConditional('current', isCurrent),
                crumbBem.modifierConditional('noChevron', noChevron)
            )}>
            {route && <Link to={route}>{title}</Link>}
            {href && <Lenke href={href}>{title}</Lenke>}
            {!route && !href && <span>{title}</span>}
        </span>
    );
};

const Breadcrumbs = (props: Props) => {
    const { width } = useWindowSize();
    const { currentPageTitle, crumbs = [] } = props;
    const frontpageUrl = '/';

    let crumbsToRender: Array<Breadcrumb> = [];

    if (width && width < 1024) {
        if (crumbs.length > 0) {
            crumbsToRender = [
                {
                    ...crumbs[crumbs.length - 1],
                    title: 'Tilbake',
                },
            ];
        } else {
            crumbsToRender = [
                {
                    title: 'Tilbake',
                    route: frontpageUrl,
                },
            ];
        }
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
        <nav aria-label="Brødsmuler" className={bem.block}>
            {crumbsToRender.length > 1 && (
                <span style={{ marginRight: '.5rem', lineHeight: 0 }}>
                    <DittNavIconSvg key={'dittNavIkon'} />
                </span>
            )}
            {crumbsToRender.length === 1 && <Crumb {...crumbsToRender[0]} />}
            {crumbsToRender.length > 1 &&
                crumbsToRender.map((c, idx) => (
                    <Crumb key={idx} {...c} isCurrent={idx === crumbsToRender.length - 1} noChevron={idx === 0} />
                ))}
        </nav>
    );
};

export default Breadcrumbs;

import React from 'react';
import { Link } from 'react-router-dom';
import NavFrontendChevron from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';
import { RouteConfig } from '../../config/routeConfig';
import getLenker from '../../lenker';
import bemUtils from '../../utils/bemUtils';
// import { getEnvironmentVariable } from '../../utils/envUtils';
import useWindowSize from '../../utils/useWindowSize';
import DittNavnIconSvg from '../ditt-nav-breadcrumbs/DittNavnIconSvg';
import './breadcrumbs.less';

const cls = bemUtils('breadcrumbs');

export interface Breadcrumb {
    route: string;
    title: string;
}

interface OwnProps {
    currentPageTitle: string;
    crumbs?: Breadcrumb[];
}

type Props = OwnProps;

const Breadcrumbs = (props: Props) => {
    const { width } = useWindowSize();
    const { currentPageTitle, crumbs = [] } = props;
    const frontpageUrl = '/'; //getEnvironmentVariable('PUBLIC_PATH');

    const crumbsToRender: React.ReactNode[] = [];
    const parentPageUrl = crumbs.length > 0 ? crumbs[crumbs.length - 1].route : frontpageUrl;

    if (width && width < 576) {
        crumbsToRender.push(
            <div key="chevron" aria-hidden={true}>
                <NavFrontendChevron type="venstre" />
            </div>
        );
        crumbsToRender.push(
            <div key="forrige-side" className={cls.element('item')}>
                <Link to={parentPageUrl}>Tilbake</Link>
            </div>
        );
    } else {
        crumbsToRender.push(<DittNavnIconSvg key={'dittNavIkon'} />);
        crumbsToRender.push(
            <div key="dittNAV" className={cls.element('item')}>
                <Lenke href={getLenker().dittNAV} title="Gå til ditt nav forsiden">
                    Ditt NAV
                </Lenke>
            </div>
        );
        crumbsToRender.push(
            <div key={`chevron_page`} aria-hidden={true}>
                <NavFrontendChevron type="høyre" />
            </div>
        );
        crumbsToRender.push(
            <div key="oversikt" className={cls.element('item')}>
                <Link to={RouteConfig.OVERSIKT}>Sykdom i familien</Link>
            </div>
        );
        crumbs.forEach((crumb) => {
            crumbsToRender.push(
                <div key={`chevron_page_${crumb.route}`} aria-hidden={true}>
                    <NavFrontendChevron type="høyre" />
                </div>
            );
            crumbsToRender.push(
                <Link key={crumb.route} to={crumb.route}>
                    {crumb.title}
                </Link>
            );
        });
        crumbsToRender.push(
            <div key={`chevron_page_2`} aria-hidden={true}>
                <NavFrontendChevron type="høyre" />
            </div>
        );
        crumbsToRender.push(<div key={`currentPage`}>{currentPageTitle}</div>);
    }
    return (
        <nav aria-label="Du er her" className={cls.block}>
            {crumbsToRender}
        </nav>
    );
};

export default Breadcrumbs;

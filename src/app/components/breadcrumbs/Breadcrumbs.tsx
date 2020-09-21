import React from 'react';
import NavFrontendChevron from 'nav-frontend-chevron';
import './breadcrumbs.less';
import useWindowSize from '../../utils/useWindowSize';
import bemUtils from '../../utils/bemUtils';
import Lenke from 'nav-frontend-lenker';
import { getEnvironmentVariable } from '../../utils/envUtils';
import getLenker from '../../lenker';
import DittNavnIconSvg from '../ditt-nav-breadcrumbs/DittNavnIconSvg';

const cls = bemUtils('breadcrumbs');

interface OwnProps {
    title: string;
}

type Props = OwnProps;

const Breadcrumbs = (props: Props) => {
    const { width } = useWindowSize();
    const { title } = props;
    const frontpageUrl = getEnvironmentVariable('PUBLIC_PATH');

    const crumbs: React.ReactNode[] = [];

    if (width && width < 576) {
        crumbs.push(
            <div key="chevron" aria-hidden={true}>
                <NavFrontendChevron type="venstre" />
            </div>
        );
        crumbs.push(
            <div key="forrige-side" className={cls.element('item')}>
                <Lenke href={frontpageUrl} title="Gå til forrige side">
                    Oversikt
                </Lenke>
            </div>
        );
    } else {
        crumbs.push(<DittNavnIconSvg key={'dittNavIkon'} />);
        crumbs.push(
            <div key="dittNAV" className={cls.element('item')}>
                <Lenke href={getLenker().dittNAV} title="Gå til ditt nav forsiden">
                    Ditt NAV
                </Lenke>
            </div>
        );
        crumbs.push(
            <div key={`chevron_page`} aria-hidden={true}>
                <NavFrontendChevron type="høyre" />
            </div>
        );
        crumbs.push(
            <div key="oversikt" className={cls.element('item')}>
                <Lenke href={frontpageUrl} title="Gå til din oversikt under sykdom i familien">
                    Sykdom i familien
                </Lenke>
            </div>
        );
        crumbs.push(
            <div key={`chevron_page_2`} aria-hidden={true}>
                <NavFrontendChevron type="høyre" />
            </div>
        );
        crumbs.push(<div key={`currentPage`}>{title}</div>);
    }
    return (
        <nav aria-label="Du er her" className={cls.block}>
            {crumbs}
        </nav>
    );
};

export default Breadcrumbs;

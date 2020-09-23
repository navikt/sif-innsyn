import React from 'react';
import { Link } from 'react-router-dom';
import { HoyreChevron } from 'nav-frontend-chevron';
import Etikett from 'nav-frontend-etiketter';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Undertittel } from 'nav-frontend-typografi';
import { RouteConfig } from '../../config/routeConfig';
import { Søknad, Søknadsstatus } from '../../types/apiTypes/søknadTypes';
import bemUtils from '../../utils/bemUtils';
import { getSøknadTitle } from '../../utils/soknadUtils';
import SoknadInfo from '../soknad-info/SoknadInfo';
import './soknadListElement.less';

interface Props {
    søknad: Søknad;
}

const bem = bemUtils('soknadListElement');

const SøknadEtikett = ({ søknad }: { søknad: Søknad }) => {
    switch (søknad.status) {
        case Søknadsstatus.UNDER_BEHANDLING:
            return (
                <Etikett type="fokus" mini={true}>
                    Status: Under behandling
                </Etikett>
            );
        case Søknadsstatus.FERDIG_BEHANDLET:
            return (
                <Etikett type="suksess" mini={true}>
                    Status: Ferdig behandlet
                </Etikett>
            );
        case Søknadsstatus.MOTTATT:
            return (
                <Etikett type="info" mini={true}>
                    Status: Mottatt
                </Etikett>
            );
    }
};

const showStatus = false;

const SoknadListElement = ({ søknad }: Props) => {
    const href = `${RouteConfig.DINE_PLEIEPENGER}/${søknad.søknadId}`;
    return (
        <LenkepanelBase
            href="#"
            border={true}
            className={bem.classNames(bem.block)}
            linkCreator={(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
                <Link to={href} {...props}>
                    <div className={bem.element('content')}>
                        <Undertittel tag="h3">{getSøknadTitle(søknad)}</Undertittel>
                        <SoknadInfo søknad={søknad} />
                    </div>
                    {showStatus && (
                        <div className={bem.element('status')}>
                            <SøknadEtikett søknad={søknad} />
                        </div>
                    )}
                    <HoyreChevron />
                </Link>
            )}>
            {' '}
        </LenkepanelBase>
    );
};

export default SoknadListElement;

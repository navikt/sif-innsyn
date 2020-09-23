import React from 'react';
import Etikett from 'nav-frontend-etiketter';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Undertittel } from 'nav-frontend-typografi';
import { Søknad, Søknadsstatus } from '../../types/apiTypes/søknadTypes';
import bemUtils from '../../utils/bemUtils';
import { getSøknadTitle } from '../../utils/soknadUtils';
import PrettyDate from '../pretty-date/PrettyDate';
import './soknadListElement.less';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Link } from 'react-router-dom';
import { RouteConfig } from '../../config/routeConfig';

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

const Soknadstatus = ({ søknad }: Props) => {
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
                        <div className={bem.element('mottatt')}>
                            Mottatt <PrettyDate date={søknad.opprettet} format="dateAndTime" />
                        </div>
                        {søknad.søknad.fraOgMed && søknad.søknad.tilOgMed && (
                            <div className={bem.element('detaljer')}>
                                Gjelder perioden <PrettyDate date={søknad.søknad.fraOgMed} /> -{' '}
                                <PrettyDate date={søknad.søknad.tilOgMed} />
                            </div>
                        )}
                        {søknad.søknad.beskrivelse && (
                            <div className={bem.element('detaljer')}>
                                Ettersending gjelder: <q>{søknad.søknad.beskrivelse}</q> ...
                            </div>
                        )}
                    </div>
                    {showStatus && (
                        <div className={bem.element('status')}>
                            <SøknadEtikett søknad={søknad} />
                        </div>
                    )}{' '}
                    <HoyreChevron />
                </Link>
            )}>
            {' '}
        </LenkepanelBase>
    );
};

export default Soknadstatus;

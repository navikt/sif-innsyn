import React from 'react';
import Etikett from 'nav-frontend-etiketter';
import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import { Søknad, Søknadsstatus, Søknadstype } from '../../types/apiTypes/søknadTypes';
import bemUtils from '../../utils/bemUtils';
import PrettyDate from '../pretty-date/PrettyDate';
import './soknadstatus.less';

function getSøknadTitle(søknad: Søknad) {
    switch (søknad.søknadstype) {
        case Søknadstype.PP_SYKT_BARN:
            return 'Søknad om pleiepenger for sykt barn';
        case Søknadstype.PP_ETTERSENDING:
            return 'Melding om ettersending for pleiepenger';
        case Søknadstype.OMD_OVERFØRING:
            return 'Søknad om overføring av omsorgsdager';
        case Søknadstype.OMP_UTBETALING_SNF:
            return 'Søknad om utbetaling av omsorgspenger for selvstendig næringsdrivende og frilans';
        case Søknadstype.OMP_UTBETALING_ARBEIDSTAKER:
            return 'Søknad om utbetaling av omsorgspenger for arbeidstakere';
        case Søknadstype.OMP_ETTERSENDING:
            return 'Melding om ettersending for omsorgspenger';
        case Søknadstype.OMP_UTVIDET_RETT:
            return 'Søknad om utvidet rett av omsorgspenger';
        case Søknadstype.OPPLÆRINGSPENGER:
            return 'Søknad om opplæringspenger';
        case Søknadstype.PP_NÆRSTÅENDE:
            return 'Søknad om pleiepenger nærstående';
    }
}
interface Props {
    søknad: Søknad;
}

const bem = bemUtils('soknadstatus');

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
    return (
        <Panel border className={bem.classNames(bem.block)}>
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
            )}
        </Panel>
    );
};

export default Soknadstatus;

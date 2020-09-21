import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import { Søknad, Søknadsstatus, Søknadstype } from '../../types/apiTypes/søknadTypes';
import bemUtils from '../../utils/bemUtils';
import PrettyDate from '../pretty-date/PrettyDate';
import './soknadstatus.less';
import './SoknadstatusinfoComponent.module.less';

const statusFarge = (søknad: Søknad) => {
    switch (søknad.status) {
        case Søknadsstatus.MOTTATT:
            return 'status-mottatt';
        case Søknadsstatus.UNDER_BEHANDLING:
            return 'status-under-behandling';
        case Søknadsstatus.FERDIG_BEHANDLET:
            return 'status-ferdig-behandlet';
    }
};

// function formaterDate(dateTime: string | null) {
//     return dateTime == null ? '' : moment(dateTime).format('LL');
// }

// function formaterDateTime(dateTime: string | null) {
//     return dateTime == null ? '' : moment(dateTime).format('LLLL');
// }

function getSøknadTitle(søknad: Søknad) {
    switch (søknad.søknadstype) {
        case Søknadstype.PP_SYKT_BARN:
            return 'Søknad om Pleiepenger for Sykt barn';
        case Søknadstype.PP_ETTERSENDING:
            return 'Søknad om ettersending for pleiepenger';
        case Søknadstype.OMD_OVERFØRING:
            return 'Søknad om overføring av omsorgsdager';
        case Søknadstype.OMP_UTBETALING_SNF:
            return 'Søknad om utbetaling av omsorgspenger for selvstendig næringsdrivende og frilans';
        case Søknadstype.OMP_UTBETALING_ARBEIDSTAKER:
            return 'Søknad om utbetaling av omsorgspenger for arbeidstakere';
        case Søknadstype.OMP_ETTERSENDING:
            return 'Søknad om ettersending for omsorgspenger';
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

const Soknadstatus: React.FC<Props> = ({ søknad }: Props) => {
    return (
        <Panel border className={bem.classNames(bem.block, bem.modifier(statusFarge(søknad)))}>
            <div className={bem.element('content')}>
                <Undertittel tag="h3">{getSøknadTitle(søknad)}</Undertittel>
                <div style={{ marginTop: '.25rem' }}>
                    Mottatt <PrettyDate date={søknad.opprettet} format="dateAndTime" />
                    <br />
                    Gjelder perioden <PrettyDate date={søknad.søknad.fraOgMed} /> -{' '}
                    <PrettyDate date={søknad.søknad.tilOgMed} />
                </div>
            </div>
        </Panel>
    );
};

export default Soknadstatus;

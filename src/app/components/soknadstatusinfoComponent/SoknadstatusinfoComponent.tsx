import React from 'react';
import './SoknadstatusinfoComponent.module.less';
import { Søknad, Søknadsstatus, Søknadstype } from '../../types/apiTypes/søknadTypes';
import moment from 'moment';
import { Systemtittel, Undertekst } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import { FilIkon } from '../../svg/FellesIkoner';
import Panel from 'nav-frontend-paneler';

interface Props {
    søknad: Søknad;
}

const SoknadstatusinfoComponent: React.FC<Props> = ({ søknad }: Props) => {
    return (
        <div>
            <Panel border className={`mb-1 ${statusFarge(søknad)}`}>
                <Row className={'lp-1'}>
                    <Column md={'1'}>
                        <div className={'mt-1'}>
                            <FilIkon />
                        </div>
                    </Column>
                    <Column md={'11'}>
                        <Systemtittel>{formaterSøknadType(søknad)}</Systemtittel>
                        <Undertekst>
                            Gjelder perioden {formaterDate(søknad.søknad.fraOgMed)} -{' '}
                            {formaterDate(søknad.søknad.tilOgMed)}
                        </Undertekst>
                        <Undertekst>Mottatt {formaterDateTime(søknad.søknad.mottatt)}</Undertekst>
                    </Column>
                </Row>
            </Panel>
        </div>
    );
};

function formaterSøknadType(søknad: Søknad) {
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
    }
}

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

function formaterDate(dateTime: string | null) {
    moment.locale('NO');
    return dateTime == null ? '' : moment(dateTime).format('LL');
}

function formaterDateTime(dateTime: string | null) {
    moment.locale('NO');
    return dateTime == null ? '' : moment(dateTime).format('LLLL');
}

export default SoknadstatusinfoComponent;

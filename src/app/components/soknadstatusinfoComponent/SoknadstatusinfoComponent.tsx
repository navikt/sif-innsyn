import React from 'react';
import './SoknadstatusinfoComponent.module.less';
import { Søknad, Søknadsstatus, Søknadstype } from '../../types/apiTypes/søknadTypes';
import moment from 'moment';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Ingress, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import Lenke from 'nav-frontend-lenker';
import AttachmentIkon from '../../svg/FellesIkoner';

interface Props {
    søknad: Søknad;
}

const SoknadstatusinfoComponent: React.FC<Props> = ({ søknad }: Props) => {
    return (
        <div>
            <Ekspanderbartpanel
                //key={index}
                tittel={
                    <Undertittel>
                        Status: {formaterStatus(søknad)} {formaterDateTime(søknad)}
                    </Undertittel>
                }
                className={`mb-1 ${statusFarge(søknad)}`}
                border>
                <Row className={'lp-1'}>
                    <Column md={'8'}>
                        <Row>
                            <Systemtittel>{formaterSøknadType(søknad)}</Systemtittel>
                            <Undertittel>Sakstatus:</Undertittel>
                            <Ingress>
                                Sakstatus: Søknaden din er under behandling Du vil få beskjed når statusen endrer seg
                            </Ingress>
                        </Row>
                        <Row className={'mt-2-5'}>
                            <Undertittel>Søknad mottatt: {søknad.søknad.mottatt}</Undertittel>
                            <Ingress>
                                Søker om periode: {søknad.søknad.fraOgMed} - {søknad.søknad.tilOgMed}
                            </Ingress>
                        </Row>
                    </Column>
                    <Column md={'4'}>
                        <Ingress className={'mb-1'}>
                            <Lenke href="#">
                                <AttachmentIkon />
                                <span>Søknad</span>
                            </Lenke>
                        </Ingress>

                        <Ingress className={'mb-1'}>
                            <Lenke href="#">
                                <AttachmentIkon />
                                <span>Inntektsmelding</span>
                            </Lenke>
                        </Ingress>

                        <Ingress className={'mb-1'}>
                            <Lenke href="#">
                                <AttachmentIkon />
                                <span>Legeerklæring</span>
                            </Lenke>
                        </Ingress>
                    </Column>
                </Row>
            </Ekspanderbartpanel>
        </div>
    );
};

function formaterSøknadType(søknad: Søknad) {
    switch (søknad.søknadstype) {
        case Søknadstype.PP_SYKT_BARN:
            return 'Pleiepenger - Sykt barn';
        case Søknadstype.PP_ETTERSENDING:
            return 'Pleiepenger - Ettersending';
        case Søknadstype.OMD_OVERFØRING:
            return 'Omsorgsdager - Overføring';
        case Søknadstype.OMP_UTBETALING_SNF:
            return 'Omsorgspengerutbetaling - Selvstendig næringsdrivende og frilans';
        case Søknadstype.OMP_UTBETALING_ARBEIDSTAKER:
            return 'Omsorgspengerutbetaling - Arbeidstaker';
        case Søknadstype.OMP_ETTERSENDING:
            return 'Omsorgspenger - Ettersending';
        case Søknadstype.OMP_UTVIDET_RETT:
            return 'Omsorgspenger - Utivet rett';
    }
}

const formaterStatus = (søknad: Søknad) => {
    switch (søknad.status) {
        case Søknadsstatus.MOTTATT:
            return 'Mottatt';
        case Søknadsstatus.UNDER_BEHANDLING:
            return 'Under behandling';
        case Søknadsstatus.FERDIG_BEHANDLET:
            return 'Ferdig behandlet';
    }
};

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

function formaterDateTime(søknad: Søknad) {
    return moment(søknad.opprettet).format('DD.MM.YYYY');
}

export default SoknadstatusinfoComponent;

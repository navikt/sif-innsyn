import React from 'react';
import './SoknadstatusinfoComponent.module.less';
import { Søknad, Søknadsstatus, Søknadstype } from '../../types/apiTypes/søknadTypes';
import moment from 'moment';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Ingress, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import { AttachmentIkon } from '../../svg/FellesIkoner';
import { axiosGetSøknadDocument } from '../../api/api';
import { AxiosResponse } from 'axios';
import Lenke from 'nav-frontend-lenker';
import { ResourceType } from '../../types/resourceTypes';

const fileDownload = require('js-file-download');

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
                        {formaterSøknadType(søknad)}, {formaterStatus(søknad)}: {formaterDateTime(søknad.opprettet)}
                    </Undertittel>
                }
                className={`mb-1 ${statusFarge(søknad)}`}
                border>
                <Row className={'lp-1'}>
                    <Column md={'8'}>
                        <Row>
                            <Systemtittel>{formaterSøknadType(søknad)}</Systemtittel>
                            <Ingress>Vi har mottatt søknaden din.</Ingress>
                            <br />
                            <Ingress>
                                Grunnet svært mange søknader inn til NAV kan det dessverre ta lang tid før en
                                saksbehandler ser på søknaden din. Du kan likevel være trygg på at du rykker fremover i
                                køen og blir kontaktet hvis det er behov for mer dokumentasjon.
                            </Ingress>
                        </Row>
                        <Row className={'mt-2-5'}>
                            <Undertittel>Søknad mottatt: {formaterDateTime(søknad.søknad.mottatt)}</Undertittel>
                            <Ingress>
                                Søker om periode: {formaterDateTime(søknad.søknad.fraOgMed)} -{' '}
                                {formaterDateTime(søknad.søknad.tilOgMed)}
                            </Ingress>
                        </Row>
                    </Column>
                    <Column md={'4'}>
                        <Ingress className={'mb-1'}>
                            <Lenke href={'#'} onClick={() => hentDokument(søknad)}>
                                <AttachmentIkon />
                                <span>Søknad</span>
                            </Lenke>
                        </Ingress>
                    </Column>
                </Row>
            </Ekspanderbartpanel>
        </div>
    );
};

const hentDokument = (søknad: Søknad): Promise<void | AxiosResponse<Blob>> => {
    return axiosGetSøknadDocument<Blob>(ResourceType.SØKNAD, søknad.søknadId, ResourceType.DOKUMENT)
        .then((response) => {
            fileDownload(response.data, 'søknad.pdf');
        })
        .catch((reason) => console.log(reason));
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
            return 'Omsorgspenger - Utvidet rett';
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

function formaterDateTime(dateTime: string | null) {
    return dateTime == null ? '' : moment(dateTime).format('DD.MM.YYYY');
}

export default SoknadstatusinfoComponent;

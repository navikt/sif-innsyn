import * as React from 'react';
import { SøkerApiResponse } from '../../types/apiTypes/søkerTypes';
import ReactJson from 'react-json-view';
import { Søknad, SøknadApiResponse, Søknadsstatus } from '../../types/apiTypes/søknadTypes';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import { getEnvironmentVariable } from '../../utils/envUtils';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Column, Row } from 'nav-frontend-grid';
import { Undertittel, Ingress, Systemtittel } from 'nav-frontend-typografi';
import './PleiepengerView.less';
import Lenke from 'nav-frontend-lenker';
import AttachmentIkon from '../../svg/FellesIkoner';
import moment from 'moment';

interface Props {
    bruker?: SøkerApiResponse;
    søknader?: SøknadApiResponse;
}
const PleiepengerView: React.FC<Props> = ({ bruker, søknader }: Props) => {
    getEnvironmentVariable('PUBLIC_PATH');

    return (
        <InnsynPage>
            {bruker && (
                <div>
                    Innsyn logged in. Hi {bruker.fornavn} {bruker.etternavn} :)
                    <div>
                        <ReactJson src={bruker} />
                    </div>
                </div>
            )}
            {søknader && (
                <div>
                    <h1>Dine Pleiepenger</h1>

                    <Lesmerpanel intro={<span>Dette kan du forvente av saksgangen</span>} border>
                        <div>
                            <p style={{ marginTop: 0 }}>
                                Du bestemmer selv om du vil bruke sykmeldingen eller avbryte den. Du kan også jobbe i
                                kombinasjon med sykmelding. Det kommer an på hva sykdommen din tillater og hva det er
                                praktisk mulig å få til på arbeidsplassen.
                            </p>
                            <p>
                                Greit å vite: Arbeidsgiveren har plikt til å legge til rette for at du kan jobbe helt
                                eller delvis selv om du er syk.
                            </p>
                        </div>
                    </Lesmerpanel>

                    <p>Siste status</p>
                    <h3>Dine søknader</h3>
                    <div>
                        {søknader?.map((søknad, index) => {
                            return (
                                <Ekspanderbartpanel
                                    key={index}
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
                                                <Systemtittel>Søknad pleiepenger sykt barn</Systemtittel>
                                                <Undertittel>Sakstatus:</Undertittel>
                                                <Ingress>
                                                    Sakstatus: Søknaden din er under behandling Du vil få beskjed når
                                                    statusen endrer seg
                                                </Ingress>
                                            </Row>
                                            <Row className={'mt-2-5'}>
                                                <Undertittel>Søknad mottatt: {søknad.søknad.mottatt}</Undertittel>
                                                <Ingress>
                                                    Søker om periode: {søknad.søknad.fraOgMed} -{' '}
                                                    {søknad.søknad.tilOgMed}
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
                            );
                        })}
                    </div>
                </div>
            )}
        </InnsynPage>
    );
};

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

export default PleiepengerView;

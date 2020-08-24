import * as React from 'react';
import { SøknadApiResponse } from '../../types/apiTypes/søknadTypes';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import './PleiepengerView.less';
import SoknadstatusinfoComponent from 'app/components/soknadstatusinfoComponent/SoknadstatusinfoComponent';
import { Ingress, Sidetittel, Undertittel } from 'nav-frontend-typografi';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { useHistory } from 'react-router-dom';
import { RouteConfig } from '../../config/routeConfig';

interface Props {
    søknader: SøknadApiResponse;
}

const PleiepengerView: React.FC<Props> = ({ søknader }: Props) => {
    const history = useHistory();
    return (
        <>
            <Tilbakeknapp onClick={() => history.push(RouteConfig.ROOT)}>Tilbake til oversikt</Tilbakeknapp>
            {søknader && (
                <div>
                    <Sidetittel>Dine Pleiepenger</Sidetittel>

                    <Lesmerpanel intro={<Ingress>Dette kan du forvente av saksgangen</Ingress>} border>
                        <div>
                            <Ingress style={{ marginTop: 0 }}>
                                Du bestemmer selv om du vil bruke sykmeldingen eller avbryte den. Du kan også jobbe i
                                kombinasjon med sykmelding. Det kommer an på hva sykdommen din tillater og hva det er
                                praktisk mulig å få til på arbeidsplassen.
                            </Ingress>
                            <Ingress>
                                Greit å vite: Arbeidsgiveren har plikt til å legge til rette for at du kan jobbe helt
                                eller delvis selv om du er syk.
                            </Ingress>
                        </div>
                    </Lesmerpanel>

                    <Undertittel>Dine søknader</Undertittel>
                    <div>
                        {søknader.map((søknad, index) => {
                            return <SoknadstatusinfoComponent key={index} søknad={søknad}></SoknadstatusinfoComponent>;
                        })}
                    </div>
                </div>
            )}
            <Tilbakeknapp onClick={() => history.push(RouteConfig.ROOT)}>Tilbake til oversikt</Tilbakeknapp>
        </>
    );
};

export default PleiepengerView;

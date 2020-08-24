import * as React from 'react';
import { SøknadApiResponse } from '../../types/apiTypes/søknadTypes';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import './OmsorgspengerView.less';
import SoknadstatusinfoComponent from 'app/components/soknadstatusinfoComponent/SoknadstatusinfoComponent';
import { Sidetittel } from 'nav-frontend-typografi';
import { RouteConfig } from '../../config/routeConfig';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { useHistory } from 'react-router-dom';

interface Props {
    søknader: SøknadApiResponse;
}

const OmsorgspengerView: React.FC<Props> = ({ søknader }: Props) => {
    const history = useHistory();
    return (
        <>
            <Tilbakeknapp onClick={() => history.push(RouteConfig.ROOT)}>Tilbake til oversikt</Tilbakeknapp>
            {søknader && (
                <div>
                    <Sidetittel>Dine Omsorgspenger</Sidetittel>

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

                    <h3>Dine søknader</h3>
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

export default OmsorgspengerView;

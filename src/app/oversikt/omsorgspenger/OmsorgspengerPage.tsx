import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import { Ingress, Sidetittel, Undertittel } from 'nav-frontend-typografi';
import Soknadstatus from 'app/components/soknadstatus/Soknadstatus';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import PageBannerCompact from '../../components/page-banner_compact/PageBannerCompact';
import { RouteConfig } from '../../config/routeConfig';
import { Søknad } from '../../types/apiTypes/søknadTypes';

interface Props {
    søknader: Søknad[];
}

const OmsorgspengerPage: React.FC<Props> = ({ søknader }: Props) => {
    const history = useHistory();
    const title = 'Utvidet rett om omsorgspenger';
    return (
        <InnsynPage title={title} topContentRenderer={() => <PageBannerCompact title={title} />}>
            <Tilbakeknapp onClick={() => history.push(RouteConfig.OVERSIKT)}>Tilbake til oversikt</Tilbakeknapp>
            {søknader && (
                <div>
                    <Sidetittel>Dine Omsorgspenger</Sidetittel>

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
                            return <Soknadstatus key={index} søknad={søknad}></Soknadstatus>;
                        })}
                    </div>
                </div>
            )}
            <Tilbakeknapp onClick={() => history.push(RouteConfig.OVERSIKT)}>Tilbake til oversikt</Tilbakeknapp>
        </InnsynPage>
    );
};

export default OmsorgspengerPage;

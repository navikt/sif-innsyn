import * as React from 'react';
import { SøkerApiResponse } from '../../types/apiTypes/søkerTypes';
import ReactJson from 'react-json-view';
import { SøknadApiResponse } from '../../types/apiTypes/søknadTypes';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import { getEnvironmentVariable } from '../../utils/envUtils';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

interface Props {
    bruker?: SøkerApiResponse;
    søknad?: SøknadApiResponse;
}

const PleiepengerView: React.FC<Props> = ({ bruker, søknad }: Props) => {
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
            {søknad && (
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
                        {søknad?.map((value, index) => {
                            return (
                                <Ekspanderbartpanel
                                    key={index}
                                    tittel={`Status: ${value.status.toLowerCase()} - ${value.opprettet}`}
                                    border></Ekspanderbartpanel>
                            );
                        })}
                    </div>
                </div>
            )}
        </InnsynPage>
    );
};

export default PleiepengerView;

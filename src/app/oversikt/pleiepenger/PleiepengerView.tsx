import * as React from 'react';
import { SøkerApiResponse } from '../../types/apiTypes/søkerTypes';
import ReactJson from 'react-json-view';
import { Søknad, SøknadApiResponse, Søknadstype } from '../../types/apiTypes/søknadTypes';
import InnsynPage from '../../components/innsyn-page/InnsynPage';
import { getEnvironmentVariable } from '../../utils/envUtils';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import './PleiepengerView.less';
import SoknadstatusinfoComponent from 'app/components/soknadstatusinfoComponent/SoknadstatusinfoComponent';
import { Sidetittel, Undertittel } from 'nav-frontend-typografi';

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
                    <Sidetittel>Dine Pleiepenger</Sidetittel>

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

                    <Undertittel>Siste status</Undertittel>
                    <h3>Dine søknader</h3>
                    <div>
                        {søknader
                            ?.filter((søknad) => erPleiepenger(søknad))
                            .map((søknad, index) => {
                                return (
                                    <SoknadstatusinfoComponent key={index} søknad={søknad}></SoknadstatusinfoComponent>
                                );
                            })}
                    </div>
                </div>
            )}
        </InnsynPage>
    );
};

const erPleiepenger = (søknad: Søknad) => {
    return søknad.søknadstype == Søknadstype.PP_ETTERSENDING || søknad.søknadstype == Søknadstype.PP_SYKT_BARN;
};

export default PleiepengerView;

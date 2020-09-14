import * as React from 'react';
import { SøknadApiResponse } from '../../types/apiTypes/søknadTypes';
import './PleiepengerView.less';
import SoknadstatusinfoComponent from 'app/components/soknadstatusinfoComponent/SoknadstatusinfoComponent';
import { Ingress, Undertittel} from 'nav-frontend-typografi';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { useHistory } from 'react-router-dom';
import { RouteConfig } from '../../config/routeConfig';
import Panel from 'nav-frontend-paneler';
import AlertStripe from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

interface Props {
    søknader: SøknadApiResponse;
}

const PleiepengerView: React.FC<Props> = ({ søknader }: Props) => {
    const history = useHistory();
    return (
        <>
            <AlertStripe type="info" className={'mt-1'}>
                Denne siden er under utvikling. Foreløpig kan du se søknader du har sendt inn om Pleiepenger for sykt
                barn. Etterhvert vil du kunne se mer informasjon om saken din.
            </AlertStripe>

            <Tilbakeknapp className={'mt-1'} onClick={() => history.push(RouteConfig.ROOT)}>
                Tilbake til oversikt
            </Tilbakeknapp>
            {søknader && (
                <div>
                    <Panel className={'mt-1'}>
                        <Undertittel>Dine søknader</Undertittel>
                        <div>
                            {søknader.map((søknad, index) => {
                                return (
                                    <SoknadstatusinfoComponent key={index} søknad={søknad}></SoknadstatusinfoComponent>
                                );
                            })}
                        </div>

                        <Ekspanderbartpanel tittel={'Har du sendt inn en søknad som du ikke ser her?'}>
                            <Ingress>
                                Det kan ta noen minutter fra du har sendt en digital søknad til den vises her. Du kan
                                sjekke igjen om noen minutter. Hvis du fikk kvittering på at søknaden var innsendt, er
                                den mottatt av NAV selv om den ikke vises her enda.
                            </Ingress>
                            <br />
                            <Ingress>
                                Søknader som er sendt i posten vises ikke her. De vises på en annen saksoversikt (link
                                dit) når søknaden er mottatt og registrert inn. Det tar som regel 2 uker fra en søknad
                                er postlagt til den vises i saksoversikten.
                            </Ingress>
                        </Ekspanderbartpanel>
                    </Panel>

                </div>
            )}
            <Tilbakeknapp className={'mt-1'} onClick={() => history.push(RouteConfig.ROOT)}>
                Tilbake til oversikt
            </Tilbakeknapp>
        </>
    );
};

export default PleiepengerView;

import * as React from 'react';
import { Link } from 'react-router-dom';
import Chevron from 'nav-datovelger/lib/elementer/ChevronSvg';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import Panel from 'nav-frontend-paneler';
import { Ingress, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import Box from '../components/box/Box';
import InformationPoster from '../components/information-poster/InformationPoster';
import { RouteConfig } from '../config/routeConfig';
import { SøknadsIkon } from '../svg/FellesIkoner';
import { SøknadApiResponse, Søknadstype } from '../types/apiTypes/søknadTypes';
import { getEnvironmentVariable } from '../utils/envUtils';
import {
    søknadTypeErOmsorgspenger,
    søknadTypeErOpplæringspenger,
    søknadTypeErPleiepenger,
    søknadTypeErPleiepengerNærstående,
} from '../utils/SøknadUtils';
import './OversiktView.less';

const uniq = require('lodash.uniq');

interface Props {
    søknad: SøknadApiResponse;
}

const OversiktView: React.FC<Props> = ({ søknad }: Props) => {
    const publicPath = getEnvironmentVariable('PUBLIC_PATH');
    const søknadTyper: Søknadstype[] | undefined = uniq(søknad.map((value) => value.søknadstype));
    const harOmsorgspenger = søknadTyper?.filter((type) => søknadTypeErOmsorgspenger(type)).length !== 0;
    const harPleiepenger = søknadTyper?.filter((type) => søknadTypeErPleiepenger(type)).length !== 0;
    const harPleiepengerNærstående =
        søknadTyper?.filter((type) => søknadTypeErPleiepengerNærstående(type)).length !== 0;
    const harOpplæringspenger = søknadTyper?.filter((type) => søknadTypeErOpplæringspenger(type)).length !== 0;

    React.useEffect(() => {
        console.warn(JSON.stringify(window.location.href, null, 4));
    });

    return (
        <>
            {søknad && (
                <div>
                    <div className={'mb-1'}>
                        <InformationPoster>
                            <Box padBottom={'l'}>
                                <Ingress>
                                    Du har kommet til siden Sykdom i familien – din oversikt. Denne siden er under
                                    utvikling, og etter hvert vil du kunne få oversikt, og følge saken din fra du har
                                    sendt en søknad til du får svar fra NAV
                                </Ingress>
                            </Box>
                            <Box padBottom={'l'}>
                                <Ingress>
                                    <strong>Hva kan jeg finne av informasjon om mine saker her?</strong>
                                </Ingress>
                                <Ingress>
                                    Per i dag kan du se:
                                    <ul>
                                        <li>om digital søknad om Pleiepenger for sykt barn er mottatt, og</li>
                                        <li>når den er mottatt</li>
                                    </ul>
                                </Ingress>
                            </Box>
                            <Box>
                                <Ingress>
                                    Hvis du har sendt digital søknad om omsorgspenger, opplæringspenger eller
                                    pleiepenger i livets sluttfase, kan du foreløpig ikke finne noe informasjon om disse
                                    på denne siden. Søknader som er sendt inn per post vises ikke her
                                </Ingress>
                            </Box>
                        </InformationPoster>
                    </div>

                    <Panel>
                        <Systemtittel tag={'h3'}>Dine saker</Systemtittel>
                        <br />
                        {søknad.length == 0 && <Ingress>Vi finner ingen saker fra deg</Ingress>}
                        {harPleiepenger &&
                            genererLenkeBase(`${RouteConfig.DINE_PLEIEPENGER}`, ' Pleiepenger for sykt barn')}
                        {harOmsorgspenger &&
                            genererLenkeBase(`${RouteConfig.DINE_OMSORGSPENGER}`, ' Utvidet rett om omsorgspenger')}
                        {harOpplæringspenger &&
                            genererLenkeBase(`${publicPath}/dine-opplæringspenger`, ' Dine Opplæringspenger')}
                        {harPleiepengerNærstående &&
                            genererLenkeBase(`${publicPath}/dine-pleiepeneger-nærstående`, 'Pleiepenger Nærstående')}

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
        </>
    );
};

const genererLenkeBase = (href: string, tittel: string) => (
    <LenkepanelBase
        href={'#'}
        border
        className={'p0'}
        linkCreator={(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
            <Link to={href} {...props}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        <SøknadsIkon></SøknadsIkon>
                    </div>
                    <div>
                        <Undertittel tag={'h4'} className="lenkepanel_heading ml-1 ">
                            {tittel}
                        </Undertittel>
                    </div>
                </div>
                <Chevron retning={'høyre'} />
            </Link>
        )}>
        <div></div>
    </LenkepanelBase>
);

export default OversiktView;

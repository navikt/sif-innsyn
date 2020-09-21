import * as React from 'react';
import { Link } from 'react-router-dom';
import { HoyreChevron } from 'nav-frontend-chevron';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { Element, Ingress, Undertittel } from 'nav-frontend-typografi';
import InfoManglendeSøknad from '../components/info-manglende-søknad/InfoManglendeSøknad';
import InnsynPage from '../components/innsyn-page/InnsynPage';
import PageBanner from '../components/page-banner/PageBanner';
import SectionPanel from '../components/sectionPanel/SectionPanel';
import { RouteConfig } from '../config/routeConfig';
import { SøknadsIkon } from '../svg/FellesIkoner';
import SvgSykdomIFamilien from '../svg/SvgSykdomIFamilien';
import { Søknad, Søknadstype } from '../types/apiTypes/søknadTypes';
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
    søknader: Søknad[];
}

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
                        <Undertittel tag={'h3'} className="lenkepanel_heading ml-1 ">
                            {tittel}
                        </Undertittel>
                    </div>
                </div>
                <HoyreChevron />
            </Link>
        )}>
        <div></div>
    </LenkepanelBase>
);
const OversiktView: React.FC<Props> = ({ søknader }: Props) => {
    const publicPath = getEnvironmentVariable('PUBLIC_PATH');
    const søknadTyper: Søknadstype[] | undefined = uniq(søknader.map((value) => value.søknadstype));
    const harOmsorgspenger = søknadTyper?.filter((type) => søknadTypeErOmsorgspenger(type)).length !== 0;
    const harPleiepenger = søknadTyper?.filter((type) => søknadTypeErPleiepenger(type)).length !== 0;
    const harPleiepengerNærstående =
        søknadTyper?.filter((type) => søknadTypeErPleiepengerNærstående(type)).length !== 0;
    const harOpplæringspenger = søknadTyper?.filter((type) => søknadTypeErOpplæringspenger(type)).length !== 0;

    React.useEffect(() => {
        console.warn(JSON.stringify(window.location.href, null, 4));
    });

    return (
        <InnsynPage
            title="Sykdom i familien - din oversikt"
            topContentRenderer={() => (
                <PageBanner
                    title={
                        <span>
                            Sykdom i familien
                            <br />
                            &mdash; din oversikt
                        </span>
                    }
                    illustration={<SvgSykdomIFamilien />}
                />
            )}>
            <SectionPanel>
                <p>
                    Du har kommet til siden Sykdom i familien – din oversikt. Denne siden er under utvikling, og etter
                    hvert vil du kunne få oversikt, og følge saken din fra du har sendt en søknad til du får svar fra
                    NAV
                </p>
                <Element tag="h3">Hva kan jeg finne av informasjon om mine saker her?</Element>
                <p>Per i dag kan du se:</p>
                <ul>
                    <li>om digital søknad om Pleiepenger for sykt barn er mottatt, og</li>
                    <li>når den er mottatt</li>
                </ul>
                <p>
                    Hvis du har sendt digital søknad om omsorgspenger, opplæringspenger eller pleiepenger i livets
                    sluttfase, kan du foreløpig ikke finne noe informasjon om disse på denne siden. Søknader som er
                    sendt inn per post vises ikke her
                </p>
            </SectionPanel>

            <SectionPanel title="Dine saker">
                {søknader.length == 0 && <Ingress>Vi finner ingen saker fra deg</Ingress>}
                {harPleiepenger && genererLenkeBase(`${RouteConfig.DINE_PLEIEPENGER}`, ' Pleiepenger for sykt barn')}
                {harOmsorgspenger &&
                    genererLenkeBase(`${RouteConfig.DINE_OMSORGSPENGER}`, ' Utvidet rett om omsorgspenger')}
                {harOpplæringspenger &&
                    genererLenkeBase(`${publicPath}/dine-opplæringspenger`, ' Dine Opplæringspenger')}
                {harPleiepengerNærstående &&
                    genererLenkeBase(`${publicPath}/dine-pleiepeneger-nærstående`, 'Pleiepenger Nærstående')}
                <InfoManglendeSøknad />
            </SectionPanel>
        </InnsynPage>
    );
};

export default OversiktView;

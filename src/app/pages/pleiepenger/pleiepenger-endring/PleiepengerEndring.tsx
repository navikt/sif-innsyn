import Lenke from 'nav-frontend-lenker';
import { Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { useIntl } from 'react-intl';
import { Breadcrumb } from '../../../components/breadcrumbs/Breadcrumbs';
import Box from '../../../components/elements/box/Box';
import InnsynPage from '../../../components/innsyn-page/InnsynPage';
import PageBanner from '../../../components/page-banner/PageBanner';
import SectionPanel from '../../../components/section-panel/SectionPanel';
import { InnsynRouteConfig } from '../../../config/innsynRouteConfig';
import getLenker from '../../../lenker';
import intlHelper from '../../../utils/intlUtils';

const PleiepengerEndring = () => {
    const intl = useIntl();
    const crumbs: Breadcrumb[] = [
        {
            route: InnsynRouteConfig.OVERSIKT,
            title: intlHelper(intl, 'page.søknader.crumbs.dinePP'),
        },
    ];

    return (
        <InnsynPage
            title="Endre pleiepenger"
            topContentRenderer={() => <PageBanner title="Pleiepenger - endring"></PageBanner>}
            breadcrumbs={crumbs}>
            <SectionPanel title="Melde ifra om endringer i din pleiepengesak" titleTag="h1">
                <Box padBottom="m">
                    <Undertittel>Arbeidstid</Undertittel>
                </Box>
                <p>
                    Du kan direkte melde ifra om endringer i arbeidstid opptil 3 måneder tilbake i tid og 6 måneder frem
                    i tid. Du kan foreløpig kun melde inn for arbeidsforhold du hadde da du søkte om pleiepenger. Skal
                    du melde endringer i arbeidstid utenfor denne tidsrammen, send en melding via skriv til oss.
                </p>
                <Lenke href={getLenker().endringsdialogPleiepenger}>Gå til endring av arbeidstid</Lenke>
                <Box padBottom="m" margin="xl">
                    <Undertittel>Andre endringer</Undertittel>
                </Box>
                <p>For andre endringer kan du sende inn en melding via skriv til oss, eller sende inn en ny søknad.</p>
            </SectionPanel>
        </InnsynPage>
    );
};

export default PleiepengerEndring;

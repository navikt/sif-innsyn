import Lenke from 'nav-frontend-lenker';
import { Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { useIntl } from 'react-intl';
import { Breadcrumb } from '../../../components/breadcrumbs/Breadcrumbs';
import Box from '../../../components/elements/box/Box';
import InnsynPage from '../../../components/innsyn-page/InnsynPage';
import PageBanner from '../../../components/page-banner/PageBanner';
import SectionPanel from '../../../components/section-panel/SectionPanel';
import SkrivTilOssLenke from '../../../components/SkrivTilOssLenke';
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
            <SectionPanel title="Hvilken endring vil du melde fra om?" titleTag="h1">
                <Box padBottom="m">
                    <Box padBottom="m">
                        <Undertittel>Jobb i pleiepengeperioden</Undertittel>
                    </Box>
                    <p>
                        Bruk endringsmeldingen for å melde fra om du skal jobbe mer eller mindre i perioden du har
                        pleiepenger. Du kan gjøre endringer i opptil 3 måneder tilbake i tid, og opptil 12 måneder frem
                        i tid.
                    </p>
                    <p>
                        Du kan ikke bruke endringsmeldingen hvis endringen gjelder utenfor denne tidsrammen. Heller ikke
                        hvis du er selvstendig næringsdrivende, eller har pleiepenger for flere barn. I disse tilfellene
                        må du sende en melding via <SkrivTilOssLenke label="Skriv til oss" />.
                    </p>
                    <p>
                        <Lenke href={getLenker().endringsdialogPleiepenger}>Gå til endringsmelding for jobb</Lenke>
                    </p>
                </Box>
                <Box margin="xl" padBottom="m">
                    <Box padBottom="m">
                        <Undertittel>Nytt, avsluttet eller endret arbeidsforhold</Undertittel>
                    </Box>
                    <p>
                        Når du har endringer i dine arbeidsforhold, melder du fra om dette via Skriv til oss. Melding om
                        nytt arbeidsforhold må inneholde informasjon om hvor mye du jobber normalt (før
                        pleiepengeperioden) og hvor mye du jobber i perioden med pleiepenger.
                    </p>
                    <p>
                        <SkrivTilOssLenke />
                    </p>
                </Box>

                <Box margin="xl">
                    <Box padBottom="m">
                        <Undertittel>Ferie og utenlandsopphold</Undertittel>
                    </Box>
                    <p>
                        Hvis du skal oppholde deg i utlandet, eller ha ferie i pleiepengeperioden, melder du fra om
                        dette via Skriv til oss. I meldingen gir du beskjed om hvilken periode det dreier seg om, og
                        hvilket land du eventuelt reiser til.
                    </p>
                    <p>
                        <SkrivTilOssLenke />
                    </p>
                </Box>

                <Box margin="xl">
                    <Box padBottom="m">
                        <Undertittel>Omsorgstilbud</Undertittel>
                    </Box>
                    <p>
                        Hvis tiden barnet oppholder seg i omsorgstilbudet har endret seg fast og regelmessig, sender du
                        en beskjed om endringen via Skriv til oss. Du trenger ikke sende noen beskjed hvis barnet har
                        vært sporadisk i omsorgstilbudet.
                    </p>
                    <p>
                        <SkrivTilOssLenke />
                    </p>
                </Box>
            </SectionPanel>
        </InnsynPage>
    );
};

export default PleiepengerEndring;

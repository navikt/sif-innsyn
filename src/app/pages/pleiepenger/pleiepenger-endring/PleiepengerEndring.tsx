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
            <SectionPanel title="Hva slags endring skal du melde ifra om?" titleTag="h1">
                <Box padBottom="m">
                    <Undertittel>Faktisk arbeidstid i pleiepengeperioden</Undertittel>
                </Box>
                <p>
                    Har du fått jobbet mer eller mindre enn hva du opplyste om i søknaden, kan du endre dette i en egen
                    endringsmelding for arbeidstid. Der kan du endre faktisk arbeidstid inntil 3 måned tilbake i tid og
                    12 måneder frem i tid. For andre endringer, se punktet nedenfor.
                </p>
                <p>
                    <Lenke href={getLenker().endringsdialogPleiepenger}>Gå til endringsmelding for arbeidstid</Lenke>
                </p>
                <Box margin="xl">
                    <Box padBottom="m">
                        <Undertittel>Arbeidsforhold</Undertittel>
                    </Box>
                    <p>Har det blitt andre endringer i arbeidsforholdene dine, etter at du sendte søknaden, ...</p>
                    <p>
                        Gå til <SkrivTilOssLenke />
                    </p>
                </Box>

                <Box margin="xl">
                    <Box padBottom="m">
                        <Undertittel>Omsorgstilbud</Undertittel>
                    </Box>
                    <p>
                        Har situasjonen for omsorgstilbud endret seg fast og regelmessig, send en melding via skriv til
                        oss eller send inn en ny søknad. Vi trenger ikke beskjed hvis barnet har vært i omsorgstilbudet
                        sporadisk.
                    </p>
                    <p>
                        Gå til <SkrivTilOssLenke />
                    </p>
                </Box>

                <Box margin="xl">
                    <Box padBottom="m">
                        <Undertittel>Ferie og utenlandsopphold</Undertittel>
                    </Box>
                    <p>
                        Skal du ha ferie eller på utenlandsopphold i din pleiepengeperiode? Meld ifra perioden du har
                        ferie eller skal være i utenlandet, samt hvilke land du eventuelt har reist til.
                    </p>
                    <p>
                        Gå til <SkrivTilOssLenke />
                    </p>
                </Box>

                <Box margin="xl">
                    <Box padBottom="m">
                        <Undertittel>Forlenge periode, nytt arbeidsforhold eller større endringer</Undertittel>
                    </Box>
                    <p>
                        Send inn en ny søknad dersom du skal du forlenge din periode, du har nye arbeidsforhold du
                        ønsker å registrere arbeidstid på eller du vil gjøre større endringer på din tidligere søknad.
                    </p>
                    <p>
                        Gå til <SkrivTilOssLenke />
                    </p>
                </Box>
            </SectionPanel>
        </InnsynPage>
    );
};

export default PleiepengerEndring;

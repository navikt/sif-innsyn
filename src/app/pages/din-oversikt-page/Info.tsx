// import Box from '../../components/elements/box/Box';
import React from 'react';
import intlHelper from '../../utils/intlUtils';
import { useIntl } from 'react-intl';
// import getLenker from '../../lenker';
// import { getDatoOgTidTilSlettSøknadString } from '../../utils/dateUtils';
import SectionPanel from '../../components/section-panel/SectionPanel';
import PillIkon from '../../svg/pilIkon';
// import Knappelenke from '../../components/knappelenke/Knappelenke';
import ExpandableInfo from '../../components/expandable-content/ExpandableInfo';

const Info = () => {
    const intl = useIntl();

    return (
        <SectionPanel
            illustration={<PillIkon />}
            illustrationPlacement="outside"
            title={intlHelper(intl, 'page.dinOversikt.info')}>
            <>
                <ExpandableInfo
                    dobbelButton={false}
                    title={intlHelper(intl, 'page.dinOversikt.info.innsent.søknad.tittel')}>
                    <span>
                        <ul style={{ marginTop: '2rem' }}>
                            <li style={{ marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Legeerklæring</span>
                                <div>
                                    Vi sjekker om vi har fått legeerklæring fra deg. Hvis du ikke sendte den sammen med
                                    søknaden din, må du ettersende den til oss så snart du kan.
                                </div>
                            </li>

                            <li style={{ marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Inntektsmelding fra arbeidsgiver</span>
                                <div>
                                    Hvis du er arbeidstaker, sjekker vi om vi har fått inntektsmelding fra
                                    arbeidsgiveren din. Den trenger vi hvis du søker for første gang, eller det er mer
                                    enn 4 uker siden du hadde pleiepenger sist. Kontakt arbeidsgiver for å sikre at de
                                    sender inntektsmeldingen til oss.
                                </div>
                                <div style={{ marginTop: '0.8rem' }}>
                                    Hvis du ikke er arbeidstaker, trenger du ikke sende informasjon om inntekten din.
                                </div>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Vi behandler søknaden din</span>
                                <div>
                                    Når vi har fått legeerklæring og inntektsmelding kan vi behandle søknaden din. Vi
                                    kontakter deg hvis vi trenger flere opplysninger fra deg.
                                </div>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Når søknaden er ferdig behandlet</span>
                                <div>
                                    Når vi har behandlet søknaden din, sender vi deg et svar som du finner under
                                    saksoversikten på Ditt NAV. Vi sender også svaret til deg i posten.
                                </div>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Utbetaling</span>
                                <div>
                                    Du finner informasjon om utbetaling under «kommende utbetalinger» i
                                    utbetalingsoversikten på Ditt NAV.
                                </div>
                            </li>
                        </ul>
                    </span>
                </ExpandableInfo>
            </>
        </SectionPanel>
    );
};

export default Info;

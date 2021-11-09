// import Box from '../../components/elements/box/Box';
import React from 'react';
import intlHelper from '../../utils/intlUtils';
import { useIntl } from 'react-intl';
// import getLenker from '../../lenker';
// import { getDatoOgTidTilSlettSøknadString } from '../../utils/dateUtils';
import SectionPanel from '../../components/section-panel/SectionPanel';
import BlyantIkon from '../../svg/blyantIkon';
// import Knappelenke from '../../components/knappelenke/Knappelenke';
import ExpandableInfo from '../../components/expandable-content/ExpandableInfo';

const Info = () => {
    const intl = useIntl();

    return (
        <SectionPanel
            illustration={<BlyantIkon />}
            illustrationPlacement="outside"
            title={intlHelper(intl, 'page.dinOversikt.info')}>
            <>
                <ExpandableInfo
                    dobbelButton={true}
                    title={intlHelper(intl, 'page.dinOversikt.info.innsent.søknad.tittel')}
                    title2={intlHelper(intl, 'page.dinOversikt.info.innsent.endringsmelding.tittel')}>
                    <span>
                        <ul style={{ marginTop: '2rem' }}>
                            <li style={{ marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Legeerklæring</span>
                                <div>
                                    Vi sjekker om vi har fått legeerklæring fra deg. Om du ikke sendte den sammen med
                                    søknaden din må du sende den til oss så snart du kan.
                                </div>
                            </li>

                            <li style={{ marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Inntektsmelding fra arbeidsgiver</span>
                                <div>
                                    Vi sjekker om vi har mottatt inntektsmelding fra arbeidsgiveren din. Den trenger vi
                                    hvis du søker for første gang eller det er mer enn 4 uker siden sist du hadde
                                    pleiepenger. Kontakt arbeidsgiver for å sikre at de sender inntektsmeldingen til
                                    oss.
                                </div>
                                <div style={{ marginTop: '0.8rem' }}>
                                    Hvis du ikke har arbeidsgiver trenger du ikke sende informasjon om inntekten din.
                                </div>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Søknaden din behandles</span>
                                <div>
                                    Når vi har fått legeerklæring og inntektsmelding kan vi starte å behandle søknaden
                                    din. Vi kontakter deg hvis vi trenger flere opplysninger fra deg.
                                </div>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Søknaden er ferdig behandlet </span>
                                <div>
                                    Når søknaden din er ferdig behandlet får du et svar som du finner under
                                    saksoversikten på Ditt NAV. I tillegg sender vi svar til deg i posten.
                                </div>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Utbetaling</span>
                                <div>
                                    Du finner informasjon om utbetaling under «kommende utbetalinger» i
                                    utbetalingsoversikten.
                                </div>
                            </li>
                        </ul>
                    </span>
                    <span>
                        <ul style={{ marginTop: '2rem' }}>
                            <li style={{ marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Item 1 tittel</span>
                                <div>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                                    unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </div>
                            </li>

                            <li style={{ marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Item 2 tittel</span>
                                <div>
                                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
                                    piece of classical Latin literature from 45 BC, making it over 2000 years old.
                                    Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia
                                </div>
                                <div style={{ marginTop: '0.8rem' }}>
                                    There are many variations of passages of Lorem Ipsum available, but the majority
                                    have suffered alteration in some form.
                                </div>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Item 3 tittel</span>
                                <div>
                                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
                                    interested.
                                </div>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Item 4 tittel </span>
                                <div>
                                    There are many variations of passages of Lorem Ipsum available, but the majority
                                    have suffered alteration in some form, by injected humour, or randomised words which
                                    dont look even slightly believable.
                                </div>
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Item 5 tittel</span>
                                <div>
                                    Vestibulum vehicula quam et nisl commodo sodales. Donec eget nibh sagittis, suscipit
                                    elit ut, luctus odio. Pellentesque eu fermentum leo. Curabitur in justo tempus,
                                    commodo elit sit amet, blandit enim. Aenean ac sem elit. Fusce sollicitudin dapibus
                                    odio et fringilla. Nullam hendrerit nunc vel tellus bibendum pellentesque.
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

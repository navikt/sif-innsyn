import React from 'react';
import intlHelper from '../../utils/intlUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import SectionPanel from '../../components/section-panel/SectionPanel';
import PillIkon from '../../svg/pilIkon';
// import ExpandableInfo from '../../components/expandable-content/ExpandableInfo';

const Info = () => {
    const intl = useIntl();

    return (
        <SectionPanel
            illustration={<PillIkon />}
            illustrationPlacement="outside"
            title={intlHelper(intl, 'page.dinOversikt.info')}>
            <>
                <span>
                    <ul style={{ marginTop: '2rem' }}>
                        <li style={{ marginBottom: '1rem' }}>
                            <span style={{ fontWeight: 'bold' }}>
                                <FormattedMessage id="page.dinOversikt.info.innsent.søknad.legeerklæring.tittel" />
                            </span>
                            <div>
                                <FormattedMessage id="page.dinOversikt.info.innsent.søknad.legeerklæring" />
                            </div>
                        </li>

                        <li style={{ marginBottom: '1rem' }}>
                            <span style={{ fontWeight: 'bold' }}>
                                <FormattedMessage id="page.dinOversikt.info.innsent.søknad.inntektsmelding.tittel" />
                            </span>
                            <div>
                                <FormattedMessage id="page.dinOversikt.info.innsent.søknad.inntektsmelding" />
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
            </>
        </SectionPanel>
    );
};

export default Info;

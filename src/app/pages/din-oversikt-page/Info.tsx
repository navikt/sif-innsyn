import React from 'react';
import intlHelper from '../../utils/intlUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import SectionPanel from '../../components/section-panel/SectionPanel';
import PillIkon from '../../svg/pilIkon';
import './info.less';
import bemUtils from '../../utils/bemUtils';
// import ExpandableInfo from '../../components/expandable-content/ExpandableInfo';

const bem = bemUtils('info');

const Info = () => {
    const intl = useIntl();

    return (
        <SectionPanel
            illustration={<PillIkon />}
            illustrationPlacement="outside"
            title={intlHelper(intl, 'page.dinOversikt.info')}>
            <>
                <span className={bem.block}>
                    <ul>
                        <li>
                            <span>
                                <FormattedMessage id="page.dinOversikt.info.innsent.søknad.legeerklæring.tittel" />
                            </span>
                            <p>
                                <FormattedMessage id="page.dinOversikt.info.innsent.søknad.legeerklæring" />
                            </p>
                        </li>

                        <li>
                            <span>
                                <FormattedMessage id="page.dinOversikt.info.innsent.søknad.inntektsmelding.tittel" />
                            </span>
                            <p>
                                <FormattedMessage id="page.dinOversikt.info.innsent.søknad.inntektsmelding.avsnitt.1" />
                            </p>
                            <p>
                                <FormattedMessage id="page.dinOversikt.info.innsent.søknad.inntektsmelding.avsnitt.2" />
                            </p>
                        </li>

                        <li>
                            <span>
                                <FormattedMessage id="page.dinOversikt.info.innsent.søknad.behandling.tittel" />
                            </span>
                            <p>
                                <FormattedMessage id="page.dinOversikt.info.innsent.søknad.behandling" />
                            </p>
                        </li>
                        <li>
                            <span>
                                <FormattedMessage id="page.dinOversikt.info.innsent.søknad.ferdigBehandlet.tittel" />
                            </span>
                            <p>
                                <FormattedMessage id="page.dinOversikt.info.innsent.søknad.ferdigBehandlet" />
                            </p>
                        </li>
                        <li>
                            <span>
                                <FormattedMessage id="page.dinOversikt.info.innsent.søknad.utbetaling.tittel" />
                            </span>
                            <p>
                                <FormattedMessage id="page.dinOversikt.info.innsent.søknad.utbetaling" />
                            </p>
                        </li>
                    </ul>
                </span>
            </>
        </SectionPanel>
    );
};

export default Info;

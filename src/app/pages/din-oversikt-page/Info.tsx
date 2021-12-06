import React from 'react';
import intlHelper from '../../utils/intlUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import SectionPanel from '../../components/section-panel/SectionPanel';
import PillIkon from '../../svg/pilIkon';
import bemUtils from '../../utils/bemUtils';
import { Element } from 'nav-frontend-typografi';
import './info.less';

const bem = bemUtils('info');

const Info = () => {
    const intl = useIntl();

    return (
        <SectionPanel
            illustration={<PillIkon />}
            illustrationPlacement="outside"
            title={intlHelper(intl, 'page.dinOversikt.info')}>
            <ul className={bem.block}>
                <li>
                    <Element tag="h3">
                        <FormattedMessage id="page.dinOversikt.info.innsent.søknad.legeerklæring.tittel" />
                    </Element>
                    <p>
                        <FormattedMessage id="page.dinOversikt.info.innsent.søknad.legeerklæring" />
                    </p>
                </li>

                <li>
                    <Element tag="h3">
                        <FormattedMessage id="page.dinOversikt.info.innsent.søknad.inntektsmelding.tittel" />
                    </Element>
                    <p>
                        <FormattedMessage id="page.dinOversikt.info.innsent.søknad.inntektsmelding.avsnitt.1" />
                    </p>
                    <p>
                        <FormattedMessage id="page.dinOversikt.info.innsent.søknad.inntektsmelding.avsnitt.2" />
                    </p>
                </li>

                <li>
                    <Element tag="h3">
                        <FormattedMessage id="page.dinOversikt.info.innsent.søknad.behandling.tittel" />
                    </Element>
                    <p>
                        <FormattedMessage id="page.dinOversikt.info.innsent.søknad.behandling" />
                    </p>
                </li>
                <li>
                    <Element tag="h3">
                        <FormattedMessage id="page.dinOversikt.info.innsent.søknad.ferdigBehandlet.tittel" />
                    </Element>
                    <p>
                        <FormattedMessage id="page.dinOversikt.info.innsent.søknad.ferdigBehandlet" />
                    </p>
                </li>
                <li>
                    <Element tag="h3">
                        <FormattedMessage id="page.dinOversikt.info.innsent.søknad.utbetaling.tittel" />
                    </Element>
                    <p>
                        <FormattedMessage id="page.dinOversikt.info.innsent.søknad.utbetaling" />
                    </p>
                </li>
            </ul>
        </SectionPanel>
    );
};

export default Info;

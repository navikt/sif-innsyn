import * as React from 'react';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import SvgCalculatorLogo from '../../svgs/SvgCalculatorLogo';
import { Sidetittel } from 'nav-frontend-typografi';
import SvgHeaderUnderline from '../../svgs/SvgHeaderUnderline';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';

const bem = bemUtils('omsorgsdagerkalkulator');

const KalkulatorLogoAndTitle = () => {
    return (
        <div className={bem.element('align-content-centre')}>
            <FormBlock>
                <SvgCalculatorLogo />
            </FormBlock>
            <FormBlock paddingBottom={'l'}>
                <Sidetittel>Omsorgsdager kalkulator</Sidetittel>
                <SvgHeaderUnderline />
            </FormBlock>
        </div>
    );
};

export default KalkulatorLogoAndTitle;

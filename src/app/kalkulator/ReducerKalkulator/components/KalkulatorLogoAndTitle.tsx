import * as React from 'react';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import SvgCalculatorLogo from '../../svgs/SvgCalculatorLogo';
import { Sidetittel } from 'nav-frontend-typografi';

const KalkulatorLogoAndTitle = () => {
    return (
        <div className={'omsorgsdagerkalkulator--align-content-centre'}>
            <FormBlock>
                <SvgCalculatorLogo />
            </FormBlock>
            <FormBlock paddingBottom={'l'}>
                <Sidetittel>Omsorgsdager kalkulator</Sidetittel>
            </FormBlock>
        </div>
    );
};

export default KalkulatorLogoAndTitle;

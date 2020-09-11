import * as React from 'react';
import { Dispatch } from 'react';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import ValidationSummary from '@navikt/sif-common-formik/lib/components/helpers/ValidationSummary';
import Omsorgsprinsipper from '@navikt/omsorgspenger-kalkulator/lib/types/Omsorgsprinsipper';
import ResultBox from './ResultBox';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Action, beregn } from '../actions';
import { caseResultViewOf, ResultView } from '../types/ResultView';

interface Props {
    resultView: ResultView<FeiloppsummeringFeil[], Omsorgsprinsipper>;
    dispatch: Dispatch<Action>;
}

const ResultatArea: React.FC<Props> = ({ resultView, dispatch }: Props) =>
    caseResultViewOf(
        () => null,
        () => (
            <FormBlock margin={'xxl'}>
                <Hovedknapp id={'beregn-knapp'} onClick={() => dispatch(beregn)}>
                    Beregn
                </Hovedknapp>
            </FormBlock>
        ),
        (errors: FeiloppsummeringFeil[]) => (
            <FormBlock margin={'xxl'}>
                <FormBlock>
                    <Hovedknapp id={'beregn-knapp'} onClick={() => dispatch(beregn)}>
                        Beregn
                    </Hovedknapp>
                </FormBlock>
                <FormBlock>
                    <ValidationSummary title={'Validation summary tittel'} errorMessages={errors} />
                </FormBlock>
            </FormBlock>
        ),
        () => (
            <FormBlock>
                <div>View orange box with "No valid children" message</div>
            </FormBlock>
        ),
        (result: Omsorgsprinsipper) => <ResultBox resultat={result} />
    )(resultView);

export default ResultatArea;

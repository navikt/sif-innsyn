import * as React from 'react';
import { State } from '../state';
import { fold } from 'fp-ts/lib/Either';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import ValidationSummary from '@navikt/sif-common-formik/lib/components/helpers/ValidationSummary';
import Omsorgsprinsipper from '@navikt/omsorgspenger-kalkulator/lib/types/Omsorgsprinsipper';
import ResultBox from './ResultBox';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Action, beregn } from '../actions';
import { Dispatch } from 'react';

interface Props {
    state: State;
    dispatch: Dispatch<Action>;
}

const ResultatArea: React.FC<Props> = ({ state, dispatch }: Props) => {
    if (state.barn.length === 0) {
        return null;
    }

    if (!state.showResult || state.isInitial) {
        return (
            <FormBlock margin={'xxl'}>
                <Hovedknapp id={'beregn-knapp'} onClick={() => dispatch(beregn)}>
                    Beregn
                </Hovedknapp>
            </FormBlock>
        );
    }

    return fold(
        (errors: FeiloppsummeringFeil[]) => (
            <FormBlock margin={'xxl'}>
                <FormBlock>
                    <Hovedknapp id={'beregn-knapp'} onClick={() => dispatch(beregn)}>
                        Beregn
                    </Hovedknapp>
                </FormBlock>
                {state.showErrors && (
                    <FormBlock>
                        <ValidationSummary title={'Validation summary tittel'} errorMessages={errors} />
                    </FormBlock>
                )}
            </FormBlock>
        ),
        (resultat: Omsorgsprinsipper) => <ResultBox resultat={resultat} />
    )(state.result);
};

export default ResultatArea;

import * as React from 'react';
import { useReducer } from 'react';
import { KalkulatorReducer, reducer } from './reducer';
import { BarnInfo, initialState, State } from './state';
import { ActionType } from './actions';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import SvgSuccessCircle from '../svgs/SvgSuccessCircle';
import ValidationSummary from '@navikt/sif-common-formik/lib/components/helpers/ValidationSummary';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';

export const isNumber = (input: any): input is number => {
    // TODO: Implement.
    return true;
};

const ReducerKalkulator = () => {
    const [state, dispatch] = useReducer<KalkulatorReducer>(reducer, initialState);
    const { nBarnMaks, barn }: State = state;

    // useMemo<Omsorgsprinsipper>(
    //     () =>
    //         omsorgsdager(
    //             barn.map((barn: BarnInfo, index: number) => barnInfoToBarn(barn, index)),
    //             false
    //         ),
    //     [barn, inkluderKoronadager]
    // );

    return (
        <div>
            <FormBlock>
                <div>Hvor mange barn er det i husstanden?</div>
                <select
                    onChange={(event) => {
                        const maybeNumber: number = parseInt(event.target.value, 10);
                        if (isNumber(maybeNumber)) {
                            dispatch({
                                type: ActionType.SetBarn,
                                nBarn: maybeNumber,
                            });
                        }
                    }}>
                    {Array.from({ length: nBarnMaks }, (_, i) => i).map((value: number) => {
                        return (
                            <option id={`n_barn_i_husstanden${value}`} value={value} key={value}>
                                {value}
                            </option>
                        );
                    })}
                </select>
            </FormBlock>
            <FormBlock>
                Dette er skjemaelementet
                <input
                    id={'theVerySecretId'}
                    onChange={(evt) => {
                        console.info(evt.target.value);
                    }}
                />
            </FormBlock>
            <FormBlock>Liste av barn og info som skal fylles ut:</FormBlock>
            <FormBlock>
                {barn.map((barnInfo: BarnInfo, index: number) => {
                    return (
                        <FormBlock key={index}>
                            <Ekspanderbartpanel
                                tittel={
                                    <div>
                                        Barn {index + 1}
                                        <SvgSuccessCircle />
                                    </div>
                                }
                                key={index}>
                                Innhold for barn nummer {index + 1}
                            </Ekspanderbartpanel>
                        </FormBlock>
                    );
                })}
            </FormBlock>
            <FormBlock>
                <ValidationSummary
                    title={'Validation summary tittel'}
                    errorMessages={[{ skjemaelementId: 'theVerySecretId', feilmelding: 'Du har en feil lengre oppe.' }]}
                />
            </FormBlock>
        </div>
    );
};

export default ReducerKalkulator;

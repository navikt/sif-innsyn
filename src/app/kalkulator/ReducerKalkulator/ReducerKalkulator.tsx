import * as React from 'react';
import { useReducer } from 'react';
import { KalkulatorReducer, reducer } from './reducer';
import { createInitialState, State } from './state';
import { setAleneOmOmsorgenForBarnInfo, setBarn, setFodselsdatoForBarnInfo } from './actions';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import SvgSuccessCircle from '../svgs/SvgSuccessCircle';
import ValidationSummary from '@navikt/sif-common-formik/lib/components/helpers/ValidationSummary';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { BarnInfo } from './types';
import { FeiloppsummeringFeil, RadioPanelGruppe } from 'nav-frontend-skjema';
import { LabelWithInfo } from '@navikt/sif-common-formik/lib';
import { Datovelger, ISODateString } from 'nav-datovelger';
import { definedJaOrNeiToBool, toISODateStringOrUndefined, toValueOrUndefined, valueToJaNeiRadioValue } from './utils';
import { isJaOrNei } from './typeguards';
import { createInitialBarnInformasjon } from './initializers';
import { fold } from 'fp-ts/lib/Either';
import Omsorgsprinsipper from '@navikt/omsorgspenger-kalkulator/lib/types/Omsorgsprinsipper';

export const isNumber = (input: any): input is number => {
    // TODO: Implement.
    return true;
};

const ReducerKalkulator = () => {
    const [state, dispatch] = useReducer<KalkulatorReducer>(
        reducer,
        createInitialState([createInitialBarnInformasjon(), createInitialBarnInformasjon()])
    );
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
                    id={state.nBarn.id}
                    value={toValueOrUndefined(state.nBarn.value)}
                    onChange={(event) => {
                        const maybeNumber: number = parseInt(event.target.value, 10);
                        if (isNumber(maybeNumber)) {
                            dispatch(setBarn(maybeNumber));
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
                                <Datovelger
                                    valgtDato={toISODateStringOrUndefined(barnInfo.fodselsdato.value)}
                                    onChange={(maybeISODateString: ISODateString | undefined) => {
                                        if (maybeISODateString) {
                                            dispatch(setFodselsdatoForBarnInfo(maybeISODateString, barnInfo.id));
                                        }
                                    }}
                                    kanVelgeUgyldigDato={true}
                                />
                                <RadioPanelGruppe
                                    name={'RadioPanelGroupName'}
                                    legend={
                                        <LabelWithInfo info={'Noe beskrivende info'}>
                                            Legend for Ja/Nei radiopanel gruppe
                                        </LabelWithInfo>
                                    }
                                    feil={false}
                                    onChange={(evt, value) => {
                                        if (isJaOrNei(value)) {
                                            dispatch(
                                                setAleneOmOmsorgenForBarnInfo(definedJaOrNeiToBool(value), barnInfo.id)
                                            );
                                        }
                                    }}
                                    checked={valueToJaNeiRadioValue(barnInfo.aleneOmOmsorgen)}
                                    radios={[
                                        { label: 'Ja', value: 'ja' },
                                        { label: 'Nei', value: 'nei' },
                                    ]}
                                />
                            </Ekspanderbartpanel>
                        </FormBlock>
                    );
                })}
            </FormBlock>
            <FormBlock>
                {fold(
                    (errors: FeiloppsummeringFeil[]) => {
                        return (
                            <div>
                                <ValidationSummary
                                    title={'Validation summary tittel'}
                                    errorMessages={[
                                        ...errors,
                                        {
                                            skjemaelementId: 'theVerySecretId',
                                            feilmelding: 'Du har en feil lengre oppe.',
                                        },
                                    ]}
                                />
                            </div>
                        );
                    },
                    (resultat: Omsorgsprinsipper) => {
                        return <div>All info er riktig inputet, og resultatet kan vises her</div>;
                    }
                )(state.resultat)}
            </FormBlock>
        </div>
    );
};

export default ReducerKalkulator;

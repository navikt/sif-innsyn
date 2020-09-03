import * as React from 'react';
import { useReducer } from 'react';
import { KalkulatorReducer, reducer } from './reducer';
import { createInitialState, State } from './state';
import {
    beregn,
    setAleneOmOmsorgen,
    setBarn,
    setBorSammen,
    setFodselsdatoForBarnInfo,
    setKroniskSykt,
} from './actions';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import SvgSuccessCircle from '../svgs/SvgSuccessCircle';
import ValidationSummary from '@navikt/sif-common-formik/lib/components/helpers/ValidationSummary';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { BarnInfo, ValidBarnInfo } from './types';
import { FeiloppsummeringFeil, RadioPanelGruppe } from 'nav-frontend-skjema';
import { LabelWithInfo } from '@navikt/sif-common-formik/lib';
import { Datovelger, ISODateString } from 'nav-datovelger';
import {
    toISODateStringOrUndefined,
    toValueOrUndefined,
    ValueBoolRadioValue,
    yesOrNoRadios,
    YesOrNoToBool,
} from './utils';
import { isYesOrNo } from './typeguards';
import { createInitialBarnInformasjon } from './initializers';
import { fold, isLeft, isRight } from 'fp-ts/lib/Either';
import { Hovedknapp } from 'nav-frontend-knapper';

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
                Testelement for å teste linken fra FeiloppsummeringSummary:
                <input
                    id={'theVerySecretId'}
                    onChange={(evt) => {
                        console.info(evt.target.value);
                    }}
                />
            </FormBlock>

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
                                    id={barnInfo.fodselsdato.id}
                                    valgtDato={toISODateStringOrUndefined(barnInfo.fodselsdato.value)}
                                    onChange={(maybeISODateString: ISODateString | undefined) => {
                                        if (maybeISODateString) {
                                            dispatch(setFodselsdatoForBarnInfo(maybeISODateString, barnInfo.id));
                                        }
                                    }}
                                    kanVelgeUgyldigDato={true}
                                    datoErGyldig={isRight(barnInfo.fodselsdato.value)}
                                />
                                <RadioPanelGruppe
                                    name={barnInfo.kroniskSykt.id}
                                    legend={
                                        <LabelWithInfo info={'Noe beskrivende info'}>
                                            Har du fått ekstra omsorgsdager fordi barnet har en kronisk sykdom eller en
                                            funksjonshemning?
                                        </LabelWithInfo>
                                    }
                                    feil={isLeft(barnInfo.kroniskSykt.value) ? <span>Feltet mangler</span> : undefined}
                                    onChange={(evt, value) => {
                                        if (isYesOrNo(value)) {
                                            dispatch(setKroniskSykt(YesOrNoToBool(value), barnInfo.id));
                                        }
                                    }}
                                    checked={ValueBoolRadioValue(barnInfo.kroniskSykt)}
                                    radios={yesOrNoRadios(barnInfo.kroniskSykt.id)}
                                />
                                <RadioPanelGruppe
                                    name={barnInfo.borSammen.id}
                                    legend={
                                        <LabelWithInfo info={'Noe beskrivende info'}>
                                            Bor barnet fast hos deg?
                                        </LabelWithInfo>
                                    }
                                    feil={isLeft(barnInfo.borSammen.value) ? <span>Feltet mangler</span> : undefined}
                                    onChange={(evt, value) => {
                                        if (isYesOrNo(value)) {
                                            dispatch(setBorSammen(YesOrNoToBool(value), barnInfo.id));
                                        }
                                    }}
                                    checked={ValueBoolRadioValue(barnInfo.borSammen)}
                                    radios={yesOrNoRadios(barnInfo.borSammen.id)}
                                />
                                <RadioPanelGruppe
                                    name={barnInfo.aleneOmOmsorgen.id}
                                    legend={
                                        <LabelWithInfo info={'Noe beskrivende info'}>
                                            Er du alene om omsorgen med barnet?
                                        </LabelWithInfo>
                                    }
                                    feil={
                                        isLeft(barnInfo.aleneOmOmsorgen.value) ? <span>Feltet mangler</span> : undefined
                                    }
                                    onChange={(evt, value) => {
                                        if (isYesOrNo(value)) {
                                            dispatch(setAleneOmOmsorgen(YesOrNoToBool(value), barnInfo.id));
                                        }
                                    }}
                                    checked={ValueBoolRadioValue(barnInfo.aleneOmOmsorgen)}
                                    radios={yesOrNoRadios(barnInfo.aleneOmOmsorgen.id)}
                                />
                            </Ekspanderbartpanel>
                        </FormBlock>
                    );
                })}
            </FormBlock>
            <FormBlock>
                <FormBlock>
                    <Hovedknapp id={'beregn-knapp'} onClick={() => dispatch(beregn)}>
                        Beregn
                    </Hovedknapp>
                </FormBlock>
                {fold(
                    (errors: FeiloppsummeringFeil[]) => {
                        return (
                            <FormBlock>
                                <FormBlock>
                                    {state.showValidationErrorSummary && (
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
                                    )}
                                </FormBlock>
                            </FormBlock>
                        );
                    },
                    (resultat: ValidBarnInfo[]) => {
                        return <div>All info er riktig inputet, og resultatet kan vises her</div>;
                    }
                )(state.validationResult)}
            </FormBlock>
        </div>
    );
};

export default ReducerKalkulator;

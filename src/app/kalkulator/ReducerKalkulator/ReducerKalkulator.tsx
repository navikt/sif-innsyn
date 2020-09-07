import * as React from 'react';
import { useReducer } from 'react';
import { KalkulatorReducer, reducer } from './reducer';
import { createInitialState, State } from './state';
import {
    beregn,
    setAleneOmOmsorgen,
    setBorSammen,
    setFodselsdatoForBarnInfo,
    setKroniskSykt,
    setNBarn,
    setNBarnInvalid,
} from './actions';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import SvgSuccessCircle from '../svgs/SvgSuccessCircle';
import ValidationSummary from '@navikt/sif-common-formik/lib/components/helpers/ValidationSummary';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { BarnInfo, ValidBarnInfo } from './types';
import { FeiloppsummeringFeil, RadioPanelGruppe, Select } from 'nav-frontend-skjema';
import { Datovelger, ISODateString } from 'nav-datovelger';
import {
    isValidBarnInfo,
    toISODateStringOrUndefined,
    toValueOrUndefined,
    ValueBoolRadioValue,
    yesOrNoRadios,
    YesOrNoToBool,
} from './utils';
import { isNumber, isYesOrNo } from './typeguards';
import { fold, isLeft } from 'fp-ts/lib/Either';
import { Hovedknapp } from 'nav-frontend-knapper';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { createInitialBarnInformasjon } from './initializers';
import { Element } from 'nav-frontend-typografi';
import './reducerKalkulator.less';
import '@navikt/sif-common-formik/lib/styles/nav-frontend-skjema-extension.less';
import ExpandableInfo from '@navikt/sif-common-core/lib/components/expandable-content/ExpandableInfo';
import { evaluateDatoErGyldigProp, valueToFeilProps } from './componentUtils';
import KalkulatorLogoAndTitle from './components/KalkulatorLogoAndTitle';

const ReducerKalkulator = () => {
    const [state, dispatch] = useReducer<KalkulatorReducer>(
        reducer,
        createInitialState([createInitialBarnInformasjon()])
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
                <KalkulatorLogoAndTitle />
                <div className={'omsorgsdagerkalkulator--align-content-centre'}>
                    <FormBlock>
                        <Element>Hvor mange barn er det i husstanden?</Element>
                    </FormBlock>
                    <FormBlock paddingBottom={'l'}>
                        <Select
                            id={state.nBarn.id}
                            value={toValueOrUndefined(state.nBarn.value)}
                            bredde={'xs'}
                            feil={isLeft(state.nBarn.value) && state.showErrors ? <span>asdf</span> : false}
                            onChange={(event) => {
                                const maybeNumber: number = parseInt(event.target.value, 10);
                                if (isNumber(maybeNumber) && maybeNumber > 0) {
                                    dispatch(setNBarn(maybeNumber));
                                } else {
                                    dispatch(setNBarnInvalid());
                                }
                            }}>
                            {Array.from({ length: nBarnMaks }, (_, i) => i).map((value: number) => {
                                return (
                                    <option id={`n_barn_i_husstanden${value}`} value={value} key={value}>
                                        {value}
                                    </option>
                                );
                            })}
                        </Select>
                    </FormBlock>
                </div>
            </FormBlock>

            {state.barn.length > 1 && (
                <FormBlock>
                    <AlertStripeInfo>Legg inn opplysninger for ett barn om gangen.</AlertStripeInfo>
                </FormBlock>
            )}
            <FormBlock>
                {barn.map((barnInfo: BarnInfo, index: number) => {
                    return (
                        <FormBlock key={index}>
                            <Ekspanderbartpanel
                                tittel={
                                    <div className={'omsorgsdagerkalkulator--ekspanderbarnpanel-tittel-wrapper'}>
                                        <div className={'omsorgsdagerkalkulator--ekspanderbarnpanel-tittel-left'}>
                                            Barn {index + 1}
                                        </div>
                                        {isValidBarnInfo(barnInfo) && (
                                            <div className={'omsorgsdagerkalkulator--ekspanderbarnpanel-tittel-right'}>
                                                <SvgSuccessCircle />
                                            </div>
                                        )}
                                    </div>
                                }
                                apen={true}
                                key={index}>
                                <FormBlock>
                                    <Element>Når er barnet født?</Element>
                                    <ExpandableInfo title="Hvorfor spør vi om det?">
                                        Vi spør om det fordi ...
                                    </ExpandableInfo>
                                    <Datovelger
                                        id={barnInfo.fodselsdato.id}
                                        valgtDato={toISODateStringOrUndefined(barnInfo.fodselsdato.value)}
                                        onChange={(maybeISODateString: ISODateString | undefined) => {
                                            if (maybeISODateString) {
                                                dispatch(setFodselsdatoForBarnInfo(maybeISODateString, barnInfo.id));
                                            }
                                        }}
                                        kanVelgeUgyldigDato={true}
                                        datoErGyldig={evaluateDatoErGyldigProp(barnInfo.fodselsdato, state.showErrors)}
                                    />
                                </FormBlock>
                                <FormBlock>
                                    <RadioPanelGruppe
                                        name={barnInfo.kroniskSykt.id}
                                        legend={
                                            <div>
                                                <Element>
                                                    Har du fått ekstra omsorgsdager fordi barnet har en kronisk sykdom
                                                    eller en funksjonshemning?
                                                </Element>
                                                <ExpandableInfo title="Hvorfor spør vi om det?">
                                                    Vi spør om det fordi ...
                                                </ExpandableInfo>
                                            </div>
                                        }
                                        feil={valueToFeilProps(barnInfo.kroniskSykt, state.showErrors)}
                                        onChange={(evt, value) => {
                                            if (isYesOrNo(value)) {
                                                dispatch(setKroniskSykt(YesOrNoToBool(value), barnInfo.id));
                                            }
                                        }}
                                        checked={ValueBoolRadioValue(barnInfo.kroniskSykt)}
                                        radios={yesOrNoRadios(barnInfo.kroniskSykt.id)}
                                        className={'twoColumnPanelGruppe'}
                                    />
                                </FormBlock>
                                <FormBlock>
                                    <RadioPanelGruppe
                                        name={barnInfo.borSammen.id}
                                        legend={
                                            <div>
                                                <Element>Bor barnet fast hos deg?</Element>
                                                <ExpandableInfo title="Hvorfor spør vi om det?">
                                                    Vi spør om det fordi ...
                                                </ExpandableInfo>
                                            </div>
                                        }
                                        feil={valueToFeilProps(barnInfo.kroniskSykt, state.showErrors)}
                                        onChange={(evt, value) => {
                                            if (isYesOrNo(value)) {
                                                dispatch(setBorSammen(YesOrNoToBool(value), barnInfo.id));
                                            }
                                        }}
                                        checked={ValueBoolRadioValue(barnInfo.borSammen)}
                                        radios={yesOrNoRadios(barnInfo.borSammen.id)}
                                        className={'twoColumnPanelGruppe'}
                                    />
                                </FormBlock>
                                <FormBlock>
                                    <RadioPanelGruppe
                                        name={barnInfo.aleneOmOmsorgen.id}
                                        legend={
                                            <div>
                                                <Element>Er du alene om omsorgen med barnet?</Element>
                                                <ExpandableInfo title="Hvorfor spør vi om det?">
                                                    Vi spør om det fordi ...
                                                </ExpandableInfo>
                                            </div>
                                        }
                                        feil={valueToFeilProps(barnInfo.kroniskSykt, state.showErrors)}
                                        onChange={(evt, value) => {
                                            if (isYesOrNo(value)) {
                                                dispatch(setAleneOmOmsorgen(YesOrNoToBool(value), barnInfo.id));
                                            }
                                        }}
                                        checked={ValueBoolRadioValue(barnInfo.aleneOmOmsorgen)}
                                        radios={yesOrNoRadios(barnInfo.aleneOmOmsorgen.id)}
                                        className={'twoColumnPanelGruppe'}
                                    />
                                </FormBlock>
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
                                    {state.showErrors && (
                                        <ValidationSummary title={'Validation summary tittel'} errorMessages={errors} />
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

import * as React from 'react';
import { useReducer } from 'react';
import { KalkulatorReducer, reducer } from './reducer';
import { createInitialState, State } from './state';
import {
    fjernFodselsdatoForBarnInfo,
    setAktivtBarnPanel,
    setAleneOmOmsorgen,
    setBorSammen,
    setFodselsdatoForBarnInfo,
    setKroniskSykt,
    setNBarn,
    setNBarnInvalid,
} from './actions';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { BarnInfo } from './types';
import { RadioPanelGruppe, Select } from 'nav-frontend-skjema';
import { Datovelger } from 'nav-datovelger';
import { barnetErOverAtten, barnetErOverTolvOgIkkeKroniskSykt, isVisibleAndBorIkkeSammen } from './utils';
import { isISODateString, isNumber, isYesOrNo } from './typeguards';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element } from 'nav-frontend-typografi';
import './reducerKalkulator.less';
import '@navikt/sif-common-formik/lib/styles/nav-frontend-skjema-extension.less';
import ExpandableInfo from '@navikt/sif-common-core/lib/components/expandable-content/ExpandableInfo';
import { valueToFeilProps } from './componentUtils';
import KalkulatorLogoAndTitle from './components/KalkulatorLogoAndTitle';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import Lenke from 'nav-frontend-lenker';
import ResultatArea from './components/ResultatArea';
import {
    panelSkalVæreÅpent,
    shouldViewAleneOmOmsorgenQuestion,
    shouldViewBorSammenQuestion,
    shouldViewKroniskSyktQuestion,
    skalViseGåTilNesteBarnKnapp,
    toFodselsdatoOrUndefined,
    toRadioValue,
    yesOrNoRadios,
    YesOrNoToBool,
} from './viewUtils';
import BarnPanelView from './components/BarnPanelView';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { isNone } from 'fp-ts/lib/Option';
import { isBeregnButtonAndErrorSummary } from './types/ResultView';
import { validateAleneOmOmsorgen, validateBorSammen, validateKroniskSykt } from './validationUtils';
import { Knapp } from 'nav-frontend-knapper';

const bem = bemUtils('omsorgsdagerkalkulator');

// const testBarn: BarnInfo = {
//     id: 'asdkjnaksjd',
//     fodselsdato: initializeValue(some('2020-07-20')),
//     kroniskSykt: initializeValue(some(true)),
//     borSammen: initializeValue(some(true)),
//     aleneOmOmsorgen: initializeValue(some(true)),
// };

export interface Props {
    initialBarnListe?: BarnInfo[];
}

const ReducerKalkulator = ({ initialBarnListe }: Props) => {
    const [state, dispatch] = useReducer<KalkulatorReducer>(reducer, createInitialState(initialBarnListe || []));
    const { nBarnMaks, barn }: State = state;

    return (
        <FormBlock paddingBottom={'xxl'}>
            <FormBlock>
                <KalkulatorLogoAndTitle />
                {state.barn.length === 0 && (
                    <FormBlock>
                        Kalkulatoren beregner hvor mange omsorgsdager du har ut fra svarene du oppgir. Det betyr at
                        riktig resultat er avhengig av at du gir riktige opplysninger. Kalkulatoren er ment som et
                        hjelpeverktøy for deg, og det er ikke et vedtak eller en bekreftelse fra NAV.
                    </FormBlock>
                )}
                <div className={bem.element('align-content-centre')}>
                    <FormBlock>
                        <Element>Hvor mange egne barn har du i husstanden?</Element>
                    </FormBlock>
                    <FormBlock paddingBottom={'l'}>
                        <Select
                            id={state.nBarn.id}
                            value={state.nBarn.value}
                            bredde={'xs'}
                            feil={undefined}
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
                {barn.map((barnInfo: BarnInfo, index: number, listeAvBarn: BarnInfo[]) => {
                    return (
                        <FormBlock key={index}>
                            <BarnPanelView
                                index={index}
                                length={state.barn.length}
                                barnInfo={barnInfo}
                                apen={panelSkalVæreÅpent(barnInfo, state)}>
                                <FormBlock>
                                    <Element>Når er barnet født?</Element>
                                    <ExpandableInfo title="Hvorfor spør vi om det?">
                                        Omsorgsdager gjelder i utgangspunktet ut kalenderåret barnet er 12 år. Hvis
                                        barnet ditt er 13 år eller eldre må du ha søkt og fått vedtak fra NAV om at du
                                        får omsorgsdager fordi barnet har en kronisk sykdom.
                                    </ExpandableInfo>
                                    <Datovelger
                                        id={barnInfo.fodselsdato.id}
                                        valgtDato={toFodselsdatoOrUndefined(barnInfo.fodselsdato.value)}
                                        onChange={(maybeISODateString: string | undefined) => {
                                            if (isISODateString(maybeISODateString)) {
                                                dispatch(setFodselsdatoForBarnInfo(maybeISODateString, barnInfo.id));
                                            } else {
                                                dispatch(fjernFodselsdatoForBarnInfo(barnInfo.id));
                                            }
                                        }}
                                        kanVelgeUgyldigDato={true}
                                        datoErGyldig={
                                            !(
                                                isNone(barnInfo.fodselsdato.value) &&
                                                isBeregnButtonAndErrorSummary(state.resultViewData)
                                            )
                                        }
                                        visÅrVelger={true}
                                    />
                                </FormBlock>

                                {barnetErOverAtten(barnInfo) && (
                                    <FormBlock>
                                        <AlertStripeAdvarsel>
                                            Du kan kun ha omsorgsdager ut kalenderåret barnet er 18 år.
                                        </AlertStripeAdvarsel>
                                    </FormBlock>
                                )}

                                {shouldViewKroniskSyktQuestion(barnInfo) && (
                                    <FormBlock>
                                        <RadioPanelGruppe
                                            name={barnInfo.kroniskSykt.id}
                                            legend={
                                                <div>
                                                    <Element>
                                                        Har du fått ekstra omsorgsdager fordi barnet har en kronisk
                                                        sykdom eller en funksjonshemning?
                                                    </Element>
                                                    <ExpandableInfo title="Hva betyr dette?">
                                                        Hvis barnet har en kronisk sykdom eller en funksjonshemning kan
                                                        du ha rett på ekstra omsorgsdager. Du kan svare ja på dette
                                                        spørsmålet dersom du har søkt og fått svar fra NAV om at du har
                                                        fått ekstra omsorgsdager.
                                                    </ExpandableInfo>
                                                </div>
                                            }
                                            feil={valueToFeilProps(
                                                barnInfo.kroniskSykt,
                                                state.resultViewData,
                                                validateKroniskSykt
                                            )}
                                            onChange={(evt, value) => {
                                                if (isYesOrNo(value)) {
                                                    dispatch(setKroniskSykt(YesOrNoToBool(value), barnInfo.id));
                                                }
                                            }}
                                            checked={toRadioValue(barnInfo.kroniskSykt.value)}
                                            radios={yesOrNoRadios(barnInfo.kroniskSykt.id)}
                                            className={'twoColumnPanelGruppe'}
                                        />
                                    </FormBlock>
                                )}

                                {barnetErOverTolvOgIkkeKroniskSykt(barnInfo) && (
                                    <FormBlock>
                                        <AlertStripeAdvarsel>
                                            For å få omsorgsdager for barn som er 13 år eller eldre, må du ha søkt og
                                            fått innvilget omsorgsdager fra NAV fordi barnet har en kronisk sykdom eller
                                            en funksjonshemning.
                                        </AlertStripeAdvarsel>
                                    </FormBlock>
                                )}

                                {shouldViewBorSammenQuestion(barnInfo) && (
                                    <FormBlock>
                                        <RadioPanelGruppe
                                            name={barnInfo.borSammen.id}
                                            legend={
                                                <div>
                                                    <Element>Bor barnet fast hos deg?</Element>
                                                    <ExpandableInfo title="Hva betyr dette?">
                                                        Barnet bor fast der barnet har folkeregistrert adresse. Hvis
                                                        foreldrene ikke bor sammen, men har en avtale om delt bosted bor
                                                        barnet fast hos begge foreldrene. Du kan svare ja hvis..
                                                    </ExpandableInfo>
                                                </div>
                                            }
                                            feil={valueToFeilProps(
                                                barnInfo.borSammen,
                                                state.resultViewData,
                                                validateBorSammen
                                            )}
                                            onChange={(evt, value) => {
                                                if (isYesOrNo(value)) {
                                                    dispatch(setBorSammen(YesOrNoToBool(value), barnInfo.id));
                                                }
                                            }}
                                            checked={toRadioValue(barnInfo.borSammen.value)}
                                            radios={yesOrNoRadios(barnInfo.borSammen.id)}
                                            className={'twoColumnPanelGruppe'}
                                        />
                                    </FormBlock>
                                )}

                                {/* TODO: Rydd opp det under.*/}
                                {state.barn.length === 1 && isVisibleAndBorIkkeSammen(barnInfo) && (
                                    <FormBlock>
                                        <AlertStripeAdvarsel>
                                            For å ha rett på omsorgsdager må barnet bo fast hos deg.
                                        </AlertStripeAdvarsel>
                                    </FormBlock>
                                )}

                                {state.barn.length > 1 && isVisibleAndBorIkkeSammen(barnInfo) && (
                                    <FormBlock>
                                        <AlertStripeAdvarsel>
                                            For å ha rett på omsorgsdager for dette barnet, må barnet bo fast hos deg.
                                        </AlertStripeAdvarsel>
                                    </FormBlock>
                                )}

                                {shouldViewAleneOmOmsorgenQuestion(barnInfo) && (
                                    <FormBlock>
                                        <RadioPanelGruppe
                                            name={barnInfo.aleneOmOmsorgen.id}
                                            legend={
                                                <div>
                                                    <Element>Er du alene om omsorgen med barnet?</Element>
                                                    <ExpandableInfo title="Hva betyr det å være alene om omsorgen?">
                                                        <Box>
                                                            Når det gjelder omsorgspenger, er du regnet som alene om
                                                            omsorgen hvis du ikke bor sammen med den andre forelderen,
                                                            og barnet bor fast bare hos deg. Dette gjelder også hvis du
                                                            får ny samboer eller ektefelle.
                                                        </Box>

                                                        <Box padBottom={'l'}>
                                                            Hvis du og den andre forelderen har en avtale om delt
                                                            bosted, hvor barnet bor fast hos dere begge, vil ingen av
                                                            dere bli regnet som alene om omsorgen.
                                                        </Box>

                                                        <Box>
                                                            {/* TODO: Legg inn at denne åpnes i ny fane*/}
                                                            <Lenke
                                                                href={
                                                                    'https://www.regjeringen.no/no/tema/familie-og-barn/innsiktsartikler/bosted-og-samvar/samvar/id749587/'
                                                                }>
                                                                Les mer om fast bosted og samvær
                                                            </Lenke>
                                                        </Box>
                                                    </ExpandableInfo>
                                                </div>
                                            }
                                            feil={valueToFeilProps(
                                                barnInfo.aleneOmOmsorgen,
                                                state.resultViewData,
                                                validateAleneOmOmsorgen
                                            )}
                                            onChange={(evt, value) => {
                                                if (isYesOrNo(value)) {
                                                    dispatch(setAleneOmOmsorgen(YesOrNoToBool(value), barnInfo.id));
                                                }
                                            }}
                                            checked={toRadioValue(barnInfo.aleneOmOmsorgen.value)}
                                            radios={yesOrNoRadios(barnInfo.aleneOmOmsorgen.id)}
                                            className={'twoColumnPanelGruppe'}
                                        />
                                    </FormBlock>
                                )}

                                {skalViseGåTilNesteBarnKnapp(barnInfo, index, state.barn.length) && (
                                    <FormBlock>
                                        <Knapp
                                            onClick={() => {
                                                const maybeNesteBarnInfo: BarnInfo | undefined = listeAvBarn[index + 1];
                                                if (maybeNesteBarnInfo) {
                                                    dispatch(setAktivtBarnPanel(maybeNesteBarnInfo.id));
                                                }
                                            }}>
                                            Neste barn
                                        </Knapp>
                                    </FormBlock>
                                )}
                            </BarnPanelView>
                        </FormBlock>
                    );
                })}
            </FormBlock>
            <ResultatArea resultView={state.resultViewData} dispatch={dispatch} />
        </FormBlock>
    );
};

export default ReducerKalkulator;

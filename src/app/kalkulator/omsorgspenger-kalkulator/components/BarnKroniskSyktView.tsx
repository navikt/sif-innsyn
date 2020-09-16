import { BarnInfo } from '../utils/types';
import { State } from '../utils/state';
import { Dispatch } from 'react';
import { Action, setKroniskSykt } from '../utils/actions';
import { shouldViewKroniskSyktQuestion, toRadioValue, yesOrNoRadios, YesOrNoToBool } from '../utils/viewUtils';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import ExpandableInfo from '@navikt/sif-common-core/lib/components/expandable-content/ExpandableInfo';
import { valueToFeilProps } from '../utils/componentUtils';
import { validateKroniskSykt } from '../utils/validationUtils';
import { isYesOrNo } from '../utils/typeguards';
import { barnetErOverTolvOgIkkeKroniskSykt } from '../utils/utils';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import * as React from 'react';

interface Props {
    barnInfo: BarnInfo;
    state: State;
    dispatch: Dispatch<Action>;
}

const BarnKroniskSyktView = ({ dispatch, barnInfo, state }: Props) => (
    <>
        {shouldViewKroniskSyktQuestion(barnInfo) && (
            <FormBlock>
                <RadioPanelGruppe
                    name={barnInfo.kroniskSykt.id}
                    legend={
                        <div>
                            <Element>
                                Har du fått ekstra omsorgsdager fordi barnet har en kronisk sykdom eller en
                                funksjonshemning?
                            </Element>
                            <ExpandableInfo title="Hva betyr dette?">
                                Hvis barnet har en kronisk sykdom eller en funksjonshemning kan du ha rett på ekstra
                                omsorgsdager. Du kan svare ja på dette spørsmålet dersom du har søkt og fått svar fra
                                NAV om at du har fått ekstra omsorgsdager.
                            </ExpandableInfo>
                        </div>
                    }
                    feil={valueToFeilProps(barnInfo.kroniskSykt, state.resultViewData, validateKroniskSykt)}
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
                    For å få omsorgsdager for barn som er 13 år eller eldre, må du ha søkt og fått innvilget
                    omsorgsdager fra NAV fordi barnet har en kronisk sykdom eller en funksjonshemning.
                </AlertStripeAdvarsel>
            </FormBlock>
        )}
    </>
);

export default BarnKroniskSyktView;

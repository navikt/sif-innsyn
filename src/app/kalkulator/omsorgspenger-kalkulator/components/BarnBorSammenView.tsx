import { BarnInfo } from '../utils/types';
import { State } from '../utils/state';
import { Dispatch } from 'react';
import { Action, setBorSammen } from '../utils/actions';
import { shouldViewBorSammenQuestion, toRadioValue, yesOrNoRadios, YesOrNoToBool } from '../utils/viewUtils';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import ExpandableInfo from '@navikt/sif-common-core/lib/components/expandable-content/ExpandableInfo';
import { valueToFeilProps } from '../utils/componentUtils';
import { validateBorSammen } from '../utils/validationUtils';
import { isYesOrNo } from '../utils/typeguards';
import { isVisibleAndBorIkkeSammen } from '../utils/utils';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import * as React from 'react';

interface Props {
    state: State;
    dispatch: Dispatch<Action>;
    barnInfo: BarnInfo;
}

const BarnBorSammenView = ({ state, dispatch, barnInfo }: Props) => (
    <>
        {shouldViewBorSammenQuestion(barnInfo) && (
            <FormBlock>
                <RadioPanelGruppe
                    name={barnInfo.borSammen.id}
                    legend={
                        <div>
                            <Element>Bor barnet fast hos deg?</Element>
                            <ExpandableInfo title="Hva betyr dette?">
                                Du kan svare ja på dette spørsmålet hvis barnet har folkeregistrertadresse hos deg,
                                eller om du har en avtale om delt bosted med den andre forelderen.
                            </ExpandableInfo>
                        </div>
                    }
                    feil={valueToFeilProps(barnInfo.borSammen, state.resultViewData, validateBorSammen)}
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

        {isVisibleAndBorIkkeSammen(barnInfo) && (
            <FormBlock>
                <AlertStripeAdvarsel>
                    {state.barn.length === 1
                        ? ' For å ha rett på omsorgsdager må barnet bo fast hos deg.'
                        : 'For å ha rett på omsorgsdager for dette barnet, må barnet bo fast hos deg.'}
                </AlertStripeAdvarsel>
            </FormBlock>
        )}
    </>
);

export default BarnBorSammenView;

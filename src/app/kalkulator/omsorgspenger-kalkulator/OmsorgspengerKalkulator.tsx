import * as React from 'react';
import { useReducer } from 'react';
import { KalkulatorReducer, reducer } from './utils/reducer';
import { createInitialState, State } from './utils/state';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { BarnInfo } from './utils/types';
import KalkulatorLogoAndTitle from './components/KalkulatorLogoAndTitle';
import ResultatArea from './components/ResultatArea';
import { panelSkalVæreÅpent } from './utils/viewUtils';
import BarnPanelView from './components/BarnPanelView';
import NbarnSelectView from './components/NBarnSelectView';
import IntroTextView from './components/IntroTextView';
import FlereBarnUtfyllingsInfoView from './components/FlereBarnUtfyllingsInfoView';
import BarnFodselsdatoView from './components/BarnFodselsdatoView';
import BarnKroniskSyktView from './components/BarnKroniskSyktView';
import BarnBorSammenView from './components/BarnBorSammenView';
import BarnAleneOmOmsorgenView from './components/BarnAleneOmOmsorgenView';
import MaybeNesteBarnKnapp from './components/MaybeNesteBarnKnapp';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import '@navikt/sif-common-formik/lib/styles/nav-frontend-skjema-extension.less';
import './OmsorgspengerKalkulator.less';

export interface Props {
    initialBarnListe?: BarnInfo[];
}

const OmsorgspengerKalkulator = ({ initialBarnListe }: Props) => {
    const [state, dispatch] = useReducer<KalkulatorReducer>(reducer, createInitialState(initialBarnListe || []));
    const { nBarnMaks, barn }: State = state;

    return (
        <Page title={'Omsorgspenger kalkulator'}>
            <FormBlock paddingBottom={'xxl'}>
                <FormBlock>
                    <KalkulatorLogoAndTitle />
                    <IntroTextView nBarn={state.barn.length} />
                    <NbarnSelectView state={state} dispatch={dispatch} nBarnMaks={nBarnMaks} />
                </FormBlock>
                <FlereBarnUtfyllingsInfoView nBarn={state.barn.length} />
                <FormBlock>
                    {barn.map((barnInfo: BarnInfo, index: number, listeAvBarn: BarnInfo[]) => {
                        return (
                            <FormBlock key={index}>
                                <BarnPanelView
                                    index={index}
                                    length={state.barn.length}
                                    barnInfo={barnInfo}
                                    apen={panelSkalVæreÅpent(barnInfo, state)}>
                                    <BarnFodselsdatoView barnInfo={barnInfo} dispatch={dispatch} state={state} />
                                    <BarnKroniskSyktView barnInfo={barnInfo} state={state} dispatch={dispatch} />
                                    <BarnBorSammenView state={state} dispatch={dispatch} barnInfo={barnInfo} />
                                    <BarnAleneOmOmsorgenView state={state} dispatch={dispatch} barnInfo={barnInfo} />
                                    <MaybeNesteBarnKnapp
                                        barnInfo={barnInfo}
                                        index={index}
                                        listeAvBarn={listeAvBarn}
                                        dispatch={dispatch}
                                    />
                                </BarnPanelView>
                            </FormBlock>
                        );
                    })}
                </FormBlock>
                <ResultatArea resultView={state.resultViewData} dispatch={dispatch} />
            </FormBlock>
        </Page>
    );
};

export default OmsorgspengerKalkulator;

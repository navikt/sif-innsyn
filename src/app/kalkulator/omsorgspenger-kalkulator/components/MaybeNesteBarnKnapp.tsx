import { BarnInfo } from '../utils/types';
import { skalViseGåTilNesteBarnKnapp } from '../utils/viewUtils';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { Knapp } from 'nav-frontend-knapper';
import { Action, setAktivtBarnPanel } from '../utils/actions';
import * as React from 'react';
import { Dispatch } from 'react';

interface Props {
    barnInfo: BarnInfo;
    index: number;
    listeAvBarn: BarnInfo[];
    dispatch: Dispatch<Action>;
}

const MaybeNesteBarnKnapp = ({ dispatch, index, listeAvBarn, barnInfo }: Props) => (
    <>
        {skalViseGåTilNesteBarnKnapp(barnInfo, index, listeAvBarn.length) && (
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
    </>
);

export default MaybeNesteBarnKnapp;

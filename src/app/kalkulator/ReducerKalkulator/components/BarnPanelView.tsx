import * as React from 'react';
import { barnInfoPanelIdBody } from '../constants';
import { isRight } from 'fp-ts/lib/Either';
import { validateBarnInfo } from '../utils';
import SvgSuccessCircle from '../../svgs/SvgSuccessCircle';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { BarnInfo } from '../types';
import { PropsWithChildren } from 'react';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';

const bem = bemUtils('BarnPanelView');

interface Props {
    index: number;
    length: number;
    barnInfo: BarnInfo;
}

const BarnPanelView: React.FC<Props> = ({ index, length, barnInfo, children }: PropsWithChildren<Props>) => {
    if (length === 1) {
        return (
            <div className={bem.element('border-top')}>
                <FormBlock>{children}</FormBlock>
            </div>
        );
    }

    return (
        <Ekspanderbartpanel
            id={barnInfoPanelIdBody + index}
            tittel={
                <div className={bem.element('ekspanderbarnpanel-tittel-wrapper')}>
                    <div>Barn {index + 1}</div>
                    {isRight(validateBarnInfo(barnInfo)) && (
                        <div>
                            <SvgSuccessCircle />
                        </div>
                    )}
                </div>
            }
            apen={true}
            key={index}>
            {children}
        </Ekspanderbartpanel>
    );
};

export default BarnPanelView;

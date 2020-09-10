import * as React from 'react';
import { barnInfoPanelIdBody } from '../constants';
import { isRight } from 'fp-ts/lib/Either';
import { validateBarnInfo } from '../utils';
import SvgSuccessCircle from '../../svgs/SvgSuccessCircle';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { BarnInfo } from '../types';
import { PropsWithChildren } from 'react';

interface Props {
    index: number;
    length: number;
    barnInfo: BarnInfo;
}

const EkspanderbartPanelForListeAvBarn: React.FC<Props> = ({
    index,
    length,
    barnInfo,
    children,
}: PropsWithChildren<Props>) => {
    if (length === 1) {
        return <div>children</div>;
    }

    return (
        <Ekspanderbartpanel
            id={barnInfoPanelIdBody + index}
            tittel={
                <div className={'omsorgsdagerkalkulator--ekspanderbarnpanel-tittel-wrapper'}>
                    <div className={'omsorgsdagerkalkulator--ekspanderbarnpanel-tittel-left'}>Barn {index + 1}</div>
                    {isRight(validateBarnInfo(barnInfo)) && (
                        <div className={'omsorgsdagerkalkulator--ekspanderbarnpanel-tittel-right'}>
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

export default EkspanderbartPanelForListeAvBarn;

import * as React from 'react';
import SvgChild from '../../svgs/SvgChild';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import './ResultBox.less';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';

export const bem = bemUtils('OmsCalcResultBox');

interface Props {
    putPropsHere?: string;
}

const ResultBox: React.FC<Props> = (props: Props) => {
    return (
        <FormBlock>
            <div className={bem.element('result-wrapper')}>
                <div className={bem.element('result-top-arrow-wrapper')}>
                    <div className={bem.element('result-top-arrow')}></div>
                </div>
                <div className={bem.element('result-content')}>
                    <div className={bem.element('result-child-wrapper')}>
                        <SvgChild />
                    </div>
                    <div className={bem.element('result-content-wrapper')}>
                        <div>
                            Beregningen baserer seg på svarene du har lagt inn i kalkulatoren. Det betyr at resultatet
                            er avhengig av at du har gitt riktige opplysninger. Ut fra opplysningene du har gitt, har du
                        </div>
                        <div>20 omsorgsdager fra 1. juli 2020 – 31.12.2020</div>
                        <div>Vis detaljer for utregning</div>
                        <div>Skjul detaljer for utregning</div>
                        <div>
                            Du får 20 dager fordi du er alene om omsorgen for ett barn Du får 15 dager fordi du har to
                            barn
                        </div>
                        <div>
                            Hvis du etter 1. juli 2020 har brukt omsorgsdager, eller delt dager med en annen, må du
                            trekke fra disse dagene selv.
                        </div>
                    </div>
                </div>
            </div>
        </FormBlock>
    );
};

export default ResultBox;

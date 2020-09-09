import * as React from 'react';
import SvgChild from '../../svgs/SvgChild';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import './ResultBox.less';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import Omsorgsprinsipper from '@navikt/omsorgspenger-kalkulator/lib/types/Omsorgsprinsipper';
import ExpandableInfo from '@navikt/sif-common-core/lib/components/expandable-content/ExpandableInfo';
import { Element } from 'nav-frontend-typografi';

export const bem = bemUtils('OmsCalcResultBox');

interface Props {
    resultat: Omsorgsprinsipper;
}

const ResultBox: React.FC<Props> = ({ resultat }: Props) => {
    const { grunnrett, kroniskSykt, aleneomsorg, aleneomsorgKroniskSyke } = resultat;
    const sumDager: number =
        grunnrett.normaldager + kroniskSykt.normaldager + aleneomsorg.normaldager + aleneomsorgKroniskSyke.normaldager;

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
                        <FormBlock margin={'none'}>
                            Beregningen baserer seg på svarene du har lagt inn i kalkulatoren. Det betyr at resultatet
                            er avhengig av at du har gitt riktige opplysninger. Ut fra opplysningene du har gitt, har du
                        </FormBlock>
                        <FormBlock>
                            <Element>{sumDager} omsorgsdager fra 1. juli 2020 – 31.12.2020</Element>
                        </FormBlock>

                        <FormBlock>
                            <ExpandableInfo
                                title="Vis detaljer for utregning"
                                closeTitle={'Skjul detaljer for utregning'}>
                                <div>grunnrett: {resultat.grunnrett.normaldager}</div>
                                <div>kroniskSykt: {resultat.kroniskSykt.normaldager}</div>
                                <div>aleneomsorgKroniskSyke: {resultat.aleneomsorgKroniskSyke.normaldager}</div>
                                <div>aleneomsorg: {resultat.aleneomsorg.normaldager}</div>
                            </ExpandableInfo>
                        </FormBlock>

                        <FormBlock>
                            Du får 20 dager fordi du er alene om omsorgen for ett barn Du får 15 dager fordi du har to
                            barn
                        </FormBlock>
                        <FormBlock>
                            Hvis du etter 1. juli 2020 har brukt omsorgsdager, eller delt dager med en annen, må du
                            trekke fra disse dagene selv.
                        </FormBlock>
                    </div>
                </div>
            </div>
        </FormBlock>
    );
};

export default ResultBox;

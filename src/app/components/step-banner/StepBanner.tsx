import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import Banner from '../../components/banner/Banner';
import bemHelper from '../../utils/bemUtils';
import './stepBanner.less';

interface Props {
    text: string;
}

const bem = bemHelper('stepBanner');
const StepBanner: React.FunctionComponent<Props> = ({ text }: Props) => (
    <Banner size="small" className={bem.block}>
        <Undertittel tag="h2">{text}</Undertittel>
    </Banner>
);

export default StepBanner;

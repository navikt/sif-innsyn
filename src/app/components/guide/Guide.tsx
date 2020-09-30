import React from 'react';
import Veilederpanel, { VeilederpanelProps } from 'nav-frontend-veilederpanel';
import bemUtils from '../../utils/bemUtils';
import './guide.less';

type Fargetema = 'normal' | 'info' | 'suksess' | 'advarsel' | 'feilmelding';
interface Props extends VeilederpanelProps {
    children: React.ReactNode;
    fullHeight?: boolean;
    fargetema?: Fargetema;
}

const bem = bemUtils('guide');

const Guide = (props: Props) => {
    const { fullHeight = false, fargetema = 'normal', ...rest } = props;
    return (
        <div
            className={bem.classNames(
                bem.block,
                bem.modifierConditional('fullHeight', fullHeight),
                bem.modifier(fargetema)
            )}>
            <Veilederpanel {...rest} />
        </div>
    );
};

export default Guide;

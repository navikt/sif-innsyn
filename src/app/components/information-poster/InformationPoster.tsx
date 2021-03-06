import React from 'react';
import { default as NFCounsellorPanel } from 'nav-frontend-veilederpanel';
import bemUtils from '../../utils/bemUtils';
import InformationIcon from './InformationIcon';
import './informationPoster.less';

const bem = bemUtils('informationPoster');

interface Props {
    children?: React.ReactNode;
}

const InformationPoster: React.FunctionComponent = ({ children }: Props) => (
    <div className={bem.block}>
        <NFCounsellorPanel svg={<InformationIcon />} type="plakat" kompakt={true}>
            {children}
        </NFCounsellorPanel>
    </div>
);

export default InformationPoster;

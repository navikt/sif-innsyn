import React from 'react';
import bemUtils from '../../utils/bemUtils';
import './processDescription.less';

interface Props {
    steps: React.ReactNode[];
}

const cls = bemUtils('processDescription');

const ProcessDescription: React.FC<Props> = ({ steps }: Props) => (
    <div className={cls.block}>
        {steps.map((step, index) => (
            <div key={index} className={cls.element('step')}>
                {step}
            </div>
        ))}
    </div>
);

export default ProcessDescription;

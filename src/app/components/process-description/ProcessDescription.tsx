import React from 'react';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import './processDescription.less';

export interface ProcessDescriptionProps {
    steps: React.ReactNode[];
}

const cls = bemUtils('processDescription');

const ProcessDescription: React.FC<ProcessDescriptionProps> = ({ steps }) => (
    <div className={cls.block}>
        {steps.map((step, index) => (
            <div key={index} className={cls.element('step')}>
                {step}
            </div>
        ))}
    </div>
);

export default ProcessDescription;

import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ProcessDescription, { ProcessDescriptionProps } from '../app/components/process-description/ProcessDescription';

export default {
    title: 'Process description',
    component: ProcessDescription,
} as Meta;

export const Pleiepenger: Story<ProcessDescriptionProps> = (args) => <ProcessDescription {...args} />;
Pleiepenger.args = {
    wat: () => {},
};

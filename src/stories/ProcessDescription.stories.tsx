import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ProcessDescription, { ProcessDescriptionProps } from '../app/components/process-description/ProcessDescription';

export default {
    title: 'Process description',
    component: ProcessDescription,
} as Meta;

const Template: Story<ProcessDescriptionProps> = (args) => <ProcessDescription {...args} />;

export const Hmmm = Template.bind({});
Hmmm.args = {
    wat: () => {},
};

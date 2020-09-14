import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
    title: 'Placeholder',
    component: () => <div />,
} as Meta;

export interface PlaceholderProps {
    wat: () => void;
}

const Placeholder: React.FC<PlaceholderProps> = ({ wat }) => <div>omg</div>;

const Template: Story<PlaceholderProps> = (args) => <Placeholder {...args} />;

export const Hmmm = Template.bind({});
Hmmm.args = {
    wat: () => {},
};

import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ExpandableInfo, { ExpandableInfoProps } from '../app/components/expandable-info/ExpandableInfo';

export default {
    title: 'Expandable info',
    component: ExpandableInfo,
} as Meta;

export const Main: Story<ExpandableInfoProps> = (args) => <ExpandableInfo {...args} />;
Main.args = {
    title: 'Hvilke endringer må jeg si fra om?',
    children: (
        <>
            <p>For å unngå feil må du straks gi beskjed hvis:</p>
            <ul>
                <li> barnet ikke lenger har behov for kontinuerlig omsorg og pleie.</li>
                <li>barnet begynner eller øker tiden i et omsorgstilbud.</li>
                <li>du begynner å jobbe igjen, eller øker antall arbeidstimer.</li>
                <li>omsorgen for barnet er overført til andre, helt eller delvis.</li>
                <li>du får omsorgsstønad fra kommunen.</li>
                <li>du skal ha lovbestemt ferie. Hva er lovbestemt ferie?</li>
                <li>du skal til utlandet.</li>
            </ul>
            <p>
                Du melder fra om endringer ved å skrive en beskjed til oss. Du kan også ringe 55 55 33 33, tastevalg 3.
            </p>
        </>
    ),
};

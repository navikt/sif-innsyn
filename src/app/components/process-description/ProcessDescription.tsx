import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import Chevron from 'nav-frontend-chevron';
import ExpandableInfo from '@navikt/sif-common-core/lib/components/expandable-content/ExpandableInfo';

export interface ProcessDescriptionProps {}

const ProcessDescription: React.FC<ProcessDescriptionProps> = () => (
    <ol>
        <li>
            <Undertittel>Du har sendt søknad med legeerklæring</Undertittel>
            <p>
                Hvis du ikke har sendt legeerklæring med søknaden din, må du <a href="#TODO">ettersende denne</a> så
                snart du kan
            </p>
        </li>
        <li>
            <Undertittel>Arbeidsgiveren din sender inntektsmelding til oss</Undertittel>

            <KnappBase type="flat" kompakt>
                <span>Hvorfor</span>
                <Chevron type="ned" />
            </KnappBase>

            <ExpandableInfo title="Hva er lovbestemt ferie?">wat</ExpandableInfo>
        </li>
    </ol>
);

export default ProcessDescription;

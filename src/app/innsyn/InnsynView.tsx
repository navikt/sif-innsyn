import * as React from 'react';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import StepBanner from '@navikt/sif-common-core/lib/components/step-banner/StepBanner';
import { useIntl } from 'react-intl';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { Essentials } from '../types/types';

interface Props {
    essentials: Essentials;
}

const bem = bemUtils('innsynPage');

const InnsynView: React.FC<Props> = ({ essentials }: Props) => {
    const intl = useIntl();
    return (
        <Page
            className={bem.block}
            title={intlHelper(intl, 'innsyn.root.tittel')}
            topContentRenderer={(): JSX.Element => <StepBanner text={intlHelper(intl, 'innsyn.root.stegTittel')} />}>
            Innsyn logged in. Hi {essentials.person.fornavn} {essentials.person.etternavn} :)
            <div>{JSON.stringify(essentials, null, 4)}</div>
        </Page>
    );
};

export default InnsynView;

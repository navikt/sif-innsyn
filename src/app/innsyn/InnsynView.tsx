import * as React from 'react';
import { Søkerdata } from '../types/søkerdataTypes';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import StepBanner from '@navikt/sif-common-core/lib/components/step-banner/StepBanner';
import { useIntl } from 'react-intl';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';

interface Props {
    søkerdata: Søkerdata;
}

const bem = bemUtils('innsynPage');

const InnsynView: React.FC<Props> = ({ søkerdata }: Props) => {
    const intl = useIntl();
    return (
        <Page
            className={bem.block}
            title={intlHelper(intl, 'innsyn.root.tittel')}
            topContentRenderer={(): JSX.Element => <StepBanner text={intlHelper(intl, 'innsyn.root.stegTittel')} />}>
            Innsyn logged in. Hi {søkerdata.person.fornavn} {søkerdata.person.etternavn} :)
        </Page>
    );
};

export default InnsynView;

import * as React from 'react';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import StepBanner from '@navikt/sif-common-core/lib/components/step-banner/StepBanner';
import { useIntl } from 'react-intl';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { SøkerApiResponse } from '../types/apiTypes/søkerTypes';
import ReactJson from 'react-json-view';
import { Søknad, SøknadApiResponse } from '../types/apiTypes/søknadTypes';

interface Props {
    bruker?: SøkerApiResponse;
    søknad?: SøknadApiResponse;
}

const bem = bemUtils('innsynPage');

const InnsynView: React.FC<Props> = ({ bruker, søknad }: Props) => {
    const intl = useIntl();
    return (
        <Page
            className={bem.block}
            title={intlHelper(intl, 'innsyn.root.tittel')}
            topContentRenderer={(): JSX.Element => <StepBanner text={intlHelper(intl, 'innsyn.root.stegTittel')} />}>
            {bruker && (
                <div>
                    Innsyn logged in. Hi {bruker.fornavn} {bruker.etternavn} :)
                    <div>
                        <ReactJson src={bruker} />
                    </div>
                </div>
            )}
            {søknad && (
                <div>
                    {søknad.map((søknad: Søknad) => (
                        <div>{søknad.søknadstype}</div>
                    ))}
                    <ReactJson src={søknad} />
                </div>
            )}
        </Page>
    );
};

export default InnsynView;

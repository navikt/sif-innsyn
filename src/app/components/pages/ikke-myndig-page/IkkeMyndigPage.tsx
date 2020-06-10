import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import { Innholdstittel } from 'nav-frontend-typografi';
import getLenker from 'app/lenker';
import './ikkeMyndigPage.less';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import FrontPageBanner from '@navikt/sif-common-core/lib/components/front-page-banner/FrontPageBanner';
import Box from '@navikt/sif-common-core/lib/components/box/Box';

const IkkeMyndigPage: React.FC = (): JSX.Element => {
    const intl = useIntl();
    return (
        <Page
            className="ikkeMyndigPage"
            title={intlHelper(intl, 'page.ikkeMyndig.sidetittel')}
            topContentRenderer={(): JSX.Element => (
                <FrontPageBanner
                    bannerSize="xlarge"
                    counsellorWithSpeechBubbleProps={{
                        strongText: intlHelper(intl, 'page.ikkeMyndig.banner.tittel'),
                        normalText: intlHelper(intl, 'page.ikkeMyndig.banner.tekst'),
                        bottomContent: (
                            <Lenke href={getLenker(intl.locale).papirskjemaPrivat} target="_blank">
                                <FormattedMessage id="page.ikkeMyndig.banner.lastNed" />
                            </Lenke>
                        ),
                    }}
                />
            )}>
            <Box margin="xxxl">
                <Innholdstittel>
                    <FormattedMessage id="page.ikkeMyndig.tittel" />
                </Innholdstittel>
            </Box>
        </Page>
    );
};

export default IkkeMyndigPage;

import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import Box from '../../../components/elements/box/Box';
import Title from '../../../components/elements/title/Title';
import ExpandableInfo from '../../../components/expandable-content/ExpandableInfo';
import ProcessDescription from '../../../components/process-description/ProcessDescription';
import getLenker from '../../../lenker';
import intlHelper from '../../../utils/intlUtils';
import FormattedHtmlMessage from '../../../components/formatted-html-message/FormattedHtmlMessage';
import Knappelenke from '../../../components/knappelenke/Knappelenke';
import bemUtils from '../../../utils/bemUtils';
import './pleiepengesakSøknad.less';

const bem = bemUtils('ppSoknad');
interface StepProps {
    title: string | JSX.Element;
    children?: React.ReactNode;
}

const Step = ({ title, children }: StepProps): JSX.Element => (
    <div>
        <Title tag="h3" titleType="element">
            {title}
        </Title>
        {children && <Box margin="s">{children}</Box>}
    </div>
);

const InfoEtterSendtSøknad = () => {
    const intl = useIntl();
    const lenker = getLenker(intl.locale);
    return (
        <>
            <Box className={bem.element('infoEttersend')}>
                <Box className={bem.element('infoEttersendTittel')}>
                    <Title tag="h2">{intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.title')}</Title>
                </Box>

                <Box margin="l">
                    <ProcessDescription
                        steps={[
                            <Step
                                key="legeerklæring"
                                title={intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step1.title')}>
                                <p>
                                    <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.step1.text.1" />{' '}
                                    <Lenke href={lenker.ettersending}>
                                        <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.step1.text.2" />
                                    </Lenke>{' '}
                                    <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.step1.text.3" />
                                </p>
                            </Step>,
                            <Step
                                key="inntektsmelding"
                                title={intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step2.title')}>
                                <ExpandableInfo
                                    title={intlHelper(
                                        intl,
                                        'page.pleiepengesakSøknad.infoEtterSøknad.step2.text.title'
                                    )}>
                                    <FormattedHtmlMessage
                                        tagName="p"
                                        id="page.pleiepengesakSøknad.infoEtterSøknad.step2.text.1.html"
                                    />
                                    <FormattedHtmlMessage
                                        tagName="p"
                                        id="page.pleiepengesakSøknad.infoEtterSøknad.step2.text.2.html"
                                    />
                                </ExpandableInfo>
                            </Step>,
                            <Step
                                key="behandling"
                                title={intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step3.title')}>
                                <p>
                                    <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.step3.text.1" />
                                    <br />
                                    <Lenke href={lenker.saksbehandlingstid}>
                                        <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.step3.text.2" />
                                    </Lenke>
                                </p>
                            </Step>,
                            <Step
                                key="abc"
                                title={intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step4.title')}>
                                <ExpandableInfo
                                    title={intlHelper(
                                        intl,
                                        'page.pleiepengesakSøknad.infoEtterSøknad.step4.text.title'
                                    )}>
                                    <ul>
                                        <FormattedMessage
                                            tagName="li"
                                            id="page.pleiepengesakSøknad.infoEtterSøknad.step4.text.1"
                                        />
                                        <FormattedMessage
                                            tagName="li"
                                            id="page.pleiepengesakSøknad.infoEtterSøknad.step4.text.2"
                                        />
                                        <FormattedMessage
                                            tagName="li"
                                            id="page.pleiepengesakSøknad.infoEtterSøknad.step4.text.3"
                                        />
                                        <FormattedMessage
                                            tagName="li"
                                            id="page.pleiepengesakSøknad.infoEtterSøknad.step4.text.4"
                                        />
                                        <FormattedMessage
                                            tagName="li"
                                            id="page.pleiepengesakSøknad.infoEtterSøknad.step4.text.5"
                                        />
                                        <FormattedMessage
                                            tagName="li"
                                            id="page.pleiepengesakSøknad.infoEtterSøknad.step4.text.6"
                                        />
                                        <FormattedMessage
                                            tagName="li"
                                            id="page.pleiepengesakSøknad.infoEtterSøknad.step4.text.7"
                                        />
                                    </ul>
                                    <p>
                                        <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.step4.text.8.a.1" />{' '}
                                        <Lenke href={lenker.minInnboksSkrivMelding}>
                                            <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.step4.text.8.a.2" />
                                        </Lenke>
                                        <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.step4.text.8.a.3" />{' '}
                                        <span style={{ whiteSpace: 'nowrap' }}>
                                            <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.step4.text.8.b" />
                                        </span>
                                        <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.step4.text.8.c" />
                                    </p>
                                </ExpandableInfo>
                            </Step>,
                            <Step
                                key="svar"
                                title={intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step5.title.1')}>
                                <p>
                                    <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.step5.title.2" />{' '}
                                    <Lenke href={lenker.ettersending}>
                                        {intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step5.title.3')}
                                    </Lenke>{' '}
                                    {intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step5.title.4')}
                                </p>
                            </Step>,
                            <Step
                                key="saksoversikt"
                                title={intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step6.title.1')}>
                                {intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step6.title.2')}{' '}
                                <Lenke href={getLenker().dineUtbetalinger}>
                                    {intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.step6.title.3')}
                                </Lenke>
                                <ExpandableInfo
                                    title={intlHelper(
                                        intl,
                                        'page.pleiepengesakSøknad.infoEtterSøknad.step6.text.title'
                                    )}>
                                    <FormattedMessage
                                        tagName="p"
                                        id="page.pleiepengesakSøknad.infoEtterSøknad.step6.text.1"
                                    />
                                    <FormattedMessage
                                        tagName="p"
                                        id="page.pleiepengesakSøknad.infoEtterSøknad.step6.text.2"
                                    />
                                </ExpandableInfo>
                            </Step>,
                        ]}
                    />
                </Box>
            </Box>
            <Box className={bem.element('infoEttersendKnappeBox')}>
                <Title>{intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.melde.title')}</Title>
                <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.melde.text.1" />
                <br />
                <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.melde.text.2" />
                <Box margin="l">
                    <Knappelenke href={getLenker().minInnboksSkrivMelding}>
                        <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.melde.knappTitle" />
                    </Knappelenke>
                </Box>
            </Box>
            <Box className={bem.element('infoEttersendKnappeBox')}>
                <Title>{intlHelper(intl, 'page.pleiepengesakSøknad.infoEtterSøknad.søkePåNytt.title')}</Title>

                <FormattedHtmlMessage id="page.pleiepengesakSøknad.infoEtterSøknad.søkePåNytt.tekst1.html" />
                <Box margin="l">
                    <Knappelenke href={getLenker().pleiepenger}>
                        <FormattedMessage id="page.pleiepengesakSøknad.infoEtterSøknad.søkePåNytt.knappTitle" />
                    </Knappelenke>
                </Box>
            </Box>
        </>
    );
};

export default InfoEtterSendtSøknad;

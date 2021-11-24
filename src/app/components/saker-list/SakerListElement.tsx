import React from 'react';
import { Arbeidsgiver, Dokument, Organisasjon, Søknad, Søknadstype } from '../../types/apiTypes/søknadTypes';
import bemUtils from '../../utils/bemUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Box from '../elements/box/Box';
import intlHelper from '../../utils/intlUtils';
import SoknadInfo from '../soknad-info/SoknadInfo';
import { getEnvironmentVariable } from '../../utils/envUtils';
import { FileContentIcon } from '../../svg/FellesIkoner';
import Lenke from 'nav-frontend-lenker';
import { isArray } from 'lodash';
import { Normaltekst } from 'nav-frontend-typografi';
import './sakerListElement.less';
import { getPrettyDate } from '../pretty-date/PrettyDate';
interface Props {
    søknad: Søknad;
}

export const bem = bemUtils('sakerListElement');

export const getApiUrlBySoknadIdOgOrgnummer = (soknadID: string, organisasjonsnummer: string): string => {
    return `${getEnvironmentVariable(
        'API_URL'
    )}/soknad/${soknadID}/arbeidsgivermelding?organisasjonsnummer=${organisasjonsnummer}`;
};
const SakerListElement = ({ søknad }: Props) => {
    const intl = useIntl();

    const harArbeidsgiver = () => {
        if ('arbeidsgivere' in søknad.søknad) {
            return 'organisasjoner' in søknad.søknad.arbeidsgivere
                ? søknad.søknad.arbeidsgivere.organisasjoner && søknad.søknad.arbeidsgivere.organisasjoner.length > 0
                : søknad.søknad.arbeidsgivere &&
                      søknad.søknad.arbeidsgivere.length > 0 &&
                      søknad.søknad.arbeidsgivere.some((arbeidsgiver) => !arbeidsgiver.sluttetFørSøknadsperiode);
        }
        return false;
    };

    const mapOrganisasjoner = (organisasjon: Organisasjon | Arbeidsgiver) => {
        return (
            <li key={organisasjon.organisasjonsnummer} className={bem.element('listElement')}>
                <Lenke
                    target="_blank"
                    href={getApiUrlBySoknadIdOgOrgnummer(søknad.søknadId, organisasjon.organisasjonsnummer)}>
                    <FileContentIcon />
                    <span>
                        <FormattedMessage
                            id="page.pleiepengesakSøknad.ekspanderbartpanel1.list.itemName"
                            values={{
                                organisasjonsnavn: organisasjon.navn,
                            }}
                        />
                    </span>
                </Lenke>
            </li>
        );
    };

    const mapDokumenter = (dokument: Dokument, date: string) => {
        return (
            <li key={dokument.dokumentInfoId} className={bem.element('listElement')}>
                <Lenke
                    target="_blank"
                    href={`${dokument.url}?dokumentTittel=${
                        dokument.tittel
                    } mottatt ${date}.${dokument.filtype.toLowerCase()}`}>
                    <FileContentIcon />
                    <span>{`${dokument.tittel} (PDF)`}</span>
                </Lenke>
            </li>
        );
    };

    // TODO se på utils
    const tittel = () => {
        switch (søknad.søknadstype) {
            case Søknadstype.PP_SYKT_BARN:
                return intlHelper(intl, 'page.dinOversikt.saker.sakstype.ppSøknad');
            case Søknadstype.PP_ETTERSENDING:
                return intlHelper(intl, 'page.dinOversikt.saker.sakstype.pp.ettersendelse');
            case Søknadstype.PP_ENDRINGSMELDING:
                return (
                    <FormattedMessage
                        id="page.dinOversikt.saker.sakstype.endringsMelding"
                        values={{ type: 'Arbeidstid' }}
                    />
                );
        }
    };
    return (
        <Box margin="m">
            <Ekspanderbartpanel
                tittel={
                    <>
                        <div>{tittel()}</div>
                        <span>
                            <SoknadInfo søknad={søknad} />
                        </span>
                    </>
                }>
                <Box margin="l">
                    {søknad.dokumenter && søknad.dokumenter.length > 0 && (
                        <ul className={bem.element('no-bullets')}>
                            {søknad.dokumenter.map((dokument) =>
                                mapDokumenter(dokument, getPrettyDate(søknad.søknad.mottatt, 'dayDateAndTimeShort'))
                            )}
                        </ul>
                    )}
                    {(søknad.dokumenter === undefined || søknad.dokumenter.length === 0) && (
                        <Normaltekst>
                            {intlHelper(intl, 'page.dinOversikt.saker.sakerlistElement.dokumenter.ingenDokumenter')}
                        </Normaltekst>
                    )}
                </Box>

                {søknad.søknadstype === Søknadstype.PP_SYKT_BARN && harArbeidsgiver() && (
                    <Box margin="xl">
                        <Normaltekst style={{ fontWeight: 'bold' }}>
                            <FormattedMessage id="page.dinOversikt.saker.ppSøknad.bekreftelseTilArbeidsgiver.title" />
                        </Normaltekst>
                        <Normaltekst>
                            <FormattedMessage id="page.dinOversikt.saker.ppSøknad.bekreftelseTilArbeidsgiver.info" />
                        </Normaltekst>

                        <ul className={bem.element('no-bullets')}>
                            {'arbeidsgivere' in søknad.søknad &&
                                'organisasjoner' in søknad.søknad.arbeidsgivere &&
                                søknad.søknad.arbeidsgivere.organisasjoner.map((organisasjon) =>
                                    mapOrganisasjoner(organisasjon)
                                )}
                            {'arbeidsgivere' in søknad.søknad &&
                                isArray(søknad.søknad.arbeidsgivere) &&
                                søknad.søknad.arbeidsgivere.map(
                                    (organisasjon) =>
                                        !organisasjon.sluttetFørSøknadsperiode && mapOrganisasjoner(organisasjon)
                                )}
                        </ul>
                    </Box>
                )}
            </Ekspanderbartpanel>
        </Box>
    );
};

export default SakerListElement;

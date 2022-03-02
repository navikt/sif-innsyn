import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { isArray } from 'lodash';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FileContentIcon } from '../../svg/FellesIkoner';
import { Arbeidsgiver, Dokument, Organisasjon, Søknad, Søknadstype } from '../../types/apiTypes/søknadTypes';
import bemUtils from '../../utils/bemUtils';
import { getEnvironmentVariable } from '../../utils/envUtils';
import intlHelper from '../../utils/intlUtils';
import Box from '../elements/box/Box';
import SoknadInfo from '../soknad-info/SoknadInfo';
import './sakerListElement.less';

interface Props {
    søknad: Søknad;
}

const bem = bemUtils('sakerListElement');

const getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer = (soknadID: string, organisasjonsnummer: string): string => {
    return `${getEnvironmentVariable(
        'API_URL'
    )}/soknad/${soknadID}/arbeidsgivermelding?organisasjonsnummer=${organisasjonsnummer}`;
};

const getSøknadDokumentFilnavn = (dokument: Dokument, mottattDato: Date): string => {
    const mottatt = dayjs(mottattDato).format('DD-MM-YYYY HH:mm');
    const filnavn = `${dokument.tittel} (${mottatt}).${dokument.filtype.toLowerCase()}`;
    return encodeURIComponent(filnavn);
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
            <li key={organisasjon.organisasjonsnummer}>
                <Lenke
                    target="_blank"
                    href={getArbeidsgivermeldingApiUrlBySoknadIdOgOrgnummer(
                        søknad.søknadId,
                        organisasjon.organisasjonsnummer
                    )}>
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

    const mapDokumenter = (dokument: Dokument, date: Date) => {
        return (
            <li key={dokument.dokumentInfoId}>
                <Lenke
                    target="_blank"
                    href={`${dokument.url}?dokumentTittel=${getSøknadDokumentFilnavn(dokument, date)}`}>
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
                        <Undertittel tag="h3">{tittel()}</Undertittel>
                        <span>
                            <SoknadInfo søknad={søknad} />
                        </span>
                    </>
                }
                className={bem.block}>
                <Box margin="l">
                    {søknad.dokumenter && søknad.dokumenter.length > 0 && (
                        <ul>
                            {søknad.dokumenter.map(
                                (dokument) => mapDokumenter(dokument, søknad.søknad.mottatt) //getPrettyDate(søknad.søknad.mottatt, 'dayDateAndTimeShort'))
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
                        <Normaltekst tag="h4" style={{ fontWeight: 'bold' }}>
                            <FormattedMessage id="page.dinOversikt.saker.ppSøknad.bekreftelseTilArbeidsgiver.title" />
                        </Normaltekst>
                        <Normaltekst>
                            <FormattedMessage id="page.dinOversikt.saker.ppSøknad.bekreftelseTilArbeidsgiver.info" />
                        </Normaltekst>

                        <ul>
                            {'arbeidsgivere' in søknad.søknad &&
                                'organisasjoner' in søknad.søknad.arbeidsgivere &&
                                søknad.søknad.arbeidsgivere.organisasjoner.map((organisasjon) =>
                                    mapOrganisasjoner(organisasjon)
                                )}
                        </ul>
                        <ul>
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

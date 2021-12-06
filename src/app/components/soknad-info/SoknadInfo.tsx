import React from 'react';
import { Søknad, Søknadstype } from '../../types/apiTypes/søknadTypes';
import bemUtils from '../../utils/bemUtils';
import PrettyDate from '../pretty-date/PrettyDate';
import './soknadInfo.less';

interface Props {
    søknad: Søknad;
    utvidetInfo?: boolean;
}

const bem = bemUtils('soknadInfo');

const SoknadInfo = ({ søknad, utvidetInfo }: Props) => (
    <>
        <span className={bem.element('mottatt')}>
            Mottatt <PrettyDate date={søknad.søknad.mottatt} format="dayDateAndTime" useNorwegianTime={true} />
        </span>
        {utvidetInfo && (
            <>
                {søknad.søknadstype === Søknadstype.PP_SYKT_BARN && (
                    <div className={bem.element('detaljer')}>
                        Gjelder perioden <PrettyDate date={søknad.søknad.fraOgMed} /> til{' '}
                        <PrettyDate date={søknad.søknad.tilOgMed} />
                    </div>
                )}
                {søknad.søknadstype === Søknadstype.PP_ETTERSENDING && (
                    <div className={bem.element('detaljer')}>
                        Ettersending gjelder: <q>{søknad.søknad.beskrivelse}</q> ...
                    </div>
                )}
            </>
        )}
    </>
);

export default SoknadInfo;

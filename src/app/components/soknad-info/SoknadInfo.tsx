import React from 'react';
import { Søknad } from '../../types/apiTypes/søknadTypes';
import bemUtils from '../../utils/bemUtils';
import PrettyDate from '../pretty-date/PrettyDate';
import './soknadInfo.less';

interface Props {
    søknad: Søknad;
}

const bem = bemUtils('soknadInfo');

const SoknadInfo = ({ søknad }: Props) => (
    <>
        <div className={bem.element('mottatt')}>
            Mottatt <PrettyDate date={søknad.opprettet} format="dateAndTime" />
        </div>
        {søknad.søknad.fraOgMed && søknad.søknad.tilOgMed && (
            <div className={bem.element('detaljer')}>
                Gjelder perioden <PrettyDate date={søknad.søknad.fraOgMed} /> -{' '}
                <PrettyDate date={søknad.søknad.tilOgMed} />
            </div>
        )}
        {søknad.søknad.beskrivelse && (
            <div className={bem.element('detaljer')}>
                Ettersending gjelder: <q>{søknad.søknad.beskrivelse}</q> ...
            </div>
        )}
    </>
);

export default SoknadInfo;

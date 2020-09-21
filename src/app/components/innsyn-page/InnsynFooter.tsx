import React from 'react';
import Lenke from 'nav-frontend-lenker';
import Title from '../../components/elements/title/Title';
import bemUtils from '../../utils/bemUtils';
import { getEnvironmentVariable } from '../../utils/envUtils';
import './innsynFooter.less';

const sykdomIFamilienInfoUrl = getEnvironmentVariable('SYKDOM_I_FAMILIEN_INFO_URL');
const sakBehandlingstidInfoUrl = getEnvironmentVariable('SAKBEHANDLINGSTID_INFO_URL');
const regelverkInfoInfoUrl = getEnvironmentVariable('REGELVERK_INFO_URL');
const klageInfoUrl = getEnvironmentVariable('KLAGE_INFO_URL');

const bem = bemUtils('innsynFooter');

const InnsynFooter = () => (
    <section className={'innsynFooter'}>
        <Title tag="h2" titleStyle="centerlined" titleType="undertittel">
            Du vil kanskje vite mer om
        </Title>
        <ul className={bem.element('lenker')}>
            <li>
                <Lenke target="_blank" href={sykdomIFamilienInfoUrl}>
                    Sykdom i familien
                </Lenke>
            </li>
            <li>
                <Lenke target="_blank" href={sakBehandlingstidInfoUrl}>
                    Sakbehandlingstid
                </Lenke>
            </li>
            <li>
                <Lenke target="_blank" href={regelverkInfoInfoUrl}>
                    Regelverk
                </Lenke>
            </li>
            <li>
                <Lenke target="_blank" href={klageInfoUrl}>
                    Klage
                </Lenke>
            </li>
        </ul>
    </section>
);

export default InnsynFooter;

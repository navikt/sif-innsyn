import React from 'react';
import Lenke from 'nav-frontend-lenker';
import Title from '../../components/elements/title/Title';
import getLenker from '../../lenker';
import bemUtils from '../../utils/bemUtils';
import './innsynFooter.less';

const bem = bemUtils('innsynFooter');

const InnsynFooter = () => {
    const lenker = getLenker();
    return (
        <section className={'innsynFooter'}>
            <Title tag="h2" titleStyle="centerlined" titleType="undertittel">
                Du vil kanskje vite mer om
            </Title>
            <ul className={bem.element('lenker')}>
                <li>
                    <Lenke target="_blank" href={lenker.sykdomIFamilien}>
                        Sykdom i familien
                    </Lenke>
                </li>
                <li>
                    <Lenke target="_blank" href={lenker.saksbehandlingstid}>
                        Sakbehandlingstid
                    </Lenke>
                </li>
                <li>
                    <Lenke target="_blank" href={lenker.regelverkFolketrygden}>
                        Regelverk
                    </Lenke>
                </li>
                <li>
                    <Lenke target="_blank" href={lenker.klageInfo}>
                        Klage
                    </Lenke>
                </li>
            </ul>
        </section>
    );
};

export default InnsynFooter;

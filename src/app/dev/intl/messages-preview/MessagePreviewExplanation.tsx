import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element, Ingress } from 'nav-frontend-typografi';
import Box from '../../../components/elements/box/Box';

const MessagesPreviewExplanation = () => (
    <AlertStripeInfo>
        <Ingress>Tegnforklaring</Ingress>
        <Box>
            Tekstene inneholder koder som brukes når applikasjonen setter inn verdier, og for å bestemme hvordan teksten
            skal se ut.
        </Box>
        <Box>
            <Element> Entall/flertall av en verdi</Element>
            <blockquote style={{ margin: 0, padding: '0.5rem 0' }}>
                <code>{`{timer, plural, one {# time} other {# timer}}`}</code>
            </blockquote>
            Kun ordene direkte etter # skal oversettes, resten er teknisk kode.
        </Box>
        <Box>
            <Element>Sett inn verdi i tekst</Element>
            <blockquote style={{ margin: 0, padding: '0.5rem 0' }}>
                <code>{`Første gyldige dato er {fom}, og siste gyldige dato er {tom}`}</code>
            </blockquote>
            Ord i klammer, f.eks. <code>{`{fom}`}</code>, blir erstattet med en verdi fra applikasjonen, og skal ikke
            oversettes.
        </Box>
        <Box>
            <Element>HTML-formatering</Element>
            <blockquote style={{ margin: 0, padding: '0.5rem 0' }}>
                <code>{`<Box>En tekst som inneholder HTML kode</Box>`}</code>
            </blockquote>
            All tekst, untatt tegn/ord i {`< >`} skal oversettes.
        </Box>
    </AlertStripeInfo>
);

export default MessagesPreviewExplanation;

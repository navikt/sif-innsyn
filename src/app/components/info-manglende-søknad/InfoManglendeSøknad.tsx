import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React from 'react';

const InfoManglendeSøknad = () => (
    <Ekspanderbartpanel tittel={'Har du sendt inn en søknad som du ikke ser her?'}>
        <p>
            Det kan ta noen minutter fra du har sendt en digital søknad til den vises her. Du kan sjekke igjen om noen
            minutter. Hvis du fikk kvittering på at søknaden var innsendt, er den mottatt av NAV selv om den ikke vises
            her enda.
        </p>
        <p>
            Søknader som er sendt i posten vises ikke her. De vises på en annen saksoversikt (link dit) når søknaden er
            mottatt og registrert inn. Det tar som regel 2 uker fra en søknad er postlagt til den vises i
            saksoversikten.
        </p>
    </Ekspanderbartpanel>
);

export default InfoManglendeSøknad;

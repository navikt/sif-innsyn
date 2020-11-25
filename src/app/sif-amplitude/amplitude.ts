import { useEffect, useRef, useState } from 'react';
import amplitude, { AmplitudeClient } from 'amplitude-js';
import constate from 'constate';
import { getEnvironmentVariable } from '../utils/envUtils';

export enum AmplitudeEvents {
    'sidevisning' = 'sidevisning',
    'applikasjonStartet' = 'applikasjon-startet',
}

interface InnsynUserProperties {
    antallSaker: number;
}

export const [AmplitudeProvider, useAmplitudeInstance] = constate(() => {
    const instance = useRef<AmplitudeClient | undefined>();
    const isActive = getEnvironmentVariable('USE_AMPLITUDE') === 'true';

    /** På grunn av at dekoratøren logger en sidevisning når applikasjonen starter
     * skal vi ikke logge første sidevisning fra applikasjonen
     **/
    const [ignoreFirstSidevisning, setIgnoreFirstSidevisning] = useState<boolean>(true);

    useEffect(() => {
        if (amplitude && isActive) {
            instance.current = amplitude.getInstance();
            instance.current.init('default', '', {
                apiEndpoint: 'amplitude.nav.no/collect-auto',
                saveEvents: false,
                includeUtm: true,
                includeReferrer: true,
                platform: window.location.toString(),
            });
        }
    }, [isActive]);

    function logEvent(eventName: string, eventProperties?: any) {
        if (instance.current) {
            console.log('logging', eventName, eventProperties);

            instance.current.logEvent(eventName, eventProperties);
        }
    }

    function logApplicationStartet(applicationKey: string) {
        logEvent(AmplitudeEvents.applikasjonStartet, {
            application: applicationKey,
        });
    }

    function logUserProperties(properties: InnsynUserProperties) {
        if (isActive && instance.current) {
            instance.current.setUserProperties(properties);
        }
    }

    function logSideskift(pageKey: string) {
        if (ignoreFirstSidevisning === false) {
            logEvent(AmplitudeEvents.sidevisning, {
                pageKey,
                team: 'sykdom-i-familien',
            });
        } else {
            setIgnoreFirstSidevisning(false);
        }
    }

    return { logEvent, logSideskift, logUserProperties, logApplicationStartet };
});

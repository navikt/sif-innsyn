import { useEffect, useRef } from 'react';
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
            instance.current.logEvent(eventName, eventProperties);
        }
    }

    function setUserProperties(properties: InnsynUserProperties) {
        if (isActive && instance.current) {
            instance.current.setUserProperties(properties);
        }
    }

    function logApplicationStartet(applicationKey: string) {
        logEvent(AmplitudeEvents.applikasjonStartet, {
            application: applicationKey,
        });
    }

    async function logSidevisning(pageKey: string) {
        logEvent(AmplitudeEvents.sidevisning, {
            pageKey,
            team: 'sykdom-i-familien',
        });
    }

    return { logEvent, logSidevisning, setUserProperties: setUserProperties, logApplicationStartet };
});

import { useEffect, useRef } from 'react';
import amplitude from 'amplitude-js';
import constate from 'constate';
import { getEnvironmentVariable } from '../utils/envUtils';

export enum AmplitudeEvents {
    'sidevisning' = 'sidevisning',
}

export const [AmplitudeProvider, useAmplitudeInstance] = constate(() => {
    const instance: any = useRef();
    const amplitudeKey = getEnvironmentVariable('AMPLITUDE_API_KEY_FAMILIE');
    const isActive = getEnvironmentVariable('USE_AMPLITUDE');

    useEffect(() => {
        if (amplitudeKey) {
            instance.current = amplitude.getInstance();
            instance.current.init(amplitudeKey, null, {
                apiEndpoint: 'amplitude.nav.no/collect',
                saveEvents: false,
                includeUtm: true,
                includeReferrer: true,
                platform: window.location.toString(),
            });
        }
    }, [amplitudeKey, isActive]);

    function logEvent(eventName: string, eventProperties: any) {
        if (isActive && instance.current) {
            instance.current.logEvent(eventName, eventProperties);
        }
    }

    function logSideskift(pageKey: string, properties?: any) {
        logEvent(AmplitudeEvents.sidevisning, {
            pageKey,
            team: 'sykdom-i-familien',
            applikasjon: 'sif-innsyn',
            properties,
        });
    }

    return { logEvent, logSideskift };
});

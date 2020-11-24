import { useEffect, useRef } from 'react';
import amplitude from 'amplitude-js';
import constate from 'constate';
import { getEnvironmentVariable } from '../utils/envUtils';

export enum AmplitudeEvents {
    'sidevisning' = 'sidevisning',
}

export const [AmplitudeProvider, useAmplitudeInstance] = constate(() => {
    const instance: any = useRef();
    const isActive = getEnvironmentVariable('USE_AMPLITUDE');

    useEffect(() => {
        if (amplitude) {
            instance.current = amplitude.getInstance();
            amplitude.getInstance().init('default', '', {
                apiEndpoint: 'amplitude.nav.no/collect-auto',
                saveEvents: false,
                includeUtm: true,
                includeReferrer: true,
                platform: window.location.toString(),
            });
        }
    }, [isActive]);

    function logEvent(eventName: string, eventProperties: any) {
        if (isActive && instance.current) {
            instance.current.logEvent(eventName, eventProperties);
        }
    }

    function logSideskift(pageKey: string, properties?: any) {
        logEvent(AmplitudeEvents.sidevisning, {
            pageKey,
            team: 'sykdom-i-familien',
            application: 'sif-innsyn',
            properties,
        });
    }

    return { logEvent, logSideskift };
});

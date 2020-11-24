import { useCallback, useEffect } from 'react';
import { useAmplitudeInstance } from '../amplitude';

function useLogSidevisning<PageKeys extends string, PageProperties>(
    pageKey: PageKeys,
    pageProperties?: PageProperties
) {
    const { logSideskift } = useAmplitudeInstance();

    const logPage = useCallback(
        (key: PageKeys, props?: PageProperties) => {
            logSideskift(key, props);
        },
        [logSideskift]
    );

    useEffect(() => {
        logPage(pageKey, pageProperties);
    }, [pageKey, pageProperties, logPage]);
}

export default useLogSidevisning;

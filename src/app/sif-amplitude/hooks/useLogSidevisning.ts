import { useCallback, useEffect } from 'react';
import { useAmplitudeInstance } from '../amplitude';

function useLogSidevisning<PageKeys extends string>(pageKey: PageKeys) {
    const { logSideskift } = useAmplitudeInstance();

    const logPage = useCallback(
        (key: PageKeys) => {
            logSideskift(key);
        },
        [logSideskift]
    );

    useEffect(() => {
        logPage(pageKey);
    }, [pageKey, logPage]);
}

export default useLogSidevisning;

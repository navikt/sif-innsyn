import React, { useEffect, useState } from 'react';
import { getOrLogin, GetOrLoginResult, GoGetOrLoginResponse } from '../api/api';
import LoadingPage from '../components/pages/loading-page/LoadingPage';
import GeneralErrorPage from '../components/pages/general-error-page/GeneralErrorPage';
import { isSøkerApiResponse, isSøkerdata, SøkerApiResponse, Søkerdata } from '../types/søkerdataTypes';
import { ResourceType } from '../types/resourceTypes';
import appSentryLogger from '../utils/appSentryLogger';

enum Status {
    INITIALIZING = 'INITIALIZING ',
    LOADING = 'LOADING',
    REDIRECTING = 'REDIRECTING',
    DONE = 'DONE',
    ERROR = 'ERROR',
}

interface State {
    status: Status;
    søkerdata: Partial<Søkerdata>;
    error: string | undefined;
}

interface Props {
    contentLoadedRenderer: (søkerdata: Søkerdata) => React.ReactElement;
}

const toStatus = (result: GetOrLoginResult): Status => {
    if (result === GetOrLoginResult.GOT_DATA) {
        return Status.DONE;
    }
    if (result === GetOrLoginResult.WILL_REDIRECT) {
        return Status.REDIRECTING;
    }
    return Status.ERROR;
};

const emptySøkerdata = (): Partial<Søkerdata> => ({ person: undefined });

const InnsynEssentialsLoader: React.FC<Props> = (props: Props): React.ReactElement => {
    const { contentLoadedRenderer } = props;

    const [state, setState] = useState<State>({
        status: Status.INITIALIZING,
        søkerdata: emptySøkerdata(),
        error: undefined,
    });

    async function loadAppEssentials(): Promise<void> {
        const response: GoGetOrLoginResponse<SøkerApiResponse> = await getOrLogin<SøkerApiResponse>(ResourceType.SØKER);
        setState({
            ...state,
            status: toStatus(response.result),
            søkerdata: { ...state.søkerdata, person: isSøkerApiResponse(response.data) ? response.data : undefined },
        });
    }

    useEffect(() => {
        if (state.status === Status.INITIALIZING) {
            loadAppEssentials();
            setState({ ...state, status: Status.LOADING });
        }
    }, [state]);

    if (state.status === Status.DONE && isSøkerdata(state.søkerdata)) {
        return contentLoadedRenderer(state.søkerdata);
    }
    if (state.status === Status.ERROR && state.error) {
        appSentryLogger.logError('InnsynEssentialsLoader error', state.error);
        return <GeneralErrorPage payload={state.error} />;
    }
    return <LoadingPage />;
};

export default InnsynEssentialsLoader;

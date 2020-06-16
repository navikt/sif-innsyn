import { fold as foldOption, Option } from 'fp-ts/lib/Option';
import { Essentials } from '../types/types';
import React from 'react';
import { pipe } from 'fp-ts/lib/pipeable';
import LoadingPage from '../components/pages/loading-page/LoadingPage';
import { EssentialsRenderer, LoadError } from './loadUtils';
import GeneralErrorPage from '../components/pages/general-error-page/GeneralErrorPage';

export const showLoadingPageOrRenderContent = (contentRenderer: EssentialsRenderer) => (
    maybeEssentials: Option<Essentials>
): React.ReactElement => {
    return pipe(
        maybeEssentials,
        foldOption(
            () => <LoadingPage />,
            (essentials) => contentRenderer(essentials)
        )
    );
};

export const renderGeneralErrorPage = (loadError: LoadError): React.ReactElement => (
    <GeneralErrorPage payload={loadError.error} />
);

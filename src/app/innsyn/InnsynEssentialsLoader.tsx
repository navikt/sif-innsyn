import React, { useEffect, useState } from 'react';
import { Essentials } from '../types/types';
import { EssentialsRenderer, loadAppEssentials, LoadError } from './loadUtils';
import { none, Option, fold as foldOption } from 'fp-ts/lib/Option';
import { Either, fold as foldEither, left as leftEither } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { renderGeneralErrorPage, showLoadingPageOrRenderContent } from './loadUtilsViews';

interface Props {
    contentLoadedRenderer: EssentialsRenderer;
}

interface State {
    essentials: Either<Option<Essentials>, LoadError>;
}

const setInitialLoadState = () => leftEither(none);

function optionsAreNone<T>(options: Option<T>): boolean {
    return pipe(
        options,
        foldOption(
            () => true,
            (a) => false
        )
    );
}

const essentialsAreNone = (essentials: Either<Option<Essentials>, LoadError>): boolean => {
    return pipe(
        essentials,
        foldEither(optionsAreNone, (a) => false)
    );
};

const InnsynEssentialsLoader: React.FC<Props> = (props: Props): React.ReactElement => {
    const { contentLoadedRenderer } = props;

    const [state, setState] = useState<State>({
        essentials: setInitialLoadState(),
    });

    useEffect(() => {
        if (essentialsAreNone(state.essentials)) {
            loadAppEssentials().then((essentialsResult: Either<Option<Essentials>, LoadError>) => {
                setState({ ...state, essentials: essentialsResult });
            });
        }
    });

    return pipe(
        state.essentials,
        foldEither(showLoadingPageOrRenderContent(contentLoadedRenderer), renderGeneralErrorPage)
    );
};

export default InnsynEssentialsLoader;

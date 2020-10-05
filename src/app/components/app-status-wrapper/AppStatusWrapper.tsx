import { Status, StatusMessage, useAppStatus } from '@navikt/appstatus-react';
import React from 'react';
import LoadWrapper from './LoadWrapper';

interface Props {
    applicationKey: string;
    sanityConfig: {
        projectId: string;
        dataset: string;
        token?: string;
    };
    contentRenderer: () => React.ReactNode;
    unavailableContentRenderer?: () => React.ReactNode;
}

const AppStatusWrapper = ({
    applicationKey,
    contentRenderer,
    sanityConfig,
    unavailableContentRenderer: disabledContentRenderer,
}: Props) => {
    const { status, message, isLoading } = useAppStatus(applicationKey, sanityConfig);

    const renderContent = () => {
        if (status === Status.unavailable && disabledContentRenderer !== undefined) {
            return disabledContentRenderer();
        }
        return contentRenderer();
    };
    return (
        <LoadWrapper
            isLoading={isLoading}
            contentRenderer={() => (
                <>
                    {message !== undefined && (
                        <div style={{ maxWidth: '704px', margin: '1rem auto' }}>
                            <StatusMessage message={message} />
                        </div>
                    )}
                    {renderContent()}
                </>
            )}
        />
    );
};

export default AppStatusWrapper;

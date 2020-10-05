import React from 'react';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';

interface Props {
    isLoading: boolean;
    contentRenderer: () => React.ReactNode;
}

const LoadWrapper = ({ isLoading, contentRenderer }: Props) => (
    <div>
        {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'center', minHeight: '15rem', alignItems: 'center' }}>
                <LoadingSpinner type="XXL" />
            </div>
        )}
        {!isLoading && <>{contentRenderer()}</>}
    </div>
);

export default LoadWrapper;

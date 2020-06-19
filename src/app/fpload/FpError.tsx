import * as React from 'react';

interface Props {
    error: Error;
}

const FpError: React.FC<Props> = (props: Props) => {
    return <div>Error: {JSON.stringify(props.error, null, 4)}</div>;
};

export default FpError;

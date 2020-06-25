import * as React from 'react';
import ReactJson from 'react-json-view';

interface Props {
    error: Error;
}

const FpError: React.FC<Props> = ({ error }: Props) => {
    return (
        <div>
            Error:
            <ReactJson src={JSON.parse(JSON.stringify(error, null, 4))} />
        </div>
    );
};

export default FpError;

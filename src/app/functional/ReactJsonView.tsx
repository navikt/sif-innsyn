import * as React from 'react';
import ReactJson from 'react-json-view';

interface Props {
    input: any;
}

const ReactJsonView: React.FC<Props> = ({ input }: Props) => {
    return (
        <div>
            ReactJsonView:
            <ReactJson src={JSON.parse(JSON.stringify(input, null, 4))} />
        </div>
    );
};

export default ReactJsonView;

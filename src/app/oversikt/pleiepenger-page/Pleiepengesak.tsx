import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Props {
    id: string;
}

const Pleiepengesak = (props: Props & RouteComponentProps<{ id: string }>) => {
    const { id } = props.match.params;

    return <div>Saksid: {id}</div>;
};

export default withRouter(Pleiepengesak);

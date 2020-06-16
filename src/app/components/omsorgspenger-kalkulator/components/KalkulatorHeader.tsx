import * as React from 'react';
import { useFormikContext } from 'formik';
import OmsorgsdagerForm from '../types/OmsorgsdagerForm';
import { Systemtittel } from 'nav-frontend-typografi';
import tekster from '../tekster';
import { Flatknapp } from 'nav-frontend-knapper';

interface Props {
    putPropsHere?: string;
}

const KalkulatorHeader: React.FC<Props> = (props: Props) => {
    const { resetForm } = useFormikContext<OmsorgsdagerForm>();
    return (
        <div className="kalkulatorHeader">
            <span className="kalkulatorTitle">
                <Systemtittel tag="h1">{tekster('KalkulatorHeader.Overskrift')}</Systemtittel>
            </span>
            <Flatknapp mini kompakt onClick={() => resetForm()}>
                {tekster('KalkulatorHeader.Nullstill')}
            </Flatknapp>
        </div>
    );
};

export default KalkulatorHeader;

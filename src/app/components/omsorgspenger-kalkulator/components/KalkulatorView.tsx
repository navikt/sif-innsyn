import * as React from 'react';
import { initialValues } from '../tempFlytt';
import { Form } from 'formik';
import BarnInput from './BarnInput';
import ForeldreInput from './ForeldreInput';
import Resultat from './Resultat';
import SkjemaContext from './SkjemaContext';
import KalkulatorHeader from './KalkulatorHeader';
import './kalkulatorInputStyle.less';

const KalkulatorView: React.FC = () => {
    return (
        <div>
            <SkjemaContext initialValues={initialValues}>
                <Form>
                    <div className="inputContainer">
                        <div className="kalkulatorInput">
                            <KalkulatorHeader />
                            <BarnInput />
                            <ForeldreInput />
                        </div>
                        <div className="resultat">
                            <Resultat />
                        </div>
                    </div>
                </Form>
            </SkjemaContext>
        </div>
    );
};

export default KalkulatorView;

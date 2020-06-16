import { uuidv4 } from './utils';
import OmsorgsdagerForm from './types/OmsorgsdagerForm';

export const initBarnValue = () => ({
    id: uuidv4(),
    søkerHarAleneomsorgFor: false,
    kroniskSykt: false,
});
export const initForelderValue = () => ({
    id: uuidv4(),
    normaldager: {
        dagerFått: 0,
        dagerTildelt: 0,
    },
    koronadager: {
        dagerFått: 0,
        dagerTildelt: 0,
    },
});
export const initialValues: OmsorgsdagerForm = {
    barn: [initBarnValue()],
    foreldre: [initForelderValue()],
};

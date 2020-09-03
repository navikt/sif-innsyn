import * as React from 'react';
import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';

export enum FieldNames {
    antallBarn = 'antallBarn',
}

export interface Form {
    [FieldNames.antallBarn]: number | undefined;
}
export const initialForm: Form = {
    [FieldNames.antallBarn]: undefined,
};

const TypedFormComponents = getTypedFormComponents<FieldNames, Form>();

const FormikKalkulator = () => {
    return (
        <TypedFormComponents.FormikWrapper
            initialValues={initialForm}
            onSubmit={() => null}
            renderForm={({ values }) => {
                const nBarnOptions = Array.from({ length: 21 }, (_, i) => i);
                return (
                    <div>
                        <div>Antall barn i husstanden:</div>
                        <TypedFormComponents.Select name={FieldNames.antallBarn}>
                            {nBarnOptions.map((value: number) => {
                                return (
                                    <option id={`n_barn_i_husstanden${value}`} value={value}>
                                        {value}
                                    </option>
                                );
                            })}
                        </TypedFormComponents.Select>
                    </div>
                );
            }}
        />
    )
};

export default FormikKalkulator;

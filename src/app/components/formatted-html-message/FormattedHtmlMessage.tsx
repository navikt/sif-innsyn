import React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
    id: string;
    value?: Record<string, string | number | boolean | null | undefined | Date>;
    tagName?: React.ElementType<any>;
}

const basicHtmlTagRenderers = {
    li: function renderLi(value: string) {
        return <li>{value}</li>;
    },
    strong: function renderStrong(value: string) {
        return <strong>{value}</strong>;
    },
    p: function renderP(value: string) {
        return <p>{value}</p>;
    },
    em: function renderEm(value: string) {
        return <em>{value}</em>;
    },
};

const FormattedHtmlMessage = ({ id, value, tagName }: Props) => (
    <FormattedMessage id={id} tagName={tagName} values={{ ...value, ...basicHtmlTagRenderers }} />
);

export default FormattedHtmlMessage;

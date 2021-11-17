import React from 'react';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Undertittel } from 'nav-frontend-typografi';
import './linkPanel.less';
import bemUtils from '../../utils/bemUtils';
import Lenke from 'nav-frontend-lenker';

interface Props {
    image: React.ReactNode;
    title: string;
    lenkeTekst: string;
    lenke: string;
}

const bem = bemUtils('linkPanel');

const LinkPanel: React.FC<Props> = ({ title, lenkeTekst, lenke, image, children }) => {
    return (
        <div className={bem.block}>
            <>
                {image && <div className={bem.element('image')}>{image}</div>}
                <div className={bem.element('content')}>
                    <Undertittel tag={'h1'} className={bem.element('title')}>
                        {title}
                    </Undertittel>
                    <div>{children}</div>
                    <div style={{ marginTop: '1rem' }}>
                        <Lenke href={lenke}>
                            {lenkeTekst} <HoyreChevron />
                        </Lenke>
                    </div>
                </div>
            </>
        </div>
    );
};

export default LinkPanel;

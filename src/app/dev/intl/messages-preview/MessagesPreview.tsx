import React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';
import bemUtils from '../../../utils/bemUtils';
import { createMultiLocaleObject, getMissingMessageKeys, MessageFileFormat } from '../devIntlUtils';
import MessagesList from './MessagesList';
import './messagesPreview.less';
import MessagesPreviewExplanation from './MessagePreviewExplanation';
import Box from '../../../components/elements/box/Box';

interface Props {
    title?: string;
    showMissingTextSummary?: boolean;
    showExplanation?: boolean;
    messages: MessageFileFormat;
}

const bem = bemUtils('messagesPreview');

const MessagesPreview = ({
    messages,
    title = 'Tekster',
    showMissingTextSummary = true,
    showExplanation = true,
}: Props) => {
    const allMessages = createMultiLocaleObject(messages);
    const missingMessages = getMissingMessageKeys(allMessages);
    return (
        <div className={bem.block}>
            {missingMessages && showMissingTextSummary && (
                <>
                    <Undertittel>Tekstnøkler som ikke er oversatt</Undertittel>
                    <Box margin="m">
                        <AlertStripeFeil>
                            <pre className={bem.element('missingList')}>
                                {Object.keys(missingMessages).map((key) => (
                                    <div key={key}>
                                        {missingMessages[key]}: {key}
                                    </div>
                                ))}
                            </pre>
                        </AlertStripeFeil>
                    </Box>
                </>
            )}
            <Box margin="xl" padBottom="l">
                <Undertittel>{title}</Undertittel>
            </Box>
            {showExplanation && (
                <Box>
                    <MessagesPreviewExplanation />
                </Box>
            )}
            <MessagesList messages={messages} />
        </div>
    );
};

export default MessagesPreview;

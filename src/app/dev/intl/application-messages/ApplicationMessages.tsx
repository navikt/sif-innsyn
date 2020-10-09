import React from 'react';
import { Route } from 'react-router-dom';
import FullscreenContainer from '../../fullscreenContainer/FullscreenContainer';
import { MessageFileFormat } from '../devIntlUtils';
import MessagesPreview from '../messages-preview/MessagesPreview';

interface Props {
    title: string;
    messages: MessageFileFormat;
    /** Route for when to show the messages */
    route?: string;
}

const ApplicationMessages = ({ messages, title, route = '*/dev/tekster' }: Props) => (
    <Route path={route}>
        <FullscreenContainer>
            <MessagesPreview title={title} showMissingTextSummary={false} showExplanation={false} messages={messages} />
        </FullscreenContainer>
    </Route>
);

export default ApplicationMessages;

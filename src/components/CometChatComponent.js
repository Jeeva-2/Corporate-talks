import React, { useState, useEffect, useCallback } from 'react';
import { CometChat } from '@cometchat-pro/chat';
import {
    CometChatMessages,
    CometChatUIKit,
    CometChatUiKitConstants,
    CometChatTheme,
    MessageListConfigurationInterface
} from '@cometchat/chat-uikit-web'; // Assuming you have a similar package for web

function CometChatComponent() {
    const [chatUser, setChatUser] = useState();

    // CometChat Login
    useEffect(() => {
        const appID = process.env.NEXT_PUBLIC_COMETCHAT_APP_ID;
        const region = process.env.NEXT_PUBLIC_COMETCHAT_REGION;
        const authKey = process.env.NEXT_PUBLIC_COMETCHAT_AUTH_KEY;

        CometChat.init(appID, new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build()).then(
            () => {
                console.log('Initialization completed successfully');
                // Perform user login
                CometChat.login('UID', authKey).then(
                    (user) => {
                        setChatUser(user);
                    },
                    (error) => {
                        console.log('Login failed with exception:', { error });
                    }
                );
            },
            (error) => {
                console.log('Initialization failed with error:', error);
            }
        );
    }, []);

    const theme = new CometChatTheme({});
    const allTemplates = CometChatUIKit.getDataSource().getAllMessageTemplates(theme);

    const getAlignment = useCallback(
        (item) => {
            if (item && item.getCategory() === CometChatUiKitConstants.MessageCategoryConstants.action) return 'center';
            if (item.getSender()?.getUid() === chatUser.getUid()) return 'right';
            return 'left';
        },
        [chatUser]
    );

    const getTextMessageBubble = (message) => {
        const alignment = getAlignment(message);
        return (
            <div
                style={{
                    width: '100%',
                    height: 'auto',
                    backgroundColor: alignment === 'right' ? '#6851D6' : '#f2c2e9',
                    color: alignment === 'right' ? theme?.palette.getSecondary() : theme?.palette?.getAccent(),
                    borderRadius: '8px',
                    padding: '10px',
                    textAlign: alignment,
                    margin: '5px 0'
                }}
            >
                {(message).getText()}
            </div>
        );
    };

    for (let i = 0; i < allTemplates.length; i++) {
        if (
            allTemplates[i].type === CometChatUiKitConstants.CometChatMessageTypes.text &&
            allTemplates[i].category === CometChatUiKitConstants.MessageCategoryConstants.message
        ) {
            allTemplates[i].BubbleView = getTextMessageBubble;
        }
    }

    const messageListConfiguration = {
        templates: allTemplates
    };

    return (
        <>
            {chatUser && (
                <CometChatMessages
                    user={chatUser}
                    messageListConfiguration={messageListConfiguration}
                />
            )}
        </>
    );
}

export default CometChatComponent;

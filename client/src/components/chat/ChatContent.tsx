import {
	Avatar,
	ChatContainer,
	ConversationHeader,
	Message,
	MessageInput,
	MessageList,
} from '@chatscope/chat-ui-kit-react';
import { ChatMessage } from '../../store/chat/chatSlice';
import { m } from "framer-motion"
import { useState } from "react"

let localId = 1

const ChatContent = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: `${localId++}`,
      direction: "incoming",
      message: "Hello my friend",
      sender: "Zoe",
      sentTime: "15 mins ago"
    },
    {
      id: `${localId++}`,
      direction: "outgoing",
      message: "Hello my friend",
      sender: "Patrik",
      sentTime: "15 mins ago"
    }
  ])
  return (
    <ChatContainer>
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar
          name="Zoe"
          src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
        />
        <ConversationHeader.Content
          // info='Active 10 mins ago'
          userName="Zoe"
        />
        {/* <ConversationHeader.Actions>
      <VoiceCallButton />
      <VideoCallButton />
      <EllipsisButton orientation='vertical' />
    </ConversationHeader.Actions> */}
      </ConversationHeader>
      <MessageList
        typingIndicator={<TypingIndicator content="Zoe is typing" />}
      >
        <MessageSeparator content="Saturday, 30 November 2019" />
        {messages.map((message) => (
          <Message
            key={message.id}
            model={{ ...message, position: "normal" }}
            children={
              message.sender === "Zoe" ? (
                <Avatar
                  src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
                  name="Zoe"
                />
              ) : (
                <Avatar
                  src={
                    "https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                  }
                  name="Emily"
                />
              )
            }
          />
        ))}
      </MessageList>
      <MessageInput
        placeholder="Type message here"
        onSend={(innerHtml, textContent, innerText, nodes) =>
          //append the message to the messages list
          setMessages([
            ...messages,
            {
              id: `${localId++}`,
              direction: "outgoing",
              message: innerText,
              sender: "Patrik",
              sentTime: "15 mins ago"
            }
          ])
        }
      />
    </ChatContainer>
  )
}

export default ChatContent;

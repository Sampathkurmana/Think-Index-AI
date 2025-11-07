
import React from 'react';
import { Message } from '../types';
import Logo from './Logo';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const formattedText = message.text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    .replace(/\n/g, '<br />');

  return (
    <div className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <Logo className="h-8 w-8" />
        </div>
      )}
      <div
        className={`max-w-xl rounded-lg px-4 py-3 shadow-md ${
          isUser
            ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-br-none text-white'
            : 'bg-gray-800 rounded-bl-none text-gray-300'
        }`}
      >
        <p className="text-base leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: formattedText }}></p>
      </div>
    </div>
  );
};

export default ChatMessage;

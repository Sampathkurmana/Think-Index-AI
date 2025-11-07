
import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { Message } from './types';
import { startChat } from './services/geminiService';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import Logo from './components/Logo';

const App: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const chatSession = startChat();
    setChat(chatSession);
    setMessages([
      {
        sender: 'ai',
        text: "Hello! I'm Think Index, your personal AI career advisor. 🚀 I'm here to help you navigate your professional journey. To get started, could you tell me a little about yourself? Don't worry, just a few quick questions: \n\n1.  **What's your current education or skill level?** (e.g., student, recent graduate, experienced professional)\n2.  **What are some of your interests?** (e.g., technology, art, business, science)\n3.  **What's your preferred work style?** (e.g., remote, hands-on, creative, analytical)\n4.  **How much time can you dedicate to learning each day?**\n5.  **Do you have any specific career goals in mind, even if they're just ideas?** 🤔",
      },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (userText: string) => {
    if (!chat || isLoading) return;

    const newUserMessage: Message = { sender: 'user', text: userText };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    const aiResponsePlaceholder: Message = { sender: 'ai', text: '' };
    setMessages((prevMessages) => [...prevMessages, aiResponsePlaceholder]);

    try {
      const stream = await chat.sendMessageStream({ message: userText });
      let currentText = '';
      for await (const chunk of stream) {
        currentText += chunk.text;
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1] = { sender: 'ai', text: currentText };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1] = { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <header className="flex items-center p-4 border-b border-gray-700 shadow-md bg-gray-800/50 backdrop-blur-sm">
        <Logo className="h-10 w-10" />
        <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">
          Think Index
        </h1>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && messages[messages.length - 1]?.sender === 'ai' && (
          <div className="flex justify-start items-end">
             <Logo className="h-8 w-8 flex-shrink-0" />
            <div className="ml-3 p-3 rounded-lg rounded-bl-none bg-gray-800 animate-pulse">
                <div className="h-2 bg-slate-700 rounded w-16"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      
      <footer className="p-4 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
};

export default App;

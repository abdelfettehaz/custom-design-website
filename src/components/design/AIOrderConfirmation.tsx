import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BotIcon, UserIcon, SendIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIOrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  onConfirm: (orderId: string) => void;
}

export const AIOrderConfirmation: React.FC<AIOrderConfirmationProps> = ({
  isOpen,
  onClose,
  orderId,
  onConfirm
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  React.useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage(`Hello! I'm your AI assistant. Would you like to confirm your order #${orderId}? (Please respond with "yes" or "no")`, false);
    }
  }, [isOpen, orderId]);

  const addMessage = (content: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const processAIResponse = (response: string) => {
    const lowerResponse = response.toLowerCase();
    
    if (lowerResponse.includes('yes') || lowerResponse.includes('confirm') || lowerResponse.includes('ok')) {
      addMessage("Thank you for confirming your order! Your order has been processed successfully.", false);
      setTimeout(() => {
        onConfirm(orderId);
        onClose();
      }, 2000);
    } else if (lowerResponse.includes('no') || lowerResponse.includes('cancel')) {
      addMessage("Your order has been cancelled as per your request. Let me know if you'd like to start over.", false);
    } else {
      addMessage("I'm not sure I understood. Please confirm your order by saying 'yes' or cancel it by saying 'no'.", false);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    addMessage(userMessage, true);

    setIsProcessing(true);
    setTimeout(() => {
      processAIResponse(userMessage);
      setIsProcessing(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Order Confirmation" size="lg">
      <div className="flex flex-col h-96">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 rounded-lg mb-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg flex items-start space-x-2 ${
                  message.isUser
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                }`}
              >
                {!message.isUser && (
                  <BotIcon className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm">{message.content}</p>
                {message.isUser && (
                  <UserIcon className="h-4 w-4 text-blue-200 mt-0.5 flex-shrink-0" />
                )}
              </div>
            </motion.div>
          ))}
          
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white border border-gray-200 rounded-lg rounded-bl-sm p-3 flex items-center space-x-2">
                <BotIcon className="h-4 w-4 text-blue-600" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your response..."
            className="flex-1"
            disabled={isProcessing}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isProcessing}
            variant="primary"
            size="sm"
            className="px-4"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircleIcon, 
  XIcon, 
  SendIcon, 
  LanguagesIcon,
  BotIcon,
  UserIcon
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  language: 'en' | 'ar';
}

interface ChatWidgetProps {
  className?: string;
}

const responses = {
  en: {
    welcome: "Hi! I'm your T-Shirt Design Assistant. I can help you navigate our website and answer any questions about our services. What would you like to know?",
    error: "I apologize, but I encountered an error. Could you please try asking your question again?",
    processing: "Let me think about that...",
    language_switch: "Language switched to English.",
    help: "I can help you with:\n- Finding where to design your t-shirt\n- Checking prices\n- Viewing templates\n- Accessing your account\n- Any other questions about our services"
  },
  ar: {
    welcome: "مرحباً! أنا مساعدك لتصميم التيشيرتات. يمكنني مساعدتك في التنقل في موقعنا والإجابة على أي أسئلة حول خدماتنا. كيف يمكنني مساعدتك؟",
    error: "عذراً، واجهت خطأ. هل يمكنك إعادة طرح سؤالك؟",
    processing: "دعني أفكر في ذلك...",
    language_switch: "تم التغيير إلى العربية.",
    help: "يمكنني مساعدتك في:\n- العثور على مكان تصميم قميصك\n- التحقق من الأسعار\n- عرض القوالب\n- الوصول إلى حسابك\n- أي أسئلة أخرى حول خدماتنا"
  }
};

const commonResponses = {
  en: {
    hello: 'Hi! Ready to design some awesome T-shirts?',
    hi: 'Hello! Welcome to our T-shirt design studio. How can I assist you today?',
    price: 'Prices start at $9.99 for basic designs. Premium designs cost $15-30.',
    pricing: 'Here\'s our pricing:\n• Basic designs: $9.99\n• Custom designs: $15-25\n• Premium designs: $25-30\n• Bulk orders: Contact us for special rates',
    design: 'You can use our Design Studio or AI Generator!',
    order: 'Check your order status in "My Account". Need help?',
    'how to design': 'Click on "Design Studio" in the navigation menu to start creating your custom t-shirt design.',
    'where to design': 'Click on "Design Studio" in the navigation menu to start creating your custom t-shirt design.',
    'start designing': 'Click on "Design Studio" in the navigation menu to start creating your custom t-shirt design.',
    templates: 'Browse our templates by clicking "Templates" in the navigation menu.',
    gallery: 'View our gallery of designs by clicking "Gallery" in the navigation menu.',
    login: 'Click the "Login" button in the top right corner to access your account.'
  },
  ar: {
    'مرحبا': 'مرحباً! مستعد لتصميم تيشيرتات رائعة؟',
    'السعر': 'تبدأ الأسعار من 9.99$ للتصاميم الأساسية. التصاميم المميزة 15-30$.',
    'التصميم': 'يمكنك استخدام استوديو التصميم أو المولد الذكي!',
    'الطلب': 'تحقق من حالة الطلب في "حسابي". تحتاج مساعدة؟',
    'كيف أصمم': 'انقر على "استوديو التصميم" في القائمة للبدء في إنشاء تصميم قميصك المخصص.',
    'قوالب': 'تصفح قوالبنا بالنقر على "القوالب" في القائمة.',
    'معرض': 'شاهد معرض تصاميمنا بالنقر على "المعرض" في القائمة.',
    'تسجيل': 'انقر على زر "تسجيل الدخول" في الزاوية العلوية اليمنى للوصول إلى حسابك.'
  }
};

export const ChatWidget: React.FC<ChatWidgetProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage(responses[language].welcome, false);
    }
  }, [isOpen, language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (content: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date(),
      language
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getLocalResponse = (message: string): string | null => {
    const msg = message.toLowerCase().trim();
    return commonResponses[language][msg] || null;
  };

  const simulateAIResponse = async (message: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const msg = message.toLowerCase();
    
    // Check for navigation keywords
    if (msg.includes('design') || msg.includes('create') || msg.includes('make')) {
      return language === 'en' 
        ? 'Click on "Design Studio" in the navigation menu to start creating your custom t-shirt design.'
        : 'انقر على "استوديو التصميم" في القائمة للبدء في إنشاء تصميم قميصك المخصص.';
    }
    
    if (msg.includes('price') || msg.includes('cost') || msg.includes('how much')) {
      return language === 'en'
        ? 'Our pricing starts at $9.99 for basic designs. Custom designs range from $15-25, and premium designs are $25-30. Bulk orders get special rates!'
        : 'تبدأ أسعارنا من 9.99$ للتصاميم الأساسية. التصاميم المخصصة من 15-25$، والتصاميم المميزة 25-30$. الطلبات بالجملة لها أسعار خاصة!';
    }
    
    if (msg.includes('template') || msg.includes('example')) {
      return language === 'en'
        ? 'Browse our templates by clicking "Templates" in the navigation menu. We have hundreds of pre-made designs to choose from!'
        : 'تصفح قوالبنا بالنقر على "القوالب" في القائمة. لدينا مئات التصاميم الجاهزة للاختيار من بينها!';
    }
    
    if (msg.includes('gallery') || msg.includes('showcase')) {
      return language === 'en'
        ? 'Check out our gallery by clicking "Gallery" in the navigation menu to see amazing designs created by our community!'
        : 'تحقق من معرضنا بالنقر على "المعرض" في القائمة لرؤية تصاميم رائعة أنشأها مجتمعنا!';
    }
    
    if (msg.includes('login') || msg.includes('account') || msg.includes('sign in')) {
      return language === 'en'
        ? 'Click the "Login" button in the top right corner to access your account and manage your designs and orders.'
        : 'انقر على زر "تسجيل الدخول" في الزاوية العلوية اليمنى للوصول إلى حسابك وإدارة تصاميمك وطلباتك.';
    }
    
    // Default AI-like responses
    const defaultResponses = {
      en: [
        "That's a great question! Our platform offers comprehensive t-shirt design tools with AI assistance.",
        "I'd be happy to help you with that! Our design studio has everything you need to create amazing custom t-shirts.",
        "Absolutely! We specialize in custom t-shirt design with professional-quality results.",
        "Great choice! Our platform makes it easy to create unique designs that stand out."
      ],
      ar: [
        "هذا سؤال رائع! منصتنا تقدم أدوات تصميم شاملة للتيشيرتات مع مساعدة الذكاء الاصطناعي.",
        "سأكون سعيداً لمساعدتك في ذلك! استوديو التصميم لدينا يحتوي على كل ما تحتاجه لإنشاء تيشيرتات مخصصة رائعة.",
        "بالتأكيد! نحن متخصصون في تصميم التيشيرتات المخصصة بجودة احترافية.",
        "اختيار رائع! منصتنا تجعل من السهل إنشاء تصاميم فريدة تتميز عن غيرها."
      ]
    };
    
    return defaultResponses[language][Math.floor(Math.random() * defaultResponses[language].length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    addMessage(userMessage, true);

    // Handle special commands
    if (userMessage === '/help') {
      addMessage(responses[language].help, false);
      return;
    }

    if (userMessage === '/switch') {
      const newLanguage = language === 'en' ? 'ar' : 'en';
      setLanguage(newLanguage);
      addMessage(responses[newLanguage].language_switch, false);
      return;
    }

    // Check for local responses first
    const localResponse = getLocalResponse(userMessage);
    if (localResponse) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage(localResponse, false);
      }, 1000);
      return;
    }

    // Simulate AI response
    setIsTyping(true);
    try {
      const response = await simulateAIResponse(userMessage);
      setIsTyping(false);
      addMessage(response, false);
    } catch (error) {
      setIsTyping(false);
      addMessage(responses[language].error, false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const switchLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    addMessage(responses[newLanguage].language_switch, false);
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BotIcon className="h-5 w-5" />
                <div>
                  <h3 className="font-semibold text-sm">T-Shirt Design Assistant</h3>
                  <p className="text-xs opacity-90">Powered by AI</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={switchLanguage}
                  className="text-white hover:bg-white/20 p-1"
                >
                  <LanguagesIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                    } ${message.language === 'ar' ? 'text-right' : 'text-left'}`}
                    dir={message.language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <div className="flex items-start space-x-2">
                      {!message.isUser && (
                        <BotIcon className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.isUser && (
                        <UserIcon className="h-4 w-4 text-blue-200 mt-0.5 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
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
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
                  className="flex-1 text-sm"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  variant="primary"
                  size="sm"
                  className="px-3"
                >
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
      >
        {isOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MessageCircleIcon className="h-6 w-6" />
        )}
      </motion.button>
    </div>
  );
};
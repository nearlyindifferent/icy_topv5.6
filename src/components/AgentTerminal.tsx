import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

export const AgentTerminal = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: 'Ready. How can I help?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        'Processing your request...',
        'Here\'s what I found based on your query.',
        'Done. Is there anything else you need?',
        'I\'ve analyzed the data. Ready for next steps.',
      ];
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen pb-48 md:pl-24 px-4 md:px-8 flex flex-col">
      {/* Header */}
      <header className="pt-8 pb-6">
        <h1 className="text-xl font-medium tracking-tight">Agent</h1>
        <p className="text-sm text-muted-foreground mt-1">Your AI assistant</p>
      </header>

      {/* Messages */}
      <div className="flex-1 space-y-6 overflow-y-auto">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'agent' ? (
                <div className="max-w-lg">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Agent</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {message.content}
                  </p>
                </div>
              ) : (
                <div className="max-w-lg bubble-user">
                  <p className="text-sm text-foreground">
                    {message.content}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-muted-foreground animate-pulse" />
            <span className="text-sm text-muted-foreground">Thinking...</span>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form 
        onSubmit={handleSubmit}
        className="fixed bottom-28 md:bottom-8 left-4 right-4 md:left-28 md:right-8 max-w-2xl mx-auto"
      >
        <motion.div
          className={`flex items-center gap-3 bg-card rounded-2xl px-4 py-3 border transition-colors duration-200 ${
            isFocused ? 'border-muted-foreground/30' : 'border-border'
          }`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <motion.button
            type="submit"
            disabled={!input.trim()}
            className="text-sm font-medium text-foreground disabled:text-muted-foreground hover-bright"
            whileTap={{ scale: 0.95 }}
          >
            Send
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
};

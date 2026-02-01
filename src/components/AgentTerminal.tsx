import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send } from 'lucide-react';

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
      content: 'AGENT_V3 ONLINE. READY.',
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

    // Simulate agent response with typewriter effect
    setTimeout(() => {
      const responses = [
        'PROCESSING REQUEST...',
        'EXECUTING COMMAND: ' + input.toUpperCase(),
        'OPERATION COMPLETE. AWAITING NEXT DIRECTIVE.',
        'ANALYZING DATA STREAMS... PATTERNS DETECTED.',
        'SYSTEM INTEGRITY VERIFIED. ALL PROTOCOLS ACTIVE.',
      ];
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-48 md:pl-24 px-4 md:px-8 flex flex-col">
      {/* Header */}
      <header className="pt-8 pb-6 text-center">
        <h1 className="text-sm font-mono uppercase tracking-terminal text-primary">
          AGENT_V3 // ENCRYPTED
        </h1>
      </header>

      {/* Messages */}
      <div className="flex-1 space-y-6 overflow-y-auto">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'agent' ? (
                <div className="max-w-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="w-4 h-4 text-primary" />
                    <span className="text-xs font-mono uppercase tracking-terminal text-primary">
                      System
                    </span>
                  </div>
                  <TypewriterText text={message.content} />
                </div>
              ) : (
                <div className="max-w-lg">
                  <p className="text-sm font-mono text-foreground bg-card/50 px-4 py-2 rounded-lg">
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
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-muted-foreground">
              Processing<span className="cursor-blink">█</span>
            </span>
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
          className={`flex items-center gap-3 bg-black rounded-full px-4 py-3 border transition-all duration-300 ${
            isFocused ? 'border-primary cyber-glow' : 'border-border'
          }`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="ENTER COMMAND..."
            className="flex-1 bg-transparent text-sm font-mono uppercase tracking-terminal text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <motion.button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-terminal rounded-md"
            whileTap={{ scale: 0.96 }}
          >
            EXEC
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
};

// Typewriter effect component
const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className="text-sm font-mono uppercase tracking-terminal text-foreground">
      {displayText}
      {!isComplete && <span className="cursor-blink">█</span>}
    </p>
  );
};

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, User, Users, Hash, ImagePlus, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'other' | 'ai';
  senderName: string;
  content: string;
  timestamp: Date;
  avatar?: string;
}

interface Channel {
  id: string;
  name: string;
  type: 'channel' | 'dm';
  unread: number;
  icon?: React.ComponentType<{ className?: string }>;
}

const channels: Channel[] = [
  { id: '1', name: 'general', type: 'channel', unread: 3, icon: Hash },
  { id: '2', name: 'engineering', type: 'channel', unread: 0, icon: Hash },
  { id: '3', name: 'Alex Chen', type: 'dm', unread: 1 },
  { id: '4', name: 'Helper AI', type: 'dm', unread: 0, icon: Bot },
];

const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'other',
    senderName: 'Alex Chen',
    content: 'Hey team, the new API integration is live. Can someone test the endpoints?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '2',
    sender: 'user',
    senderName: 'You',
    content: 'On it. Running tests now.',
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
  },
  {
    id: '3',
    sender: 'ai',
    senderName: 'Helper AI',
    content: 'I can assist with testing. Would you like me to run the automated test suite?',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
  },
];

export const Hive = () => {
  const [activeChannel, setActiveChannel] = useState('1');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
      sender: 'user',
      senderName: 'You',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const query = input;
    setInput('');

    // Check for @helper mention
    if (query.toLowerCase().includes('@helper')) {
      setIsTyping(true);
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          senderName: 'Helper AI',
          content: getHelperResponse(query),
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const getHelperResponse = (query: string): string => {
    if (query.includes('summarize')) {
      return 'Here\'s a summary: The team discussed the new API integration. Alex reported it\'s live and requested testing. Automated tests are available upon request.';
    }
    if (query.includes('status')) {
      return 'Current system status: All APIs operational. 2 active integrations. 0 pending issues.';
    }
    return 'I\'m here to help! Try asking me to "summarize this" or check "status".';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setIsScanning(true);
    
    // Simulate scanning animation
    setTimeout(() => {
      setIsScanning(false);
      const fileMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        senderName: 'You',
        content: '📎 Uploaded: document.pdf',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, fileMessage]);
    }, 2000);
  };

  const getBubbleClasses = (sender: 'user' | 'other' | 'ai') => {
    switch (sender) {
      case 'user':
        return 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white ml-auto';
      case 'ai':
        return 'bg-card border-2 border-amber-500/50 text-foreground';
      default:
        return 'bg-card/80 backdrop-blur-sm border border-border text-foreground';
    }
  };

  return (
    <div className="min-h-screen pb-32 md:pl-24 flex flex-col md:flex-row">
      {/* Sidebar - Channels/Contacts */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border bg-card/50 backdrop-blur-sm">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-mono uppercase tracking-terminal text-indigo-400">
              HIVE // SECURE
            </h2>
          </div>
          
          <div className="space-y-1">
            {channels.map((channel) => (
              <motion.button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  activeChannel === channel.id 
                    ? 'bg-indigo-500/20 text-indigo-400' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {channel.icon ? (
                  <channel.icon className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
                <span className="text-sm font-mono flex-1 text-left">{channel.name}</span>
                {channel.unread > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-indigo-500 text-[10px] font-mono text-white">
                    {channel.unread}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </aside>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-[calc(100vh-8rem)] md:h-screen">
        {/* Chat Header */}
        <header className="px-4 py-3 border-b border-border flex items-center gap-3">
          <Hash className="w-4 h-4 text-muted-foreground" />
          <span className="font-mono text-sm">general</span>
          <div className="ml-auto flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-mono text-muted-foreground">12 online</span>
          </div>
        </header>

        {/* Messages */}
        <motion.div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.1}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Drag & Drop Overlay */}
          <AnimatePresence>
            {isDragging && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-indigo-500/20 backdrop-blur-sm z-40 flex items-center justify-center pointer-events-none"
              >
                <div className="text-center">
                  <ImagePlus className="w-12 h-12 text-indigo-400 mx-auto mb-2" />
                  <p className="font-mono text-indigo-400">Drop to upload</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scanning Overlay */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 className="w-12 h-12 text-primary mx-auto mb-2" />
                  </motion.div>
                  <p className="font-mono text-primary uppercase tracking-terminal">Scanning...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] md:max-w-[60%]`}>
                  {message.sender !== 'user' && (
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === 'ai' ? (
                        <Sparkles className="w-3 h-3 text-amber-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                          <User className="w-3 h-3 text-muted-foreground" />
                        </div>
                      )}
                      <span className={`text-xs font-mono ${
                        message.sender === 'ai' ? 'text-amber-500' : 'text-muted-foreground'
                      }`}>
                        {message.senderName}
                      </span>
                    </div>
                  )}
                  <motion.div
                    className={`px-4 py-2 rounded-2xl ${getBubbleClasses(message.sender)}`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className="text-sm">{message.content}</p>
                  </motion.div>
                  <span className="text-[10px] font-mono text-muted-foreground mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span className="text-xs font-mono text-amber-500">Helper AI is typing...</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                █
              </motion.span>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </motion.div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-border">
          <div className="flex items-center gap-3 bg-card rounded-full px-4 py-2 border border-border focus-within:border-indigo-500 transition-colors">
            <button 
              type="button" 
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ImagePlus className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message #general or @helper..."
              className="flex-1 bg-transparent text-sm font-mono placeholder:text-muted-foreground focus:outline-none"
            />
            <motion.button
              type="submit"
              className="p-2 bg-indigo-500 text-white rounded-full"
              whileTap={{ scale: 0.96 }}
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

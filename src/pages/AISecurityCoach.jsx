import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Sparkles, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Predefined simulated answers to direct questions
const COACH_RESPONSES = {
  "what is phishing?": `### What is Phishing?

**Phishing** is a form of cyber attack where attackers pretend to be reputable institutions (like banks, cloud providers, or your company's IT desk) via email, phone, or messaging to trick you into revealing sensitive information.

*   **Key Vectors**: Email links, spoofed login forms, attachment payloads.
*   **Target Data**: Passwords, SSNs, credit card numbers, 2FA tokens.
*   **Core Defense**: Never click unsolicited links, always inspect sender domains, and check with the organization through a verified channel.`,

  "how can i create a strong password?": `### Creating a Strong Password

A strong password prevents automated brute-force attacks and credential cracking. Here are the best practices:

1.  **Use Passphrases**: Combine 4 or more random words (e.g., \`Purple-Octopus-Coffee-Sailing!\`). They are easily remembered by humans but extremely difficult for computers to crack.
2.  **Avoid Common Substitutions**: Standard replacements (like \`P@ssw0rd\`) are already indexed in attacker databases.
3.  **No Reuse**: Never use the same password across multiple websites.
4.  **Use a Password Manager**: Tools like Bitwarden or 1Password generate, secure, and auto-fill strong, unique keys.`,

  "how do i identify a suspicious email?": `### Identifying Suspicious Emails

Always inspect incoming emails for these primary indicators of threat:

*   **Sender Address Mismatch**: The display name looks official, but the actual domain in the email header is look-alike or suspicious (e.g., \`support@paypa1-update.com\`).
*   **Sense of Urgency**: Creating panic (e.g., *"Account locked within 2 hours!"*) to force fast action.
*   **Unsolicited Attachments**: Files ending in \`.zip\`, \`.iso\`, \`.scr\`, or macro-enabled documents (\`.docm\`).
*   **Deceptive Links**: Hover over links to reveal their actual destination before clicking.`,

  "what is ransomware?": `### What is Ransomware?

**Ransomware** is a sophisticated type of malware that locks/encrypts files on your computer and demands a payment (usually in cryptocurrency like Monero or Bitcoin) to receive the decryption key.

*   **Double Extortion**: Modern attacks encrypt files *and* steal data, threatening to leak it publicly if you don't pay.
*   **The Golden Rule**: **Never pay the ransom**. It funds crime and doesn't guarantee your files will be restored.
*   **Best Defense**: Implement the **3-2-1 Backup Strategy** with at least one offline/air-gapped copy.`,

  "how can i stay safe on public wi-fi?": `### Staying Safe on Public Wi-Fi

Public Wi-Fi networks (like in airports or coffee shops) are often unencrypted, meaning anyone on the same network can intercept your traffic (packet sniffing) or execute Man-in-the-Middle (MITM) attacks.

*   **Use a VPN**: A Virtual Private Network encrypts your connection end-to-end, making intercepted packets unreadable.
*   **Turn off Auto-Connect**: Prevent your phone/laptop from silently connecting to rogue networks.
*   **Check HTTPS**: Confirm the padlock icon is visible in your browser address bar.`,

  "what should i do if i clicked a phishing link?": `### Incident Response: Clicked a Phishing Link?

If you suspect you've clicked a phishing link or entered your credentials on a fake site, act immediately to mitigate the threat:

1.  **Disconnect Network**: Unplug your Ethernet cable or turn off Wi-Fi immediately to contain potential malware spread.
2.  **Change Credentials**: Change the password of the compromised account (and any other account sharing that password) from a separate, secure device.
3.  **Report the Incident**: Notify your IT or security department immediately. Early detection helps security teams isolate threats.
4.  **Scan for Malware**: Run a complete antivirus/anti-malware scan on your system.`
};

// Fallback search/default response logic
const getCoachResponse = (input) => {
  const query = input.trim().toLowerCase().replace(/[?.,!]/g, "");
  
  if (COACH_RESPONSES[query]) {
    return COACH_RESPONSES[query];
  }

  // Attempt fuzzy matching
  if (query.includes("phish") || query.includes("email") || query.includes("link")) {
    return `### Phishing Defense Summary\n\nIt sounds like you're asking about phishing. Always remember:\n1. Check the sender's full email address.\n2. Hover over links to verify destination URLs.\n3. Never share login credentials or MFA codes via email.\n\nWould you like to try one of the suggested questions for a detailed guide?`;
  }
  if (query.includes("password") || query.includes("mfa") || query.includes("auth")) {
    return `### Password & MFA Hygiene\n\nKeep your credentials secure:\n1. Use a password manager for unique passwords.\n2. Enable Multi-Factor Authentication (MFA) everywhere.\n3. Create passphrases instead of complex short passwords.`;
  }
  if (query.includes("ransomware") || query.includes("backup")) {
    return `### Ransomware Mitigation\n\nRansomware encrypts your systems. Prevent damage by keeping **offline, air-gapped backups** using the 3-2-1 strategy and isolating infected computers immediately.`;
  }
  if (query.includes("wi-fi") || query.includes("wifi") || query.includes("network") || query.includes("vpn")) {
    return `### Network Security Advisor\n\nPublic network connections are vulnerable. Eavesdroppers can capture plain-text traffic. Always activate an encrypted **Virtual Private Network (VPN)** tunnel when on open connections.`;
  }

  return `### AI Security Coach Response\n\nThank you for your question. I am currently running on local cybersecurity knowledge. For specific help, you can use the suggested questions below.\n\n*Developer Note: This local response engine can be easily replaced with a real Gemini or OpenAI API key in the backend controllers later.*`;
};

export const AISecurityCoach = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'coach',
      text: `Hello ${user.name.split(' ')[0] || 'operator'}, I am your CyberQuest Security Coach. Ask me any cybersecurity question or pick one of the recommended topics below!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "What is phishing?",
    "How can I create a strong password?",
    "How do I identify a suspicious email?",
    "What is ransomware?",
    "How can I stay safe on public Wi-Fi?",
    "What should I do if I clicked a phishing link?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate coach response with a typing delay
    setTimeout(() => {
      const responseText = getCoachResponse(textToSend);
      const coachMessage = {
        id: `coach-${Date.now()}`,
        sender: 'coach',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, coachMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex flex-col h-[calc(100vh-6rem)]">
      
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-cyan-500/30 relative overflow-hidden shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-mono">AI Security Coach</h1>
            <p className="text-xs text-gray-400">Your personal cybersecurity learning assistant.</p>
          </div>
        </div>
      </div>

      {/* Chat Area Grid */}
      <div className="flex-grow flex flex-col lg:flex-row gap-6 min-h-0">
        
        {/* Suggested Questions Side panel */}
        <div className="w-full lg:w-80 glass-card rounded-3xl p-5 border border-cyan-500/20 flex flex-col shrink-0">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-300 border-b border-cyan-500/15 pb-2 mb-3">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>SUGGESTED DISCUSSIONS</span>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="w-full text-left p-3 rounded-xl border border-cyan-500/10 bg-[#060b1e] hover:border-cyan-500/30 hover:bg-white/5 text-xs text-gray-300 transition-all font-sans leading-relaxed"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Thread */}
        <div className="flex-grow flex flex-col glass-card rounded-3xl border border-cyan-500/20 overflow-hidden min-h-0 bg-[#060b1e]/50">
          
          {/* Thread messages container */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => {
              const isCoach = msg.sender === 'coach';
              
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3.5 max-w-[85%] ${
                    isCoach ? '' : 'ml-auto flex-row-reverse'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    isCoach 
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                      : 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                  }`}>
                    {isCoach ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1">
                    <div className={`rounded-2xl p-4 text-sm leading-relaxed ${
                      isCoach 
                        ? 'bg-[#060b1e] border border-cyan-500/10 text-gray-200' 
                        : 'bg-gradient-to-r from-purple-600/30 to-pink-600/20 border border-purple-500/20 text-white'
                    }`}>
                      {/* Very simple markdown parser for bold/headings/lists */}
                      <div className="whitespace-pre-line font-sans space-y-1">
                        {msg.text.split('\n').map((line, lIdx) => {
                          if (line.startsWith('### ')) {
                            return <h3 key={lIdx} className="text-sm font-bold text-cyan-300 pt-2 pb-1 font-mono">{line.substring(4)}</h3>;
                          }
                          if (line.startsWith('*   ') || line.startsWith('1.  ') || line.startsWith('2.  ') || line.startsWith('3.  ') || line.startsWith('4.  ')) {
                            return <div key={lIdx} className="pl-4 font-sans text-gray-300 text-xs">{line}</div>;
                          }
                          // Detect bold tags **text**
                          if (line.includes('**')) {
                            const parts = line.split('**');
                            return (
                              <p key={lIdx} className="text-xs">
                                {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-bold">{part}</strong> : part)}
                              </p>
                            );
                          }
                          return <p key={lIdx} className="text-xs">{line}</p>;
                        })}
                      </div>
                    </div>
                    <span className={`text-[9px] font-mono text-gray-500 block ${isCoach ? '' : 'text-right'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-start gap-3.5 max-w-[85%]">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border bg-cyan-500/10 border-cyan-500/30 text-cyan-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-[#060b1e] border border-cyan-500/10 rounded-2xl p-4 text-xs font-mono text-gray-400 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[10px] pl-1">Coach is analyzing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Form input bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-4 border-t border-cyan-500/15 flex gap-3 bg-[#050814]/75"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask the Security Coach a question..."
              className="flex-grow bg-[#060b1e] border border-cyan-500/20 focus:border-cyan-400 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-500 focus:outline-none font-mono"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="neon-glow-btn p-3 rounded-xl text-white shadow-lg disabled:opacity-40 disabled:cursor-not-allowed shrink-0 flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};

'use client';

import { useEffect, useRef, useState } from 'react';

type TabType = 'home' | 'messages' | 'help' | 'news';
type ViewType = 'tabs' | 'chat';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentView, setCurrentView] = useState<ViewType>('tabs');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startChat = () => {
    setCurrentView('chat');
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hi there! I\'m Lia, happy to help you get the answers you need about Food Label Maker today',
        timestamp: new Date(),
      },
      {
        id: '2',
        role: 'assistant',
        content: 'How can I help?',
        timestamp: new Date(),
      },
    ]);
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are RIA, an AI assistant for Food Label Maker software. Help users with questions about food labeling, nutrition facts, ingredients, FDA compliance, and the software features. Be helpful, concise, and professional. User question: ${inputValue}`,
                  },
                ],
              },
            ],
          }),
        },
      );

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not process that request.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const backToTabs = () => {
    setCurrentView('tabs');
    setMessages([]);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 overflow-hidden rounded-lg bg-white shadow-2xl">
          <div className="bg-gradient-to-r from-teal-700 to-teal-600 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {currentView === 'chat'
                  ? (
                      <>
                        <button onClick={backToTabs} className="text-white hover:text-slate-200">
                          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <div className="flex items-center gap-2">
                          <div className="size-8 rounded-full bg-orange-400" />
                          <div>
                            <div className="text-sm font-semibold text-white">RIA</div>
                            <div className="text-xs text-teal-100">The team can also help</div>
                          </div>
                        </div>
                      </>
                    )
                  : (
                      <span className="text-sm font-semibold text-white">FoodLabelMaker.com</span>
                    )}
              </div>
              <div className="flex items-center gap-2">
                {currentView === 'tabs' && (
                  <div className="flex -space-x-2">
                    <div className="size-8 rounded-full border-2 border-white bg-slate-300" />
                    <div className="size-8 rounded-full border-2 border-white bg-slate-300" />
                    <div className="size-8 rounded-full border-2 border-white bg-slate-300" />
                  </div>
                )}
                {currentView === 'chat' && (
                  <button className="text-white hover:text-slate-200">
                    <svg className="size-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="text-white hover:text-slate-200">
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-[500px] overflow-y-auto p-6">
            {currentView === 'chat'
              ? (
                  <div className="space-y-4">
                    {messages.map(message => (
                      <div key={message.id}>
                        {message.role === 'assistant'
                          ? (
                              <div className="flex gap-2">
                                <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-slate-100 p-3">
                                  <p className="whitespace-pre-wrap text-sm text-slate-800">{message.content}</p>
                                  <p className="mt-2 text-xs text-slate-500">RIA • AI Agent • Just now</p>
                                </div>
                              </div>
                            )
                          : (
                              <div className="flex justify-end">
                                <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-teal-700 p-3">
                                  <p className="whitespace-pre-wrap text-sm text-white">{message.content}</p>
                                </div>
                              </div>
                            )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-2">
                        <div className="rounded-2xl rounded-tl-sm bg-slate-100 p-3">
                          <div className="flex gap-1">
                            <span className="size-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '0ms' }} />
                            <span className="size-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '150ms' }} />
                            <span className="size-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )
              : (
                  <>
                    {activeTab === 'home' && (
                      <>
                        <div className="mb-6">
                          <h2 className="mb-1 text-2xl font-bold text-slate-800">Hi Pro 👋</h2>
                          <p className="text-lg text-slate-600">How can we help?</p>
                        </div>

                        <button onClick={startChat} className="mb-4 w-full rounded-lg border border-slate-200 bg-white p-4 text-left transition-shadow hover:shadow-md">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="mb-1 font-semibold text-slate-800">Ask a question</div>
                              <div className="text-sm text-slate-500">AI Agent and team can help</div>
                            </div>
                            <div className="flex size-10 items-center justify-center rounded-full bg-teal-100">
                              <svg className="size-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </div>
                        </button>

                        <div className="mb-6">
                          <div className="relative">
                            <input type="text" placeholder="Search for help" className="w-full rounded-lg border border-slate-200 py-3 pl-4 pr-10 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
                            <svg className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {['How to Print Your Labels & Choose the Right Printer', 'How Subscription Upgrades Work on FoodLabelMaker.com', 'Hire an Expert Services', 'Hire an Expert Services'].map((topic, index) => (
                            <button key={index} className="flex w-full items-center justify-between rounded-lg p-3 text-left text-sm text-slate-600 transition-colors hover:bg-slate-50">
                              <span>{topic}</span>
                              <svg className="size-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {activeTab === 'messages' && (
                      <div className="flex min-h-[400px] flex-col items-center justify-center py-8 text-center">
                        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-slate-800">
                          <svg className="size-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                          </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-slate-800">No messages</h3>
                        <p className="mb-8 text-sm text-slate-600">Messages from the team will be shown here</p>
                        <button className="flex items-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-teal-800">
                          Ask a question
                          <svg className="size-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                          </svg>
                        </button>
                      </div>
                    )}

                    {activeTab === 'help' && (
                      <div>
                        <div className="mb-6">
                          <div className="relative">
                            <input type="text" placeholder="Search for help" className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-4 pr-10 text-sm focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500" />
                            <svg className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>

                        <h3 className="mb-4 text-lg font-bold text-slate-800">4 collections</h3>

                        <div className="space-y-1">
                          <button className="w-full rounded-lg p-4 text-left transition-colors hover:bg-slate-50">
                            <div className="mb-1 font-semibold text-slate-800">Food Label Maker Features</div>
                            <div className="mb-2 flex items-start justify-between">
                              <div className="flex-1 pr-4 text-sm text-slate-600">FLM Essentials: Master the Tools</div>
                              <svg className="mt-1 size-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                            <div className="text-xs text-slate-500">18 articles</div>
                          </button>

                          <button className="w-full rounded-lg p-4 text-left transition-colors hover:bg-slate-50">
                            <div className="mb-1 font-semibold text-slate-800">Food label Maker Overview</div>
                            <div className="mb-2 flex items-start justify-between">
                              <div className="flex-1 pr-4 text-sm text-slate-600">Commonly Asked Questions</div>
                              <svg className="mt-1 size-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                            <div className="text-xs text-slate-500">7 articles</div>
                          </button>

                          <button className="w-full rounded-lg p-4 text-left transition-colors hover:bg-slate-50">
                            <div className="mb-1 font-semibold text-slate-800">Subscription & Plans</div>
                            <div className="mb-2 flex items-start justify-between">
                              <div className="flex-1 pr-4 text-sm text-slate-600">Manage Subscription: Plans, Upgrades & Cancellations</div>
                              <svg className="mt-1 size-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                            <div className="text-xs text-slate-500">11 articles</div>
                          </button>

                          <button className="w-full rounded-lg p-4 text-left transition-colors hover:bg-slate-50">
                            <div className="mb-1 font-semibold text-slate-800">Supplement Facts Labeling Software</div>
                            <div className="mb-2 flex items-start justify-between">
                              <div className="flex-1 pr-4 text-sm text-slate-600">Overview of how to use the tool</div>
                              <svg className="mt-1 size-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                            <div className="text-xs text-slate-500">4 articles</div>
                          </button>
                        </div>
                      </div>
                    )}

                    {activeTab === 'news' && (
                      <div>
                        <div className="mb-6 flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-slate-800">Latest</h3>
                            <p className="text-sm text-slate-600">From Team Food Label Maker, Inc.</p>
                          </div>
                          <div className="flex -space-x-2">
                            <div className="size-10 overflow-hidden rounded-full border-2 border-white bg-slate-300" />
                            <div className="size-10 overflow-hidden rounded-full border-2 border-white bg-slate-300" />
                            <div className="size-10 overflow-hidden rounded-full border-2 border-white bg-slate-300" />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <button className="w-full overflow-hidden rounded-lg border border-slate-200 text-left transition-shadow hover:shadow-md">
                            <div className="relative h-40 bg-gradient-to-br from-teal-800 to-teal-700 p-4 text-white">
                              <div className="mb-2 inline-block rounded bg-yellow-500 px-2 py-1 text-xs font-semibold text-slate-900">🔴 LIVE WEBINAR</div>
                              <h4 className="mb-2 text-lg font-bold">Supplement Formulation and Labeling Demo</h4>
                              <p className="mb-3 text-sm text-yellow-400">Join Our Free Webinar</p>
                              <div className="flex gap-4 text-xs">
                                <div>📅 9th December, 2025</div>
                                <div>
                                  🕐 2:00 PM EST
                                  <br />
                                  11:00 AM Pacific
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <h5 className="mb-2 font-semibold text-slate-800">Join our Supplement Formulation & Labeling Webinar</h5>
                              <p className="text-sm text-slate-600">Hi there,</p>
                              <svg className="ml-auto mt-2 size-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
          </div>

          {currentView === 'chat'
            ? (
                <div className="border-t border-slate-200 bg-white p-4">
                  <div className="relative rounded-2xl border-2 border-teal-700">
                    <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask a question..." className="w-full rounded-2xl py-3 pl-4 pr-32 text-sm focus:outline-none" />
                    <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
                      <button className="text-slate-400 hover:text-slate-600">
                        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </button>
                      <button className="text-slate-400 hover:text-slate-600">
                        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <button className="text-slate-400 hover:text-slate-600">
                        <svg className="size-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="text-slate-400 hover:text-slate-600">
                        <svg className="size-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button onClick={sendMessage} disabled={!inputValue.trim() || isLoading} className="rounded-full bg-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-300 disabled:opacity-50">
                        <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )
            : (
                <div className="border-t border-slate-200 bg-white px-2 py-3">
                  <div className="flex items-center justify-around">
                    <button onClick={() => setActiveTab('home')} className="flex flex-col items-center gap-1 rounded-lg px-4 py-2 transition-colors hover:bg-slate-50">
                      <svg className={`size-5 ${activeTab === 'home' ? 'text-teal-700' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      <span className={`text-xs ${activeTab === 'home' ? 'font-semibold text-teal-700' : 'text-slate-600'}`}>Home</span>
                    </button>
                    <button onClick={() => setActiveTab('messages')} className="flex flex-col items-center gap-1 rounded-lg px-4 py-2 transition-colors hover:bg-slate-50">
                      <svg className={`size-5 ${activeTab === 'messages' ? 'text-teal-700' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                      </svg>
                      <span className={`text-xs ${activeTab === 'messages' ? 'font-semibold text-teal-700' : 'text-slate-600'}`}>Messages</span>
                    </button>
                    <button onClick={() => setActiveTab('help')} className="flex flex-col items-center gap-1 rounded-lg px-4 py-2 transition-colors hover:bg-slate-50">
                      <svg className={`size-5 ${activeTab === 'help' ? 'text-teal-700' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <span className={`text-xs ${activeTab === 'help' ? 'font-semibold text-teal-700' : 'text-slate-600'}`}>Help</span>
                    </button>
                    <button onClick={() => setActiveTab('news')} className="flex flex-col items-center gap-1 rounded-lg px-4 py-2 transition-colors hover:bg-slate-50">
                      <svg className={`size-5 ${activeTab === 'news' ? 'text-teal-700' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                        <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                      </svg>
                      <span className={`text-xs ${activeTab === 'news' ? 'font-semibold text-teal-700' : 'text-slate-600'}`}>News</span>
                    </button>
                  </div>
                </div>
              )}
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-40">
        <button onClick={() => setIsOpen(!isOpen)} className="relative flex size-14 items-center justify-center rounded-full bg-teal-700 text-white shadow-lg transition-transform hover:scale-105 hover:bg-teal-800">
          <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">8</span>
        </button>
      </div>
    </>
  );
};

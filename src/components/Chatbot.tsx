'use client';

import { MessageCircle, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@/utils/Helpers';

type NavigationOption = {
  label: string;
  href: string;
  description: string;
};

const navigationOptions: NavigationOption[] = [
  { label: '🏠 Home', href: '/', description: 'Go back to homepage' },
  { label: '📝 Create Label', href: '/create-label', description: 'Start creating your food label' },
  { label: '🍎 Food Nutrition Labelling', href: '/products/food-nutrition-labelling', description: 'Food labelling solutions' },
  { label: '💊 Supplements Formulation', href: '/products/supplements-formulation', description: 'Supplement labelling' },
  { label: '🏭 Food Manufacturers', href: '/industries/food-manufacturers', description: 'For food manufacturers' },
  { label: '🍽️ Restaurants', href: '/industries/restaurants', description: 'Restaurant solutions' },
  { label: '🏥 Hospitals & Healthcare', href: '/industries/hospitals-healthcare', description: 'Healthcare solutions' },
  { label: '💰 Pricing', href: '/pricing', description: 'View pricing plans' },
  { label: '👨‍💼 Hire an Expert', href: '/hire-expert', description: 'Get professional help' },
  { label: '📚 Resources', href: '/resources', description: 'Browse resources' },
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setShowOptions(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowOptions(false);
  };

  const handleShowOptions = () => {
    setShowOptions(true);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        type="button"
        onClick={isOpen ? handleClose : handleOpen}
        className={cn(
          'fixed bottom-6 left-6 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl',
          isOpen && 'bg-destructive hover:bg-destructive',
        )}
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      >
        {isOpen ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>

      {/* Chatbot Panel */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-40 w-80 rounded-lg border bg-card shadow-2xl transition-all animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="border-b bg-primary p-4 text-primary-foreground">
            <h3 className="text-lg font-semibold">Navigation Assistant</h3>
            <p className="text-sm opacity-90">I&apos;m here to help you navigate!</p>
          </div>

          {/* Chat Messages */}
          <div className="max-h-96 overflow-y-auto p-4">
            {/* Bot Message */}
            <div className="mb-4 flex items-start gap-2">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <MessageCircle className="size-4" />
              </div>
              <div className="flex-1 rounded-lg bg-muted p-3">
                <p className="text-sm">
                  👋 Hi! How can I help you today? Where would you like to go?
                </p>
              </div>
            </div>

            {/* Options */}
            {!showOptions
              ? (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleShowOptions}
                      className="w-full rounded-lg border bg-background p-3 text-left text-sm transition-colors hover:bg-accent"
                    >
                      🗺️ Show me all pages
                    </button>
                  </div>
                )
              : (
                  <div className="space-y-2">
                    <p className="mb-3 text-xs text-muted-foreground">Choose a page to visit:</p>
                    {navigationOptions.map(option => (
                      <Link
                        key={option.href}
                        href={option.href}
                        onClick={handleClose}
                        className="block rounded-lg border bg-background p-3 transition-colors hover:bg-accent"
                      >
                        <div className="text-sm font-medium">{option.label}</div>
                        <div className="text-xs text-muted-foreground">{option.description}</div>
                      </Link>
                    ))}
                  </div>
                )}
          </div>

          {/* Footer */}
          <div className="border-t bg-muted/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">
              Click an option to navigate
            </p>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm transition-opacity"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}
    </>
  );
};

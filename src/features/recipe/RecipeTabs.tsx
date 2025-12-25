'use client';

import type { LucideIcon } from 'lucide-react';
import {
  ClipboardList,
  Construction,
  DollarSign,
  FileText,
  Paperclip,
  PieChart,
} from 'lucide-react';

type TabItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

const tabs: TabItem[] = [
  { id: 'setup', label: 'Recipe Setup', icon: ClipboardList },
  { id: 'builder', label: 'Recipe Builder', icon: Construction },
  { id: 'customize', label: 'Customize Label', icon: FileText },
  { id: 'nutrition', label: 'Nutrition Breakdown', icon: PieChart },
  { id: 'notes', label: 'Notes & Attachments', icon: Paperclip },
  { id: 'costing', label: 'Recipe Costing', icon: DollarSign },
];

type RecipeTabsProps = {
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

export const RecipeTabs = ({ activeTab, onTabChange }: RecipeTabsProps) => {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <div className="flex min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={
                  isActive
                    ? 'flex items-center gap-2 whitespace-nowrap border-b-2 border-teal-600 px-6 py-4 text-sm font-medium text-teal-600 transition-colors'
                    : 'flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent px-6 py-4 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-800'
                }
              >
                <Icon className="size-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

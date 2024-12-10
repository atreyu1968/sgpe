import React, { createContext, useContext, useState } from 'react';

const STORAGE_KEY = 'documentation_settings';

interface DocumentationSettings {
  isEnabled: boolean;
  documentationUrl: string;
}

interface DocumentationContextType {
  isEnabled: boolean;
  documentationUrl: string;
  setDocumentation: (enabled: boolean, url: string) => void;
}

function loadSettings(): DocumentationSettings {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error loading documentation settings:', error);
    }
  }
  return { isEnabled: false, documentationUrl: '' };
}

const DocumentationContext = createContext<DocumentationContextType | null>(null);

export function DocumentationProvider({ children }: { children: React.ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(() => loadSettings().isEnabled);
  const [documentationUrl, setDocumentationUrl] = useState(() => loadSettings().documentationUrl);

  const setDocumentation = (enabled: boolean, url: string) => {
    setIsEnabled(enabled);
    setDocumentationUrl(url);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ isEnabled: enabled, documentationUrl: url }));
  };

  return (
    <DocumentationContext.Provider value={{ isEnabled, documentationUrl, setDocumentation }}>
      {children}
    </DocumentationContext.Provider>
  );
}

export function useDocumentation() {
  const context = useContext(DocumentationContext);
  if (!context) {
    throw new Error('useDocumentation must be used within a DocumentationProvider');
  }
  return context;
}
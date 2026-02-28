import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { codeTemplates } from '@/data/mockData';

export type Language = 'python' | 'javascript' | 'java' | 'cpp' | 'c';

interface CodeEditorProps {
  onCodeChange?: (code: string) => void;
  onRun?: (code: string, language: Language) => void;
  onSubmit?: (code: string, language: Language) => void;
  initialCode?: string;
  language?: Language;
  isRunning?: boolean;
}

const languageLabels: Record<Language, string> = {
  python: 'Python',
  javascript: 'JavaScript',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
};

const monacoLanguageMap: Record<Language, string> = {
  python: 'python',
  javascript: 'javascript',
  java: 'java',
  cpp: 'cpp',
  c: 'c',
};

const CodeEditor = ({ onCodeChange, onRun, onSubmit, initialCode, language: initialLanguage = 'python', isRunning = false }: CodeEditorProps) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [code, setCode] = useState(initialCode || codeTemplates[language]);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleRun = () => {
    onRun?.(code, language);
  };

  const handleSubmit = () => {
    onSubmit?.(code, language);
  }

  const handleReset = () => {
    const template = codeTemplates[language];
    setCode(template);
    onCodeChange?.(template);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-card relative">
      {/* Header Actions */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-[#1e1e1e]">
        {/* Language selector */}
        <div className="relative">
          <button
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#252526] hover:bg-[#2d2d2d] border border-white/5 transition-colors text-sm font-medium text-gray-300"
          >
            {languageLabels[language]}
            <ChevronDown className={`h-4 w-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isLanguageOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute top-full left-0 mt-1 py-1 bg-[#252526] border border-white/5 rounded-md shadow-2xl z-50 min-w-[140px]"
              >
                {(Object.keys(languageLabels) as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      const newTemplate = codeTemplates[lang];
                      setLanguage(lang);
                      setCode(newTemplate);
                      onCodeChange?.(newTemplate);
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-[#333333] transition-colors ${lang === language ? 'text-[#00ff88]' : 'text-gray-300'
                      }`}
                  >
                    {languageLabels[lang]}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground hover:text-foreground">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRun}
            disabled={isRunning}
            className="gap-2 border-white/10 hover:bg-white/5"
          >
            {isRunning ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"
              />
            ) : (
              <Play className="h-4 w-4 text-green-400" />
            )}
            Run Code
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={handleSubmit}
            disabled={isRunning}
            className="gap-2 bg-[#00ff88] text-[#0f172a] hover:bg-[#00cc6a]"
          >
            <CheckCircle2 className="h-4 w-4" />
            Submit
          </Button>
        </div>
      </div>

      {/* Editor Main */}
      <div className="flex-1 overflow-hidden bg-[#1e1e1e]">
        <Editor
          height="100%"
          language={monacoLanguageMap[language]}
          value={code}
          onChange={handleCodeChange}
          onMount={handleEditorMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            wordWrap: 'on',
            contextmenu: true,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            formatOnPaste: true,
          }}
        />
      </div>

    </div>
  );
};

export default CodeEditor;

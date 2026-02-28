import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, BookOpen, CheckCircle2, Volume2, VolumeX, Bot, Sparkles, Cpu } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import CodeEditor, { Language } from '@/components/editor/CodeEditor';
import Terminal from '@/components/editor/Terminal';
import { Button } from '@/components/ui/button';
import { codeTemplates } from '@/data/mockData';
import ReactMarkdown from 'react-markdown';
import { submitCode, ExecutionResult, LANGUAGE_IDS } from '@/services/judge0';
import { toast } from 'sonner';
import api from '@/utils/api';

import ArticleView from '@/components/Marga/Learning/ArticleView';
import QuizView from '@/components/Marga/Learning/QuizView';
import AIChatbot from '@/components/Marga/Learning/AIChatbot';

const ChallengePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const backUrl = searchParams.get('from') === 'learning-path' ? '/learning-path' : '/challenges';

  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [code, setCode] = useState('');
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleReadInstructions = () => {
    if (!challenge) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    if (!('speechSynthesis' in window)) {
      toast.error('Text-to-Speech is not supported in this browser.');
      return;
    }

    const stripMd = (str: string) => str ? str.replace(/[*_#`]/g, '') : '';
    const textToRead = `Challenge: ${challenge.title}. Problem description: ${stripMd(challenge.description)}. ${challenge.instructions ? 'Instructions: ' + stripMd(challenge.instructions) : ''}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;

    utterance.onend = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };
  const [isAITutorSpeaking, setIsAITutorSpeaking] = useState(false);

  const handleAITutorSpeak = () => {
    if (!challenge) return;
    if (isAITutorSpeaking) {
      window.speechSynthesis.cancel();
      setIsAITutorSpeaking(false);
      return;
    }
    if (!('speechSynthesis' in window)) {
      toast.error('Text-to-Speech is not supported in this browser.');
      return;
    }

    const hints = [
      "Let's break down the problem statement.",
      `We need to focus on variables and data flows for ${challenge.title}.`,
      "First, define your initial variables and check the edge cases.",
      "Then, iterate or process the input as required by the optimal algorithm.",
      "Remember to return exactly what the problem asks for."
    ].join(' ');

    const textToRead = `Hello, I am your AI Tutor. Here are some insights for ${challenge.title}. ${hints} Good luck with your logic building!`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'en-US';
    utterance.pitch = 1.1; // Make it sound slightly different from the basic reader
    utterance.rate = 0.95;

    utterance.onend = () => setIsAITutorSpeaking(false);

    setIsAITutorSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  interface VisualVariable {
    name: string;
    value: string;
    type: 'array' | 'string' | 'number' | 'node' | 'unknown';
  }

  const parsedVariables = useMemo(() => {
    if (!code) return [];
    const vars: Record<string, VisualVariable> = {};
    const lines = code.split('\n');
    lines.forEach(line => {
      // Basic detection for let/const/var or Python assignments: varName = something
      // We look for assignments like `x = "hello"`, `arr = [1, 2, 3]`, `n = Node(1)`
      const match = line.match(/^\s*(?:let\s+|const\s+|var\s+)?([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(.*)/);
      if (match) {
        const name = match[1];
        let val = match[2].trim().replace(/;$/, '');

        let type: VisualVariable['type'] = 'unknown';
        if (val.startsWith('[')) type = 'array';
        else if (val.startsWith('"') || val.startsWith("'")) type = 'string';
        else if (!isNaN(Number(val))) type = 'number';
        else if (val.includes('Node') || val.includes('Tree') || val.includes('List')) type = 'node';

        vars[name] = { name, value: val, type };
      }
    });
    return Object.values(vars);
  }, [code]);

  // Simplified Challenge Page

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        let data;
        try {
          // Try standard challenge first
          const res = await api.get(`/challenges/${id}`);
          data = res.data;
        } catch (err: any) {
          // If not found, try learning path challenge
          if (err.response && err.response.status === 404) {
            const res = await api.get(`/learning/challenges/${id}`);
            data = res.data;
          } else {
            throw err;
          }
        }

        setChallenge(data);

        if (data.type === 'Algorithm' || data.type === 'Debugging' || !data.type) {
          // Default to coding layout if no type or specific type
          setCode(data.initialCode || data.template || codeTemplates.python);
        }
      } catch (err) {
        console.error("Failed fetching challenge", err);
        toast.error("Challenge not found or corrupted.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchChallenge();
  }, [id]);

  const handleQuizComplete = (score: number) => {
    setShowSuccess(true);
    setEarnedXP(challenge.xpReward);
  };

  const handleArticleComplete = () => {
    setShowSuccess(true);
    setEarnedXP(challenge.xpReward);
  };

  const handleRunCode = async (runCode: string, language: string) => {
    setIsExecuting(true);
    try {
      const langId = LANGUAGE_IDS[language as Language] || 71;
      const result = await submitCode(runCode, langId, challenge.testCases?.[0]?.input || "");
      setExecutionResult(result);
    } catch (e: any) {
      toast.error("Execution Failed: " + e.message);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSubmitCode = async (runCode: string, language: string) => {
    setIsExecuting(true);
    try {
      const langId = LANGUAGE_IDS[language as Language] || 71;

      // In a real scenario, you'd run multiple test cases hidden from the user.
      // For this frontend demo, we run it once against public test cases or just pretend it's a submission run.
      const result = await submitCode(runCode, langId, challenge.testCases?.[0]?.input || "");
      setExecutionResult(result);

      if (result.status.id === 3) {
        // ID 3 means Accepted in Judge0
        setShowSuccess(true);
        setEarnedXP(challenge.xpReward || 50);
        toast.success("All test cases passed!");
        // TODO: Optional API call to mark challenge as complete for user
      } else {
        toast.error("Submission failed. Review the console output.");
      }
    } catch (e: any) {
      toast.error("Submission Error: " + e.message);
    } finally {
      setIsExecuting(false);
    }
  };


  if (loading) return <div className="min-h-[100dvh] bg-background flex items-center justify-center">Loading Mission Details...</div>;
  if (!challenge) return <div className="min-h-[100dvh] bg-background flex items-center justify-center">Challenge Data Corrupted</div>;

  return (
    <div className="min-h-[100dvh] h-[100dvh] bg-[#0f1011] flex flex-col overflow-hidden">
      {/* Top Navbar Header */}
      <div className="h-14 shrink-0 px-4 border-b border-white/10 bg-[#161616] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={backUrl}>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              {challenge.difficulty}
            </span>
            <h1 className="text-sm font-semibold text-gray-200">
              {challenge.title}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 text-cq-gold bg-cq-gold/10 px-3 py-1 rounded-full border border-cq-gold/20">
          <Star className="h-4 w-4" />
          <span className="font-display font-bold text-sm tracking-wide">{challenge.xpReward} XP</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {challenge.type === 'Article' ? (
          <div className="flex-1 overflow-y-auto"><ArticleView title={challenge.title} content={challenge.articleContent || challenge.description} resources={challenge.resources || []} onComplete={handleArticleComplete} /></div>
        ) : challenge.type === 'Quiz' ? (
          <div className="flex-1 overflow-y-auto"><QuizView title={challenge.title} questions={challenge.quizQuestions || []} onComplete={handleQuizComplete} /></div>
        ) : (
          // Standard Coding Interface
          <div className="flex-1 flex overflow-hidden">

            {/* LEFT PANEL: Problem Statement */}
            <div className="w-[30%] min-w-[300px] flex flex-col border-r border-white/5 bg-[#1e1e1e]">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#161616]">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-gray-200">Problem Description</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReadInstructions}
                  className={`h-8 px-2 transition-colors ${isPlayingAudio ? 'text-primary bg-primary/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  title={isPlayingAudio ? "Stop Reading" : "Read Aloud"}
                >
                  {isPlayingAudio ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                  <span className="text-xs font-semibold">{isPlayingAudio ? 'Stop' : 'Listen'}</span>
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                  <ReactMarkdown>
                    {challenge.description || "No description provided."}
                  </ReactMarkdown>

                  {challenge.instructions && (
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <h3 className="text-white font-bold mb-4 font-display">Instructions</h3>
                      <ReactMarkdown>{challenge.instructions}</ReactMarkdown>
                    </div>
                  )}

                  {challenge.testCases && challenge.testCases.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <h3 className="text-white font-bold mb-4 font-display">Example Output</h3>
                      {challenge.testCases.slice(0, 2).map((tc: any, i: number) => (
                        <div key={i} className="mb-4 bg-[#252526] p-4 rounded-xl border border-white/5 font-mono text-sm leading-relaxed">
                          <p className="text-gray-400 mb-1">Input:</p>
                          <div className="text-green-300 mb-3">{tc.input || "No Input Parameters"}</div>
                          <p className="text-gray-400 mb-1">Expected Output:</p>
                          <div className="text-white">{tc.expectedOutput}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* AI Tutor Panel */}
                  <div className="mt-10 pt-6 border-t border-blue-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-blue-400 font-bold font-display flex items-center gap-2">
                        <Bot className="h-5 w-5" /> AI Tutor Guide
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleAITutorSpeak}
                        className={`h-8 px-3 transition-colors ${isAITutorSpeaking ? 'text-blue-400 bg-blue-500/10 border border-blue-500/30' : 'text-gray-400 hover:text-blue-300 hover:bg-blue-500/10'}`}
                      >
                        {isAITutorSpeaking ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                        <span className="text-xs font-semibold">{isAITutorSpeaking ? 'Listening...' : 'Hear Tutor'}</span>
                      </Button>
                    </div>
                    <div className="bg-[#101928] border border-blue-500/20 p-5 rounded-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
                      <p className="text-gray-300 text-sm mb-3">Hi there! Based on the problem <strong>{challenge.title}</strong>, here is how you should think about your logic building:</p>
                      <ul className="space-y-2 text-sm text-blue-200/80 list-disc pl-4">
                        <li>Break down the input arrays and edge cases.</li>
                        <li>Initialize your core variables in the editor (the visualizer will pick them up in real-time).</li>
                        <li>Consider complexity: often O(n) is achievable using the right data structures.</li>
                        <li>Trace the flow of your logic step-by-step.</li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* CENTER PANEL: Visualization Area */}
            <div className="flex-1 min-w-[300px] flex flex-col border-r border-white/5 bg-[#0a0a0b]">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#161616]">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-semibold text-gray-200">Real-Time Visualizer</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] text-green-500 uppercase font-bold tracking-wider">Sync Active</span>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto relative flex flex-col w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]">
                {isExecuting ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-6"
                  >
                    <div className="relative w-32 h-32">
                      {/* Animated Rings */}
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-4 border-t-cq-green border-r-cq-cyan border-b-cq-purple border-l-transparent rounded-full opacity-70" />
                      <motion.div animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-4 border-4 border-l-cq-gold border-r-transparent border-t-transparent border-b-transparent rounded-full" />
                      <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white">COMPILING</div>
                    </div>
                    <p className="font-mono text-cq-cyan animate-pulse">Analyzing Nodes...</p>
                  </motion.div>
                ) : (
                  <div className="flex flex-col w-full h-full">
                    {/* Execution Result Banner (Compact) */}
                    {executionResult && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className={`mb-4 p-4 rounded-xl border shrink-0 flex items-center justify-between shadow-lg ${executionResult.status.id === 3 ? 'bg-cq-green/10 border-cq-green/30' : 'bg-red-500/10 border-red-500/30'}`}
                      >
                        <div className="flex items-center gap-4">
                          {executionResult.status.id === 3 ? <CheckCircle2 className="w-8 h-8 text-cq-green" /> : <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold border border-red-500/50 text-xl">!</div>}
                          <div>
                            <p className={`text-base font-bold ${executionResult.status.id === 3 ? 'text-cq-green' : 'text-red-500'}`}>
                              {executionResult.status.id === 3 ? 'Operation Successful' : 'Exception Thrown'}
                            </p>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">
                              Time: {executionResult.time}s | Mem: {executionResult.memory}KB
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Main Content Area */}
                    <div className="flex-1 w-full">
                      {parsedVariables.length > 0 ? (
                        <div className="w-full grid grid-cols-1 gap-4 auto-rows-max pb-10">
                          <AnimatePresence>
                            {parsedVariables.map((v, idx) => (
                              <motion.div
                                key={v.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="bg-[#1c1c1e] border border-white/10 rounded-xl p-4 shadow-xl relative overflow-hidden group"
                              >
                                <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                                  <div className="font-mono text-sm text-purple-400 font-bold flex items-center gap-2">
                                    <Sparkles className="w-3 h-3" />
                                    {v.name}
                                  </div>
                                  <span className="text-[10px] uppercase font-bold text-gray-500 bg-white/5 px-2 py-0.5 rounded">{v.type}</span>
                                </div>

                                {/* Render based on type */}
                                {v.type === 'array' ? (
                                  <div className="flex flex-wrap gap-2">
                                    {v.value.replace(/[\[\]]/g, '').split(',').map((item, i) => (
                                      item.trim() && (
                                        <div key={i} className="bg-blue-500/20 border border-blue-500/40 text-blue-200 px-3 py-1.5 rounded-lg font-mono text-sm shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                                          {item.trim()}
                                        </div>
                                      )
                                    ))}
                                  </div>
                                ) : v.type === 'node' ? (
                                  <div className="flex items-center justify-center gap-2">
                                    <div className="w-12 h-12 rounded-full border-2 border-cq-green bg-cq-green/20 flex items-center justify-center font-mono text-cq-green font-bold shadow-[0_0_15px_rgba(0,255,136,0.3)]">
                                      {v.value.match(/\((.*?)\)/)?.[1] || 'N'}
                                    </div>
                                    <div className="h-0.5 w-8 bg-cq-green/50"></div>
                                    <div className="w-10 h-10 rounded-full border border-dashed border-gray-600 flex items-center justify-center text-xs text-gray-500 font-mono">null</div>
                                  </div>
                                ) : (
                                  <div className="font-mono text-lg text-white break-all">
                                    {v.value}
                                  </div>
                                )}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/10 rounded-xl transition-colors pointer-events-none"></div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      ) : challenge.testCases && challenge.testCases.length > 0 ? (
                        <div className="w-full flex flex-col items-center justify-center h-full p-6 text-center">
                          <div className="mb-6 w-32 h-32 relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-purple-500/10 rounded-full animate-pulse blur-xl"></div>
                            <Cpu className="w-16 h-16 text-purple-400 opacity-80" />
                          </div>
                          <h3 className="text-xl font-display text-white mb-2">Initial Execution State</h3>
                          <p className="text-gray-400 text-sm mb-6 max-w-sm">
                            The visualizer is ready. Write your code to map variables, or test the logic against the initial algorithm parameters below:
                          </p>

                          <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-4 w-full max-w-md shadow-xl text-left">
                            <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider mb-2 block">Visual Data Context</span>
                            <div className="font-mono text-sm text-green-300 break-all mb-3 pb-3 border-b border-white/5">
                              <span className="text-gray-500 text-xs">Test Input Variables:</span><br />
                              {challenge.testCases[0].input || "No initial parameters"}
                            </div>
                            <div className="font-mono text-sm text-white break-all">
                              <span className="text-gray-500 text-xs">Target Expected Output:</span><br />
                              {challenge.testCases[0].expectedOutput}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full opacity-30 mt-20 pb-10">
                          <Cpu className="w-16 h-16 mb-4" />
                          <p className="text-sm font-mono tracking-wider">AWAITING VARIABLE DECLARATIONS</p>
                          <p className="text-xs text-gray-500 mt-2">Start typing code (e.g. `arr = [1, 2, 3]`) to visually trace memory.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT PANEL: Editor & Terminal Container */}
            <div className="w-[40%] min-w-[400px] flex flex-col bg-[#0f1011]">

              {/* Editor Top Section */}
              <div className="flex-1 min-h-0 relative">
                <CodeEditor
                  onCodeChange={setCode}
                  onRun={handleRunCode}
                  onSubmit={handleSubmitCode}
                  initialCode={code}
                  language={'python'}
                  isRunning={isExecuting}
                />
              </div>

              {/* Terminal Bottom Section */}
              <div className="h-[300px] shrink-0 z-10">
                <Terminal
                  result={executionResult}
                  isExecuting={isExecuting}
                />
              </div>

            </div>

          </div>
        )}
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center p-8 rounded-2xl border border-white/10 bg-[#161616] shadow-[0_0_50px_rgba(0,255,136,0.1)] max-w-md">
              <Trophy className="w-24 h-24 mx-auto mb-6 text-cq-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
              <h2 className="font-display text-3xl font-bold text-white mb-2">
                Challenge Conquered!
              </h2>
              <p className="text-gray-400 mb-8 font-mono">
                +{earnedXP} Mastery XP Acquired
              </p>
              <Link to={backUrl}>
                <Button variant="success" className="w-full text-lg py-6 font-bold bg-[#00ff88] text-[#0f172a] hover:bg-[#00cc6a] transition-all hover:scale-105 active:scale-95">
                  Return to Path
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChallengePage;

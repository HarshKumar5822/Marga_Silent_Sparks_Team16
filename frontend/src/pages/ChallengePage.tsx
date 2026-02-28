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
            <div className="w-[40%] lg:w-[45%] min-w-[350px] flex flex-col border-r border-white/10 bg-[#1e1e1e]">
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



                </div>
              </div>
            </div>

            {/* RIGHT PANEL: Editor & Terminal Container */}
            <div className="flex-1 min-w-[400px] flex flex-col bg-[#0f1011]">

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

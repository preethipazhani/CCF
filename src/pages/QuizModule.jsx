import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { useAuth } from '../context/AuthContext';
import { HelpCircle, Clock, ChevronRight, ChevronLeft, CheckCircle2, XCircle, Trophy, RefreshCw, Zap, Shield, AlertCircle } from 'lucide-react';

export const QuizModule = ({ setActiveTab }) => {
  const { recordQuizResult } = useAuth();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: optionIndex }
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Timer: 5 minutes (300 seconds)
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (timerActive && !isSubmitted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmitQuiz();
    }
    return () => clearInterval(interval);
  }, [timerActive, isSubmitted, timeLeft]);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleOptionSelect = (optionIdx) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIdx
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    // XP: 20 per correct answer + 50 bonus for score >= 80%
    let xpEarned = correctCount * 20;
    if (scorePercent >= 80) xpEarned += 50;

    return { correctCount, scorePercent, xpEarned };
  };

  const handleSubmitQuiz = () => {
    setTimerActive(false);
    setIsSubmitted(true);
    const { scorePercent, correctCount, xpEarned } = calculateScore();
    recordQuizResult(scorePercent, correctCount, totalQuestions, xpEarned);
  };

  const handleRetake = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setTimeLeft(300);
    setTimerActive(true);
  };

  // Format mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const { correctCount, scorePercent, xpEarned } = calculateScore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Quiz HUD Header Bar */}
      <div className="glass-card rounded-3xl p-6 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>CYBER THREAT ASSESSMENT QUIZ</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-mono">
            {isSubmitted ? 'QUIZ RESULTS EVALUATION' : `QUESTION ${currentQuestionIndex + 1} OF ${totalQuestions}`}
          </h1>
        </div>

        {!isSubmitted ? (
          <div className="flex items-center space-x-4">
            {/* Live Countdown Timer */}
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-mono text-sm font-bold border ${
              timeLeft < 60 
                ? 'bg-red-950/60 border-red-500/50 text-red-400 animate-pulse' 
                : 'bg-cyber-card border-cyan-500/30 text-cyan-300'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            {/* Answered Counter */}
            <div className="bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono text-xs px-3 py-2 rounded-xl">
              Answered: {Object.keys(userAnswers).length}/{totalQuestions}
            </div>
          </div>
        ) : (
          <button
            onClick={handleRetake}
            className="flex items-center space-x-2 bg-cyber-card hover:bg-white/10 border border-cyan-500/30 text-cyan-300 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>RETAKE ASSESSMENT</span>
          </button>
        )}
      </div>

      {/* QUIZ TAKING VIEW */}
      {!isSubmitted ? (
        <div className="space-y-6">
          
          {/* Question Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/30 space-y-6">
            
            <div className="flex items-center justify-between text-xs font-mono text-gray-400 border-b border-cyan-500/20 pb-3">
              <span className="text-cyan-400 font-bold uppercase tracking-wider">
                CATEGORY: {currentQ.category}
              </span>
              <span>Question ID #{currentQ.id}</span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {currentQ.question}
            </h2>

            {/* Multiple Choice Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((optionText, optionIdx) => {
                const isSelected = userAnswers[currentQ.id] === optionIdx;

                return (
                  <button
                    key={optionIdx}
                    onClick={() => handleOptionSelect(optionIdx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start space-x-3 ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-600/30 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                        : 'bg-[#060b1e] border-cyan-500/15 text-gray-300 hover:border-cyan-500/40 hover:bg-white/5'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? 'bg-cyan-400 text-black border-cyan-300'
                        : 'bg-black/40 text-gray-400 border-cyan-500/20'
                    }`}>
                      {String.fromCharCode(65 + optionIdx)}
                    </span>
                    <span className="text-sm font-sans leading-relaxed pt-0.5">
                      {optionText}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Controls Bar: Prev, Question Palette, Next/Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-cyber-card border border-cyan-500/20 text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed font-mono text-xs font-bold flex items-center justify-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREVIOUS</span>
            </button>

            {/* Quick Navigation Numbers */}
            <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full py-1">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const isAnswered = userAnswers[q.id] !== undefined;
                const isCurrent = currentQuestionIndex === idx;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-8 h-8 rounded-lg font-mono text-xs font-bold flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-cyan-400 text-black ring-2 ring-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.5)]'
                        : isAnswered
                        ? 'bg-purple-900/60 text-purple-200 border border-purple-500/40'
                        : 'bg-cyber-card text-gray-500 border border-cyan-500/10'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Next / Submit Button */}
            {currentQuestionIndex === totalQuestions - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                className="w-full sm:w-auto neon-glow-btn px-6 py-3 rounded-xl font-bold text-white text-xs font-mono tracking-wider shadow-lg flex items-center justify-center space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span>SUBMIT FINAL QUIZ</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto neon-glow-btn px-6 py-3 rounded-xl font-bold text-white text-xs font-mono tracking-wider shadow-lg flex items-center justify-center space-x-2"
              >
                <span>NEXT QUESTION</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

          </div>

        </div>
      ) : (
        /* QUIZ SCORE SUMMARY & DETAILED ANSWER REVIEW VIEW */
        <div className="space-y-8">
          
          {/* Score Banner Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-cyan-500/40 text-center relative overflow-hidden bg-gradient-to-tr from-cyan-950/30 via-cyber-card to-purple-950/30">
            <div className="inline-flex p-4 rounded-3xl bg-cyan-500/20 border border-cyan-400/40 mb-4 text-cyan-300">
              <Trophy className="w-12 h-12 text-yellow-400 animate-bounce" />
            </div>

            <h2 className="text-3xl font-extrabold text-white font-mono">
              ASSESSMENT COMPLETED!
            </h2>
            <p className="text-gray-300 text-sm mt-1">
              Your security protocol knowledge has been evaluated.
            </p>

            {/* Big Score Breakdown */}
            <div className="my-6 inline-flex flex-col sm:flex-row items-center justify-center gap-6 bg-[#060b1e] px-8 py-6 rounded-3xl border border-cyan-500/30">
              <div className="text-center">
                <div className="text-xs font-mono text-gray-400 uppercase">Final Score</div>
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 font-mono">
                  {scorePercent}%
                </div>
              </div>
              <div className="hidden sm:block h-10 w-[1px] bg-cyan-500/20" />
              <div className="text-center">
                <div className="text-xs font-mono text-gray-400 uppercase">Correct Answers</div>
                <div className="text-4xl font-black text-white font-mono">
                  {correctCount} / {totalQuestions}
                </div>
              </div>
              <div className="hidden sm:block h-10 w-[1px] bg-cyan-500/20" />
              <div className="text-center">
                <div className="text-xs font-mono text-gray-400 uppercase">XP Awarded</div>
                <div className="text-4xl font-black text-yellow-400 font-mono flex items-center justify-center space-x-1">
                  <Zap className="w-7 h-7 fill-yellow-400" />
                  <span>+{xpEarned}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="neon-glow-btn px-6 py-3 rounded-xl font-bold text-white text-xs font-mono"
              >
                RETURN TO DASHBOARD
              </button>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className="px-6 py-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:text-white font-bold text-xs font-mono"
              >
                VIEW LEADERBOARD RANKINGS
              </button>
            </div>
          </div>

          {/* Detailed Question Explanations List */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white font-mono flex items-center space-x-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span>QUESTION BREAKDOWN & DETAILED EXPLANATIONS</span>
            </h3>

            {QUIZ_QUESTIONS.map((q, idx) => {
              const selectedOpt = userAnswers[q.id];
              const isCorrect = selectedOpt === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`glass-card rounded-2xl p-6 border ${
                    isCorrect ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-red-500/30 bg-red-950/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                      )}
                      <span className="font-mono text-xs font-bold text-white">
                        Question #{idx + 1} ({q.category})
                      </span>
                    </div>

                    <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${
                      isCorrect ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}>
                      {isCorrect ? '+20 XP Correct' : '0 XP Missed'}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-4">
                    {q.question}
                  </h4>

                  {/* Options status */}
                  <div className="space-y-2 mb-4">
                    {q.options.map((optText, oIdx) => {
                      const isThisCorrect = oIdx === q.correctAnswer;
                      const isThisSelected = selectedOpt === oIdx;

                      return (
                        <div
                          key={oIdx}
                          className={`p-3 rounded-xl text-xs font-sans flex items-center justify-between border ${
                            isThisCorrect
                              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200 font-bold'
                              : isThisSelected && !isThisCorrect
                              ? 'bg-red-950/60 border-red-500/50 text-red-200 font-bold'
                              : 'bg-black/30 border-cyan-500/10 text-gray-400'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                            <span>{optText}</span>
                          </div>
                          {isThisCorrect && <span className="text-[10px] font-mono bg-emerald-500/30 px-2 py-0.5 rounded">CORRECT ANSWER</span>}
                          {isThisSelected && !isThisCorrect && <span className="text-[10px] font-mono bg-red-500/30 px-2 py-0.5 rounded">YOUR SELECTION</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Cyber Explanation Callout */}
                  <div className="bg-[#050917] p-4 rounded-xl border border-cyan-500/20 text-xs text-gray-300 leading-relaxed font-mono">
                    <span className="text-cyan-400 font-bold">CYBER INSIGHT: </span>
                    {q.explanation}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};

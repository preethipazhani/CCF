import React, { useState } from 'react';
import { LESSONS_DATA } from '../data/lessonsData';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, CheckCircle2, Shield, Zap, AlertTriangle, BookOpen, Award, CheckSquare, Square } from 'lucide-react';

export const LessonDetail = ({ lessonId, setActiveTab }) => {
  const { user, completeLesson, showToast } = useAuth();
  
  // Find lesson or default to first
  const lesson = LESSONS_DATA.find(l => l.id === lessonId) || LESSONS_DATA[0];
  const isCompleted = user.completedLessons.includes(lesson.id);

  const [checkedItems, setCheckedItems] = useState({});
  const [answers, setAnswers] = useState({}); // { [questionId]: optionIdx }
  const [submittedQuestions, setSubmittedQuestions] = useState(false);
  const [questionScore, setQuestionScore] = useState(0);

  const toggleCheck = (idx) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleMarkComplete = () => {
    completeLesson(lesson.id, 50, lesson.badgeReward);
  };

  const questions = lesson.questions || [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('lessons')}
          className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 bg-cyber-card px-4 py-2 rounded-xl border border-cyan-500/20 hover:border-cyan-400 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO LESSONS</span>
        </button>

        {isCompleted && (
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-4 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4" />
            <span>LESSON MASTERED</span>
          </div>
        )}
      </div>

      {/* Hero Header Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/30 relative overflow-hidden">
        <div className="flex items-start space-x-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#060b1e] border border-cyan-500/40 flex items-center justify-center text-4xl sm:text-5xl shrink-0">
            {lesson.icon}
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-cyan-500/20 text-cyan-300 text-xs font-mono px-3 py-1 rounded-full border border-cyan-500/30">
                {lesson.category}
              </span>
              <span className="text-xs text-gray-400 font-mono">• {lesson.readTime}</span>
              <span className="text-xs text-purple-300 font-mono font-semibold">• {lesson.difficulty}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lesson.title}
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed">
              {lesson.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Key Takeaways Callout */}
      <div className="bg-gradient-to-r from-purple-950/40 via-cyber-card to-cyber-card rounded-3xl p-6 border-l-4 border-purple-500 border-y border-r border-purple-500/20 space-y-3">
        <h3 className="text-sm font-bold font-mono text-purple-300 uppercase tracking-wider flex items-center space-x-2">
          <Shield className="w-4 h-4 text-purple-400" />
          <span>KEY EXECUTIVE TAKEAWAYS</span>
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
          {lesson.keyTakeaways.map((point, i) => (
            <li key={i} className="flex items-start space-x-2 bg-black/30 p-2.5 rounded-xl border border-purple-500/10">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Overview Section */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/20 space-y-4">
        <h3 className="text-lg font-bold text-white font-mono flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <span>MODULE OVERVIEW</span>
        </h3>
        <p className="text-sm text-gray-300 leading-relaxed font-sans">
          {lesson.overview}
        </p>
      </div>

      {/* Dynamic Formatted Content Sections */}
      <div className="space-y-6">
        {lesson.sections.map((section, idx) => (
          <div key={idx} className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/20 space-y-4">
            <h3 className="text-lg font-bold text-cyan-300 font-mono border-b border-cyan-500/20 pb-3">
              {section.heading}
            </h3>
            <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line font-sans space-y-2">
              {section.content}
            </div>
          </div>
        ))}
      </div>

      {/* Warning Checklist */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-yellow-500/30 space-y-4 bg-yellow-950/10">
        <div className="flex items-center space-x-3 text-yellow-400">
          <AlertTriangle className="w-6 h-6 shrink-0" />
          <div>
            <h3 className="text-base font-bold font-mono">THREAT VERIFICATION CHECKLIST</h3>
            <p className="text-xs text-gray-300">Run through these safety checks before proceeding:</p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {lesson.warningChecklist.map((checkText, idx) => {
            const isChecked = checkedItems[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleCheck(idx)}
                className={`flex items-start space-x-3 p-3 rounded-2xl border transition-colors cursor-pointer ${
                  isChecked
                    ? 'bg-yellow-500/15 border-yellow-500/50 text-white'
                    : 'bg-[#050917] border-cyan-500/10 text-gray-300 hover:border-yellow-500/30'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                )}
                <span className="text-xs leading-relaxed font-mono">{checkText}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Knowledge Check Section */}
      {questions.length > 0 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 space-y-6">
          <div className="flex items-center space-x-3 text-purple-400 border-b border-purple-500/20 pb-3">
            <BookOpen className="w-6 h-6" />
            <div>
              <h3 className="text-base font-bold font-mono text-white">CHAPTER KNOWLEDGE CHECK</h3>
              <p className="text-xs text-gray-400">Answer these questions to demonstrate your understanding of the chapter.</p>
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((q, qIdx) => {
              const selectedOpt = answers[q.id];
              const isCorrect = selectedOpt === q.correctAnswer;
              
              return (
                <div key={q.id} className={`p-5 rounded-2xl border ${
                  submittedQuestions
                    ? isCorrect
                      ? 'bg-emerald-950/15 border-emerald-500/30'
                      : 'bg-red-950/15 border-red-500/30'
                    : 'bg-[#060b1e] border-cyan-500/10'
                } space-y-3`}>
                  <div className="flex items-start justify-between text-xs font-mono text-gray-400">
                    <span className="text-purple-300 font-bold">Question {qIdx + 1} of {questions.length}</span>
                    {submittedQuestions && (
                      <span className={isCorrect ? 'text-emerald-400' : 'text-red-400'}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white">{q.question}</h4>
                  
                  <div className="grid grid-cols-1 gap-2.5 pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedOpt === oIdx;
                      const isThisCorrect = oIdx === q.correctAnswer;
                      
                      let btnStyle = "bg-black/30 border-cyan-500/10 text-gray-300 hover:border-cyan-500/30";
                      if (submittedQuestions) {
                        if (isThisCorrect) {
                          btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold";
                        } else if (isSelected && !isThisCorrect) {
                          btnStyle = "bg-red-500/20 border-red-500 text-red-200 font-bold";
                        } else {
                          btnStyle = "bg-black/40 border-slate-800 text-slate-500 opacity-60";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-purple-500/20 border-purple-500 text-purple-300 font-bold";
                      }
                      
                      return (
                        <button
                          key={oIdx}
                          type="button"
                          disabled={submittedQuestions}
                          onClick={() => setAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs font-sans transition-all flex items-start space-x-2 ${btnStyle}`}
                        >
                          <span className={`w-5 h-5 rounded-md font-mono font-bold flex items-center justify-center shrink-0 border ${
                            isSelected ? 'bg-purple-500 text-black border-purple-400' : 'bg-black/50 text-gray-500 border-cyan-500/10'
                          }`}>
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="pt-0.5">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                  
                  {submittedQuestions && (
                    <div className="mt-2 p-3 bg-black/40 rounded-xl border border-cyan-500/10 text-[11px] font-mono text-gray-300 leading-relaxed">
                      <span className="text-cyan-400 font-bold">Explanation: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!submittedQuestions ? (
            <button
              type="button"
              onClick={() => {
                const answeredCount = Object.keys(answers).length;
                if (answeredCount < questions.length) {
                  showToast("Please answer all questions before submitting.", "info");
                  return;
                }
                let correct = 0;
                questions.forEach(q => {
                  if (answers[q.id] === q.correctAnswer) correct++;
                });
                setQuestionScore(correct);
                setSubmittedQuestions(true);
                showToast(`Knowledge check completed! Score: ${correct}/${questions.length}`, "success");
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm font-mono tracking-wider shadow-lg hover:shadow-purple-500/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>SUBMIT KNOWLEDGE CHECK</span>
            </button>
          ) : (
            <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <div className="text-xs font-mono text-gray-400 uppercase">Knowledge Check Score</div>
                <div className="text-lg font-bold text-white font-mono mt-0.5">
                  You scored <span className="text-purple-300">{questionScore} / {questions.length}</span> ({Math.round((questionScore / questions.length) * 100)}%)
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setSubmittedQuestions(false);
                  setQuestionScore(0);
                }}
                className="px-4 py-2 rounded-xl border border-purple-500/30 text-purple-300 hover:text-white text-xs font-mono font-bold transition-all bg-black/20"
              >
                Retake Questions
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mark As Completed Action Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/40 text-center space-y-4 bg-gradient-to-tr from-cyan-950/30 via-cyber-card to-purple-950/30">
        <h3 className="text-xl font-bold text-white font-mono">
          Ready to Claim Your Security Knowledge?
        </h3>
        <p className="text-xs text-gray-300 max-w-md mx-auto">
          Marking this lesson as completed will record your progress, update your profile stats, and grant +50 XP.
        </p>

        <div className="pt-2">
          {isCompleted ? (
            <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/50 px-8 py-3.5 rounded-2xl text-emerald-400 font-bold font-mono text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>COMPLETED & CLAIMED (+50 XP)</span>
            </div>
          ) : !submittedQuestions ? (
            <div className="p-4 bg-purple-950/10 border border-purple-500/20 rounded-2xl max-w-md mx-auto text-xs text-purple-300 font-mono">
              ⚠️ Complete the Knowledge Check above to unlock lesson completion.
            </div>
          ) : (
            <button
              onClick={handleMarkComplete}
              className="neon-glow-btn px-8 py-4 rounded-2xl font-bold text-white tracking-wider text-sm font-mono flex items-center justify-center space-x-2 mx-auto shadow-xl"
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>MARK AS COMPLETED (+50 XP)</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

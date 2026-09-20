import React, { useState, useEffect, useRef } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import AtmosphericOrb from '../components/common/AtmosphericOrb';
import {
  Mic,
  Send,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Volume2,
  VolumeX
} from 'lucide-react';

// ── Question bank ────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    number: 1,
    category: 'Technical / Architecture',
    difficulty: 'Intermediate',
    prompt:
      'Explain the difference between state and props in React. When would you lift state up versus using context or an external store?',
    hint: 'Think about data ownership. State is owned by the component itself; props flow down from a parent. Lifting state up means moving it to the closest common ancestor.',
    keywords: ['state', 'props', 'lift', 'context', 'store', 'parent', 'immutable', 'react'],
    idealAnswer:
      'Props allow parent components to pass data and callbacks downward (unidirectional flow) and are immutable to the child. State represents reactive data managed internally. State should be lifted to the closest common ancestor when sibling components must sync. When state is consumed across deeply nested trees or app-wide (such as auth status or theme), Context or an external store avoids prop drilling.',
    followUp:
      'How would you prevent unnecessary re-renders in child components that consume data from a frequently updating Context?',
  },
  {
    number: 2,
    category: 'JavaScript Fundamentals',
    difficulty: 'Beginner',
    prompt:
      'Explain what arrow functions are in JavaScript. How do they differ from regular functions?',
    hint: 'Focus on syntax, implicit return, and especially how `this` binding works differently.',
    keywords: ['arrow', 'function', 'this', 'binding', 'lexical', 'syntax', 'return', 'es6'],
    idealAnswer:
      'Arrow functions are a concise ES6 syntax for writing functions using `=>`. They differ from regular functions in three key ways: (1) Shorter syntax and implicit return for single expressions. (2) They do NOT have their own `this` — they inherit `this` lexically from the surrounding scope, making them ideal for callbacks and event handlers inside classes. (3) They cannot be used as constructors.',
    followUp:
      'Can you use an arrow function as an object method? What problem might arise with `this`?',
  },
  {
    number: 3,
    category: 'Backend / Node.js',
    difficulty: 'Intermediate',
    prompt:
      'What is the Node.js event loop and how does it enable non-blocking I/O despite JavaScript being single-threaded?',
    hint: 'Think about the call stack, the task queue, microtasks, and how libuv delegates blocking operations.',
    keywords: ['event loop', 'non-blocking', 'single-threaded', 'callback', 'queue', 'async', 'io'],
    idealAnswer:
      'Node.js runs JavaScript on a single thread but achieves non-blocking I/O through the event loop and libuv. When an async operation (like a file read or HTTP request) is initiated, it is handed off to the OS via libuv. The event loop continuously checks the call stack — when it is empty, it picks callbacks from the task queue (macrotasks) or microtask queue (Promises) and pushes them onto the stack for execution.',
    followUp:
      'What is the difference between the microtask queue and the macrotask queue? Give an example of each.',
  },
];

// ── Local critique engine ────────────────────────────────────────────────────
function evaluateAnswer(question, userAnswer) {
  const lower = userAnswer.toLowerCase();
  const wordCount = userAnswer.trim().split(/\s+/).length;

  if (wordCount < 5) {
    return {
      score: 1,
      correct: 'You started typing — good start!',
      missing: 'Your answer is too short to evaluate meaningfully.',
      improvement: 'Write at least 2–3 sentences covering the core concepts.',
      idealAnswer: question.idealAnswer,
      followUp: question.followUp,
    };
  }

  const matchedKeywords = question.keywords.filter((kw) => lower.includes(kw.toLowerCase()));
  const coverage = matchedKeywords.length / question.keywords.length;
  const rawScore = Math.round(coverage * 9 + 1);
  const score = Math.min(10, Math.max(1, rawScore));

  const positives = question.keywords.filter((kw) => lower.includes(kw.toLowerCase()));
  const missing = question.keywords.filter((kw) => !lower.includes(kw.toLowerCase()));

  const correctMsg =
    positives.length > 0
      ? `Good — your answer touched on: ${positives.slice(0, 4).join(', ')}.`
      : 'You provided a response, but it did not clearly address the key concepts.';

  const missingMsg =
    missing.length > 0
      ? `Your answer did not clearly address: ${missing.slice(0, 4).join(', ')}.`
      : 'No major gaps detected — great coverage!';

  const improvement =
    score >= 8
      ? 'Excellent answer! To reach a 10/10, add a concrete real-world example or use case.'
      : score >= 5
      ? 'Solid foundation. Expand your explanation with a concrete example and cover the missing concepts above.'
      : 'Focus on the key concepts: ' + missing.slice(0, 3).join(', ') + '. Structure your answer with a definition, then an example.';

  return { score, correct: correctMsg, missing: missingMsg, improvement, idealAnswer: question.idealAnswer, followUp: question.followUp };
}

// ── Component ────────────────────────────────────────────────────────────────
export default function InterviewModePage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [scores, setScores] = useState([]);

  // ── Speech Recognition State ──────────────────────────────────────────────
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState(null);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);

  const recognitionRef = useRef(null);
  const shouldListenRef = useRef(false);
  const baseAnswerRef = useRef('');
  const answerRef = useRef('');
  const stopListeningRef = useRef(null);

  // Sync answerRef for event closures
  useEffect(() => {
    answerRef.current = answer;
  }, [answer]);

  // Cleanup on unmount or question change
  useEffect(() => {
    return () => {
      if (stopListeningRef.current) {
        stopListeningRef.current();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [questionIndex]);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError({
        title: 'Speech Recognition Not Supported',
        message: 'Your browser does not support the Web Speech API. Please use Google Chrome or Microsoft Edge.',
      });
      return;
    }

    setSpeechError(null);
    baseAnswerRef.current = answerRef.current.trim();
    shouldListenRef.current = true;
    setIsListening(true);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (_) {}
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = navigator.language || 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setSpeechError(null);
    };

    // Writes spoken words directly into the textarea in real time!
    recognition.onresult = (event) => {
      let sessionTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        sessionTranscript += event.results[i][0].transcript;
      }

      const base = baseAnswerRef.current;
      const combined = base
        ? `${base} ${sessionTranscript.trimStart()}`
        : sessionTranscript;

      setAnswer(combined);
    };

    recognition.onerror = (event) => {
      console.warn('SpeechRecognition error:', event.error);
      if (event.error === 'no-speech') {
        // Normal silence; do not stop
        return;
      }
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setSpeechError({
          title: 'Microphone Permission Blocked',
          message: 'Microphone access was denied. Please click the microphone icon in your browser address bar to allow access.',
        });
        stopListening();
        return;
      }
      if (event.error === 'network') {
        setSpeechError({
          title: 'Speech Recognition Network Error',
          message: "Unable to connect to your browser's speech service. You can type directly or click 'Insert Sample Answer'.",
        });
        stopListening();
        return;
      }
      if (event.error === 'audio-capture') {
        setSpeechError({
          title: 'No Microphone Detected',
          message: 'Please ensure your microphone is plugged in and set as default.',
        });
        stopListening();
        return;
      }
    };

    recognition.onend = () => {
      if (shouldListenRef.current) {
        // Freeze whatever was transcribed so new phrases append cleanly
        baseAnswerRef.current = answerRef.current.trim();
        try {
          recognition.start();
        } catch (_) {
          setIsListening(false);
        }
      } else {
        setIsListening(false);
      }
    };

    try {
      recognition.start();
    } catch (err) {
      console.error('Error starting recognition:', err);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    shouldListenRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    setIsListening(false);
  };
  useEffect(() => {
    stopListeningRef.current = stopListening;
  });

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Text-To-Speech for interviewer question
  const toggleReadQuestion = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }

    if (isSpeakingQuestion) {
      window.speechSynthesis.cancel();
      setIsSpeakingQuestion(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(QUESTIONS[questionIndex].prompt);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeakingQuestion(false);
    utterance.onerror = () => setIsSpeakingQuestion(false);
    setIsSpeakingQuestion(true);
    window.speechSynthesis.speak(utterance);
  };

  // Quick helper to demo or test answer
  const handleInsertSampleAnswer = () => {
    const sample =
      currentQuestion.idealAnswer ||
      'State is internal and mutable data managed by a component, whereas props are immutable inputs passed down from parent components.';
    setAnswer(sample);
  };

  const currentQuestion = QUESTIONS[questionIndex];

  function handleSubmit() {
    if (!answer.trim()) return;
    if (isListening) {
      stopListening();
    }
    if (isSpeakingQuestion && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeakingQuestion(false);
    }
    setLoading(true);
    setFeedback(null);
    setTimeout(() => {
      const result = evaluateAnswer(currentQuestion, answer);
      setFeedback(result);
      setScores((prev) => [...prev, result.score]);
      setLoading(false);
    }, 900);
  }

  function handleNext() {
    stopListening();
    if (isSpeakingQuestion && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeakingQuestion(false);
    }
    if (questionIndex + 1 >= QUESTIONS.length) {
      setCompleted(true);
    } else {
      setQuestionIndex((i) => i + 1);
      setAnswer('');
      setFeedback(null);
      setShowHint(false);
      setSpeechError(null);
    }
  }

  function handleRestart() {
    stopListening();
    if (isSpeakingQuestion && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeakingQuestion(false);
    }
    setQuestionIndex(0);
    setAnswer('');
    setFeedback(null);
    setShowHint(false);
    setCompleted(false);
    setScores([]);
    setSpeechError(null);
  }

  const avgScore =
    scores.length > 0
      ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
      : null;

  // ── Completion Screen ────────────────────────────────────────────────────
  if (completed) {
    return (
      <div className="relative max-w-4xl mx-auto py-6 space-y-8">
        <AtmosphericOrb variant="sky" size="xl" className="-top-20 -left-20 opacity-30" />
        <AtmosphericOrb variant="mint" size="lg" className="bottom-1/3 -right-20 opacity-25" />
        <Card className="p-8 text-center space-y-6">
          <div className="text-5xl">🎉</div>
          <h1 className="font-serif text-display-md text-ink">Interview Complete!</h1>
          <p className="text-body text-[16px] max-w-md mx-auto">
            You answered all {QUESTIONS.length} questions.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {scores.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-muted text-[12px]">Q{i + 1}</span>
                <Badge variant={s >= 7 ? 'mint' : s >= 4 ? 'neutral' : 'peach'}>
                  {s} / 10
                </Badge>
              </div>
            ))}
          </div>
          <p className="text-[20px] font-semibold text-ink">
            Average Score: {avgScore} / 10
          </p>
          <Button variant="primary" icon={RotateCcw} onClick={handleRestart}>
            Practice Again
          </Button>
        </Card>
      </div>
    );
  }

  // ── Main Interview UI ────────────────────────────────────────────────────
  return (
    <div className="relative max-w-4xl mx-auto py-6 space-y-8">
      <AtmosphericOrb variant="sky" size="xl" className="-top-20 -left-20 opacity-30" />
      <AtmosphericOrb variant="lavender" size="lg" className="bottom-1/3 -right-20 opacity-25" />

      {/* Header */}
      <div className="text-center">
        <Badge variant="neutral" className="mb-3">
          AI MOCK INTERVIEW MODE
        </Badge>
        <h1 className="font-serif text-display-lg text-ink mb-2">
          Technical Mock Interview
        </h1>
        <p className="text-[16px] text-body max-w-xl mx-auto">
          Interactive questioning tailored to your target role with instant mentor-level critique.
        </p>
      </div>

      {/* Question Card */}
      <Card className="p-4 sm:p-7 md:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-4">
          <div className="flex items-center gap-2">
            <span className="text-caption-upper text-muted font-semibold">
              QUESTION 0{currentQuestion.number} OF 0{QUESTIONS.length}
            </span>
            <span className="text-hairline-strong">•</span>
            <span className="text-[13px] text-muted">{currentQuestion.category}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleReadQuestion}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
                isSpeakingQuestion
                  ? 'bg-ink text-white border-ink animate-pulse shadow-sm'
                  : 'bg-surface-card hover:bg-surface-strong text-muted hover:text-ink border-hairline'
              }`}
              title="Read question out loud using voice synthesis"
            >
              {isSpeakingQuestion ? (
                <VolumeX className="w-3.5 h-3.5 text-white" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
              <span>{isSpeakingQuestion ? 'Stop Audio' : 'Listen to Question'}</span>
            </button>
            <Badge variant="mint">{currentQuestion.difficulty}</Badge>
          </div>
        </div>

        <h2 className="font-serif text-[20px] sm:text-display-sm text-ink leading-relaxed">
          "{currentQuestion.prompt}"
        </h2>

        {showHint && (
          <div className="p-3 rounded-xl bg-[#fef9c3] border border-[#fde047] text-[13px] text-[#713f12]">
            <span className="font-semibold block mb-1">💡 Hint</span>
            {currentQuestion.hint}
          </div>
        )}
      </Card>

      {/* Answer Input */}
      <Card className="p-4 sm:p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-[14px] font-medium text-ink">
              Your Answer
            </label>
            {isListening && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[11px] font-semibold tracking-wide uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                Listening… Speak now
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleListening}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-2 shadow-sm ${
                isListening
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-sm animate-pulse'
                  : 'bg-surface-strong hover:bg-hairline text-ink border border-hairline'
              }`}
              title={isListening ? 'Click to finish speaking' : 'Speak your answer using microphone'}
            >
              {isListening ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  <span>Finish Speaking</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5 text-red-500" />
                  <span>Speak Answer</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Speech Error Banner */}
        {speechError && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[13px] text-amber-900 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-amber-950">{speechError.title}</span>
                <p className="text-amber-800 text-[12px] mt-0.5 leading-normal">{speechError.message}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSpeechError(null)}
              className="text-amber-600 hover:text-amber-900 font-bold text-[14px] px-1"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        )}

        <textarea
          rows={6}
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            baseAnswerRef.current = e.target.value.trim();
          }}
          placeholder="Speak or type your full technical explanation here..."
          className="w-full bg-canvas text-ink p-4 rounded-xl border border-hairline-strong text-[15px] leading-relaxed focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink resize-none transition-all"
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="ghost"
              size="sm"
              icon={HelpCircle}
              onClick={() => setShowHint((v) => !v)}
            >
              {showHint ? 'Hide Hint' : 'Request Hint'}
            </Button>
            <button
              type="button"
              onClick={handleInsertSampleAnswer}
              className="text-[13px] text-muted hover:text-ink underline underline-offset-2 transition-colors font-medium"
              title="Fill with sample answer to test evaluation instantly"
            >
              Insert Sample Answer
            </button>
          </div>
          <Button
            variant="primary"
            icon={Send}
            onClick={handleSubmit}
            disabled={loading || !answer.trim()}
            className="w-full sm:w-auto shadow-sm"
          >
            {loading ? 'Evaluating…' : 'Submit for AI Critique'}
          </Button>
        </div>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card className="p-6 text-center space-y-3 border-2 border-hairline-strong">
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 bg-ink rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <p className="text-[14px] text-muted">AI mentor is reviewing your answer…</p>
        </Card>
      )}

      {/* AI Critique & Evaluation */}
      {feedback && !loading && (
        <Card className="p-4 sm:p-7 md:p-8 space-y-6 border-2 border-hairline-strong bg-canvas-soft">
          <div className="flex items-center justify-between border-b border-hairline pb-4">
            <h3 className="font-sans text-title-md text-ink flex items-center gap-2">
              <span>Mentor Feedback</span>
            </h3>
            <Badge variant={feedback.score >= 7 ? 'mint' : feedback.score >= 4 ? 'neutral' : 'peach'}>
              Score: {feedback.score} / 10
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-surface-card border border-hairline space-y-2">
              <span className="text-caption-upper text-semantic-success flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> What Was Correct
              </span>
              <p className="text-[14px] text-body leading-relaxed">{feedback.correct}</p>
            </div>

            <div className="p-4 rounded-xl bg-surface-card border border-hairline space-y-2">
              <span className="text-caption-upper text-[#854d0e] flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> What Was Missing
              </span>
              <p className="text-[14px] text-body leading-relaxed">{feedback.missing}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-card border border-hairline space-y-2">
            <span className="text-caption-upper text-ink block">How to Improve</span>
            <p className="text-[14px] text-body leading-relaxed">{feedback.improvement}</p>
          </div>

          <div className="p-5 rounded-xl bg-surface-card border border-hairline space-y-2">
            <span className="text-caption-upper text-ink block">
              Suggested Ideal Answer
            </span>
            <p className="text-[14px] text-ink leading-relaxed font-normal">
              {feedback.idealAnswer}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f0f6fc] border border-[#a8c8e8] space-y-1.5">
            <span className="text-caption-upper text-[#0c4a6e] block">
              Dynamic Follow-Up Question
            </span>
            <p className="text-[14px] text-ink font-medium">"{feedback.followUp}"</p>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="primary" icon={ArrowRight} iconPosition="right" onClick={handleNext}>
              {questionIndex + 1 >= QUESTIONS.length ? 'View Results' : 'Next Question'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}


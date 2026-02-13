import { useState } from 'react';
import { dedicationContent } from '../../content/dedicationContent';
import { Button } from '../ui/button';
import { CelebrationAnimation } from '../quiz/CelebrationAnimation';

type QuizState = 'question' | 'results';

export function QuizSection() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>('question');

  const questions = dedicationContent.quiz.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    const isCorrect = answer === currentQuestion.correctAnswer;
    const newAnswers = [...selectedAnswers, answer];
    setSelectedAnswers(newAnswers);

    if (isCorrect) {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        if (isLastQuestion) {
          setQuizState('results');
          // Show celebration again for results
          setTimeout(() => setShowCelebration(true), 100);
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      }, 2000);
    } else {
      if (isLastQuestion) {
        setTimeout(() => {
          setQuizState('results');
        }, 500);
      } else {
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }, 500);
      }
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setQuizState('question');
    setShowCelebration(false);
  };

  if (quizState === 'results') {
    const score = calculateScore();
    const resultMessage = dedicationContent.quiz.results[score as keyof typeof dedicationContent.quiz.results];

    return (
      <section
        id="quiz"
        className="relative py-20 bg-gradient-to-b from-background to-muted/30"
      >
        <CelebrationAnimation show={showCelebration} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-8">
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
                Quiz Results
              </h2>
              
              <div className="relative bg-card rounded-3xl p-12 shadow-lg border border-border">
                <div className="space-y-6">
                  <div className="text-6xl font-bold text-primary">
                    {score} / {questions.length}
                  </div>
                  <p className="text-2xl font-serif text-foreground">
                    {resultMessage}
                  </p>
                  <Button
                    onClick={resetQuiz}
                    size="lg"
                    className="mt-8"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="quiz"
      className="relative py-20 bg-gradient-to-b from-background to-muted/30"
    >
      <CelebrationAnimation show={showCelebration} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {dedicationContent.quiz.heading}
            </h2>
            <p className="text-foreground/60">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>

          <div className="relative bg-card rounded-3xl p-8 sm:p-12 shadow-lg border border-border">
            <h3 className="text-2xl sm:text-3xl font-serif text-foreground mb-8 text-center">
              {currentQuestion.question}
            </h3>

            <div className="grid gap-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  variant="outline"
                  size="lg"
                  className="h-auto py-6 text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

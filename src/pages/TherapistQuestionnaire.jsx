import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, ChevronRight, ChevronLeft, Save, AlertCircle, Star } from 'lucide-react';

const TherapistQuestionnaire = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Load questions on component mount
  useEffect(() => {
    loadQuestions();
  }, []);

  // Update progress when answers change
  useEffect(() => {
    const answeredQuestions = Object.keys(answers).length;
    const totalQuestions = questions.length;
    setProgress(totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0);
  }, [answers, questions]);

  const getAccessToken = () => {
    // Get access token from localStorage or wherever it's stored
    return localStorage.getItem('accessToken');
  };

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/api/questionnaire/QuestionMaking/therapist_questions/', {
        method: 'GET',
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${token}`,
        // },
      });

      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions || []);
      } else if (response.status === 401) {
        setErrors({ general: 'لطفاً وارد حساب کاربری خود شوید' });
      } else {
        setErrors({ general: 'خطا در بارگذاری سوالات' });
      }
    } catch (error) {
      setErrors({ general: 'خطا در اتصال به سرور' });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Clear error for this question
    if (errors[questionId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const handleMultiSelectChange = (questionId, option, isChecked) => {
    setAnswers(prev => {
      const currentAnswers = prev[questionId] ? prev[questionId].split(',') : [];
      let newAnswers;
      
      if (isChecked) {
        newAnswers = [...currentAnswers, option];
      } else {
        newAnswers = currentAnswers.filter(answer => answer !== option);
      }
      
      return {
        ...prev,
        [questionId]: newAnswers.join(',')
      };
    });
  };

  const validateCurrentQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return true;

    if (currentQuestion.is_required && !answers[currentQuestion.id]) {
      setErrors({ [currentQuestion.id]: 'این سوال الزامی است' });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentQuestion()) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setErrors({});
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    // Validate all required questions
    const newErrors = {};
    questions.forEach(question => {
      if (question.is_required && !answers[question.id]) {
        newErrors[question.id] = 'این سوال الزامی است';
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Go to first unanswered required question
      const firstErrorQuestion = questions.find(q => newErrors[q.id]);
      if (firstErrorQuestion) {
        const errorIndex = questions.findIndex(q => q.id === firstErrorQuestion.id);
        setCurrentQuestionIndex(errorIndex);
      }
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('accessToken');
      console.log('Access Token:', token);
      const submissionData = Object.entries(answers).map(([questionId, answerText]) => ({
        question_id: parseInt(questionId),
        answer_text: answerText
      }));

      const response = await fetch('http://localhost:8000/api/questionnaire/QuestionMaking/submit_therapist_answers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        alert('پرسشنامه با موفقیت ارسال شد');
        // Reset form or redirect
        navigate('/dashboard');

        setAnswers({});
        setCurrentQuestionIndex(0);
      } else if (response.status === 401) {
        setErrors({ general: 'لطفاً وارد حساب کاربری خود شوید' });
      } else {
        const data = await response.json();
        setErrors({ general: data.message || 'خطا در ارسال پرسشنامه' });
      }
    } catch (error) {
      setErrors({ general: 'خطا در اتصال به سرور' });
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestion = (question) => {
    const { id, text, question_type, options, is_required, description } = question;
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[400px] flex flex-col">
        {/* Question Header */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {text}
            {is_required && <span className="text-red-500 mr-1">*</span>}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 mb-4">{description}</p>
          )}
        </div>

        {/* Question Input Based on Type */}
        <div className="flex-1">
          {question_type === 'text' && (
            <div>
              <textarea
                value={answers[id] || ''}
                onChange={(e) => handleAnswerChange(id, e.target.value)}
                placeholder="پاسخ خود را وارد کنید..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none min-h-[150px]"
              />
            </div>
          )}

          {question_type === 'select' && (
            <div className="space-y-3">
              {options?.map((option, index) => (
                <label key={index} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name={`question_${id}`}
                    value={option}
                    checked={answers[id] === option}
                    onChange={(e) => handleAnswerChange(id, e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center flex-1">
                    {answers[id] === option ? (
                      <CheckCircle className="w-5 h-5 text-teal-500 ml-3" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 ml-3" />
                    )}
                    <span className="text-gray-700">{option}</span>
                  </div>
                </label>
              ))}
            </div>
          )}

          {question_type === 'multi' && (
            <div className="space-y-3">
              {options?.map((option, index) => {
                const isChecked = answers[id] ? answers[id].split(',').includes(option) : false;
                return (
                  <label key={index} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => handleMultiSelectChange(id, option, e.target.checked)}
                      className="sr-only"
                    />
                    <div className="flex items-center flex-1">
                      {isChecked ? (
                        <CheckCircle className="w-5 h-5 text-teal-500 ml-3" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 ml-3" />
                      )}
                      <span className="text-gray-700">{option}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          )}

          {question_type === 'scale' && (
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-6">
                <span className="text-sm text-gray-600">ضعیف</span>
                <span className="text-sm text-gray-600">عالی</span>
              </div>
              <div className="flex justify-center items-center space-x-4 space-x-reverse">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleAnswerChange(id, rating.toString())}
                    className="flex flex-col items-center p-3 transition-all duration-200 hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        answers[id] && parseInt(answers[id]) >= rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                    <span className="text-sm text-gray-600 mt-2">{rating}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {errors[id] && (
          <div className="flex items-center mt-4 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 ml-1" />
            {errors[id]}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری سوالات...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">هیچ سوالی یافت نشد</p>
          {errors.general && (
            <div className="mt-4 text-red-600">{errors.general}</div>
          )}
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent mb-2">
            مُشاوِریتو
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            پرسشنامه روانشناس
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">پیشرفت</span>
            <span className="text-sm font-medium text-gray-700">
              {currentQuestionIndex + 1} از {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-600 text-center">
            {Object.keys(answers).length} سوال پاسخ داده شده
          </div>
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 ml-2" />
              <p className="text-red-600">{errors.general}</p>
            </div>
          </div>
        )}

        {/* Current Question */}
        {currentQuestion && renderQuestion(currentQuestion)}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5 ml-2" />
            قبلی
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save className="w-5 h-5 ml-2" />
                  ارسال پرسشنامه
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              بعدی
              <ChevronLeft className="w-5 h-5 mr-2" />
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            {isLastQuestion ? 'آماده ارسال پرسشنامه هستید' : 'پاسخ خود را انتخاب کنید و روی بعدی کلیک کنید'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TherapistQuestionnaire;
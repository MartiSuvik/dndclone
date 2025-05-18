// Type definitions for the Quiz components

export interface QuizImage {
  id: string;
  title: string;
  url: string;
  room: string;
  style: string;
}

export interface QuizResults {
  mainStyle: string;
  subStyles: string[];
  recommendedImages: QuizImage[];
}

export interface QuizData {
  selectedImages: QuizImage[];
  selectedRooms: string[];
  priorityRoom: string;
  name: string;
  email: string;
  results: QuizResults;
}

export interface StepProps {
  quizData: QuizData;
  updateQuizData: (data: Partial<QuizData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  availableImages?: QuizImage[];
}
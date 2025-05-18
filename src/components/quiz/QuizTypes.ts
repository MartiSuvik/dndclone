// Type definitions for the Quiz components

export interface QuizImage {
  id: string;
  title: string;
  url: string;
  room: string;
  style: string;
  description?: string; // Optional description field for better result generation
}

export interface QuizResults {
  mainStyle: string;
  title?: string;       // AI-generated title from make.com
  description?: string; // AI-generated description from make.com
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
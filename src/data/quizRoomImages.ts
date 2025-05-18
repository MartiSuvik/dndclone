import { QuizImage } from '../components/quiz/QuizTypes';
import bedroomData from './quiz/bedroom.json';
import diningData from './quiz/dining.json';
import livingData from './quiz/living.json';
import kitchenData from './quiz/kitchen.json';
import { v4 as uuidv4 } from 'uuid';

interface RoomJsonData {
  title: string;
  description: string;
  link: string;
}

// Convert JSON data to QuizImage format
const convertToQuizImage = (data: RoomJsonData[], room: string): QuizImage[] => {
  return data.map(item => ({
    id: uuidv4(),  // Generate unique ID for each image
    title: item.title,
    url: item.link,
    description: item.description, // Add description field
    room: room,
    style: determineStyle(item.description) // Try to determine style from description
  }));
};

// Simple function to determine style from description
// This can be enhanced later with more advanced pattern matching
const determineStyle = (description: string): string => {
  description = description.toLowerCase();
  
  if (description.includes('modern') || description.includes('contemporary')) return 'Modern';
  if (description.includes('traditional') || description.includes('classic')) return 'Traditional';
  if (description.includes('minimal') || description.includes('minimalist')) return 'Minimalist';
  if (description.includes('industrial')) return 'Industrial';
  if (description.includes('rustic') || description.includes('farmhouse')) return 'Rustic';
  if (description.includes('scandinavian')) return 'Scandinavian';
  if (description.includes('bohemian') || description.includes('boho')) return 'Bohemian';
  
  return 'Eclectic'; // Default style if none matched
};

// Export images for each room type
export const bedroomImages: QuizImage[] = convertToQuizImage(bedroomData, 'Bedroom');
export const diningImages: QuizImage[] = convertToQuizImage(diningData, 'Dining');
export const livingImages: QuizImage[] = convertToQuizImage(livingData, 'Living');
export const kitchenImages: QuizImage[] = convertToQuizImage(kitchenData, 'Kitchen');

// Combine all images into one array
export const allRoomImages: QuizImage[] = [
  ...bedroomImages,
  ...diningImages,
  ...livingImages,
  ...kitchenImages
];

/**
 * Safely parse timestamp to Date object with fallback
 * Handles invalid dates, null/undefined values, and various formats
 */
export const safeParseDate = (timestamp: any): Date => {
  // Handle null/undefined
  if (timestamp === null || timestamp === undefined) {
    return new Date();
  }

  // Handle empty string
  if (typeof timestamp === 'string' && timestamp.trim() === '') {
    return new Date();
  }

  // Handle Date object
  if (timestamp instanceof Date) {
    return isNaN(timestamp.getTime()) ? new Date() : timestamp;
  }

  // Try to parse the timestamp
  try {
    const parsed = new Date(timestamp);
    
    // Validate the parsed date
    if (isNaN(parsed.getTime())) {
      console.warn('Invalid timestamp detected:', timestamp);
      return new Date();
    }
    
    return parsed;
  } catch (error) {
    console.error('Error parsing timestamp:', timestamp, error);
    return new Date();
  }
};

/**
 * Format date for display with fallback
 */
export const formatDateSafe = (
  timestamp: any,
  formatFn: (date: Date) => string
): string => {
  const date = safeParseDate(timestamp);
  try {
    return formatFn(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

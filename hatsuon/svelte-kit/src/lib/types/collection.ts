/**
 * Collection
 */
type Collection = {
  title: string;
  description?: string;
  phrases: string[];
  created_date?: number;
  created_by?: string;
  id?: string;
  uuid?: string;
};

/**
 * Phrase
 */
type Phrase = {
  title: string; // maxLength = 150?
  description?: string;
  /**
   * original recording file id
   */
  recording?: string;
  takes?: string[];
  /**
   * collection's id
   */
  collection?: string;
  created_date?: number;
  created_by?: string;
  id?: string;
  uuid?: string;
};

/**
 * Take
 */
type Take = {
  title: string;
  description?: string;
  file: string;
  date: number;
  id: string;
};

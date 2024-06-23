/**
 * Collection
 */
type Collection = {
  title: string;
  description?: string;
  phrases: Phrase[];
  created_date?: number;
  created_by?: string;
  id?: string;
  uuid?: string;
};

/**
 * Phrase
 */
type Phrase = {
  title: string;
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
  recording?: string;
  point: number;
  phrase: string;
  created_date?: number;
  created_by?: string;
  id?: string;
  uuid?: string;
};

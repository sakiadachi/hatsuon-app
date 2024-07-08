/**
 * Mapped Collection Type
 * https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
 **/
type MappedCollection<Type> = {
  [Property in keyof Type]?: Type[Property];
};

/**
 * Common Type in API Response
 */
type CommonModelType = {
  created_date: number;
  created_by: string;
  id: number;
  uuid: string;
};

/**
 * Collection
 * For Reading in CRUD
 */
type Collection = {
  title: string;
  description: string;
  phrases: Phrase[];
} & CommonModelType;
/**
 * Collection
 * For Creating, Updating in CRUD
 */
type EditCollectionType = MappedCollection<Collection>;

/**
 * Phrase
 * For Reading in CRUD
 */
type Phrase = {
  title: string;
  description: string;
  /**
   * original recording file id
   */
  recording: string | null;
  takes?: string[];
  /**
   * collection's id
   */
  collection: number;
} & CommonModelType;
/**
 * Phrase
 * For Creating, Updating in CRUD
 */
type EditPhraseType = MappedCollection<Phrase>;

/**
 * Take
 */
type Take = {
  title: string;
  recording?: string;
  point: number;
  phrase: string;
} & CommonModelType;
/**
 * Take
 * For Creating, Updating in CRUD
 */
type EditTakeType = MappedCollection<Take>;

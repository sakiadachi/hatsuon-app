const today_milliseconds = Date.now();

const takes: Take[] = Array(10)
  .fill(0)
  .map((i) => ({
    title: `Take-${i}`,
    description: `Take-${i}\'s description. Take-${i}\'s description. Take-${i}\'s description.`,
    file: `Take-${i}\'s file id`,
    date: today_milliseconds,
    id: `take-${i}-id`,
  }));

export const phrases: Phrase[] = Array(10)
  .fill(0)
  .map((i) => ({
    title: `Phrase-${i}`,
    description: `Phrase-${i}\'s description. Phrase-${i}\'s description. Phrase-${i}\'s description.`,
    recording: `Phrase-recording-${i}`,
    takes: [takes[i].id, takes[i + 1].id, takes[i + 2].id],
    date: today_milliseconds,
    id: `phrase-${i}-id`,
  }));

export const collections: Collection[] = Array(10)
  .fill(0)
  .map((_, i) => ({
    title: `Collection-${i}`,
    description: `Collection-${i}\'s description. Collection-${i}\'s description. Collection-${i}\'s description.`,
    phrases: [phrases[i].id],
    date: today_milliseconds,
    id: `collection-${i}-id`,
  }));

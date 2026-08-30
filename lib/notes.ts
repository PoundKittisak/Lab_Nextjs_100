export interface AggregatorNote {
  id: string;
  itemId: string;
  itemTitle: string;
  note: string;
  createdAt: string;
}

const notes: AggregatorNote[] = [];

export function addAggregatorNote(data: Omit<AggregatorNote, 'id' | 'createdAt'>): AggregatorNote {
  const item: AggregatorNote = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  };

  notes.push(item);
  return item;
}

export function getAggregatorNotes(): AggregatorNote[] {
  return notes;
}

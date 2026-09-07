export type RelationType = 'parent' | 'tribal';

export type GenealogyNode = {
  id: string;
  name: string;
  subtitle?: string;
  locked: boolean;
  primary?: boolean;
  terminal?: boolean;
  category?: 'ancestor' | 'tribe' | 'branch' | 'family' | 'person';
  relationType?: RelationType;
  relationLabel?: string;
  badge?: string;
  generation?: number;
  fatherName?: string;
  notes?: string;
  children: GenealogyNode[];
};

export type ReferenceItem = {
  id: string;
  title: string;
  author: string;
  deathYear?: string;
  field: string;
  category: 'genealogy' | 'history' | 'hadith' | 'linguistics' | 'modern';
  usage: string;
  citation?: string;
  digitalLink?: string;
  methodologyNotes?: string;
};

export type HistorySection = {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  content: string[];
  referenceId?: string;
  quote?: {
    text: string;
    source: string;
  };
  hadithInfo?: {
    narrator?: string;
    book: string;
    grade: string;
    scholarVerdict?: string;
    text: string;
  };
  poem?: {
    verses: { first: string; second: string }[];
    poet?: string;
    context: string;
    source: string;
  };
};

export type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  type: 'tree' | 'history' | 'reference';
  targetPath: string;
  nodeId?: string;
};

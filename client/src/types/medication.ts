export type Medication = {
  _id: string;
  name: string;
  dose: string;
  notes?: string;
  reason?: string;
  ongoing?: boolean;
  frequency?: string;
  customFrequency?: string;
  vetVisitId?: string;
  startDate?: string;
  endDate?: string;
  dogId: string;
};

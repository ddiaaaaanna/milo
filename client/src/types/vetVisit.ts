export type VetVisit = {
  _id: string;
  reason: string;
  visitType: string;
  date: string;
  notes?: string;
  diagnosis?: string;
  treatment?: string;
  vetName?: string;
  dogId: string;
};

export interface AppealItem {
    id: string;
  taxYear: string;
  company: string;
  state: string;
  assessor: string;
  accountNumber: string;
  appealDeadLine: string;
  status: string;
  appealedDate: string;
  appealedBy: string;
}

export interface AppealState {
  items: AppealItem[];
}

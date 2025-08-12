export interface Appeal {
  id: string;
  taxYear: string;
  company: string;
  state: string;
  assessor: string;
  accountNumber: string;
  appealDeadLine: string;
  status: string |'Sent'| 'Not Sent';
  appealedDate: string;
  appealedBy: string;
}

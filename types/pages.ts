export interface Page {
  id: string;
  pageName: string;
  closed: boolean;
  children: Page[];
}

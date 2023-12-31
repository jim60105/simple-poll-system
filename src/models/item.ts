export interface IItem {
  id: string;
  type: string;
  title: string;
  options: string[];
  result: {
    type: string;
    chartType: string;
  };
}

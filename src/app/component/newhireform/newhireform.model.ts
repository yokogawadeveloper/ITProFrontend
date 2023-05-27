export interface FormData {
    DepartmentId: number;
    IsExpenditure: string;
    TotalBudget: number;
    UtilizedBudget: number;
    Remarks: string;
    inlineitem: InlineItem[];
  }
  
  export interface InlineItem {
    name: string;
    category:number;
    item:number;
    quantity:number;
  }
  
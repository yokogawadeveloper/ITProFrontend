import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';




interface InlineItem {
  category: number;
  item: number;
  costCenter: number;
  quantity: number;
}

// main component class
@Component({
  selector: 'app-replacementform',
  templateUrl: './replacementform.component.html',
  styleUrls: ['./replacementform.component.scss'],
})
export class ReplacementformComponent implements OnInit {


  name!: string;
  department!: number;
  isExpenditure!: string;
  totalBudget!: number;
  utilizedBudget!: number;
  remarks!: string;
  upload: any;
  purchaseDate: Date = new Date();
  age!:number;
  //for form data with inline item
  formData: any = {
    Name : '',
    DepartmentId: null,
    IsExpenditure: '',
    TotalBudget: null,
    UtilizedBudget: null,
    Remarks: '',
    inlineitem: []
  };
  inlineItem: InlineItem = {
    category: 0,
    item: 0,
    costCenter: 0,
    quantity: 0
  };


  addInlineItem(): void {
    const newItem = { ...this.inlineItem };
    this.formData.inlineitem.push(newItem);
    this.inlineItem = { category: 0, item: 0, costCenter: 0, quantity: 0 };
  }


  deleteInlineItem(index: number): void {
    this.formData.inlineitem.splice(index, 1);
  }


  //other variables
  rows: any = []
  departmentDropdown: any = [];
  costCenterdropdown: any = [];
  categoryDropdown: any = [];
  itemDropdown: any = [];


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.rows = [{
      category: '',
      item: '',
      costCenter : '',
      quantity: '',      
    }];

    //for dropdown
    this.apiService.getDepartmentDropdownData().subscribe((res: any) => {
      this.departmentDropdown = res;
    }
    );

    this.apiService.getCostCenterDropdownData().subscribe((res: any) => {
      this.costCenterdropdown = res;
    }
    );

    this.apiService.getCategoryDropdownData().subscribe((res: any) => {
      this.categoryDropdown = res;
    }
    );

    this.apiService.getItemDropdownData().subscribe((res: any) => {
      this.itemDropdown = res;
    }
    );


  }

  addRow() {
    this.rows.push({
      category: '',
      item: '',
      costCenter : '',
      quantity: '',
    });
  }

  deleteRow(index: any) {
    if (this.rows.length == 1) {
      alert("Atleast one row should be there")
    }
    else {
      this.rows.splice(index, 1)
    }
  }


  submit(): void {
    this.formData.Name = this.name;
    this.formData.DepartmentId = this.department;
    this.formData.IsExpenditure = this.isExpenditure;
    this.formData.TotalBudget = this.totalBudget;
    this.formData.UtilizedBudget = this.utilizedBudget;
    this.formData.Remarks = this.remarks;
    this.formData.inlineitem = this.rows.map((row: any) => {
      return {
        category : row.category,
        item : row.item,
        costcenter : row.costCenter,
        quantity : row.quantity
      }
    });

    this.apiService.postProcurementData(this.formData).subscribe((res: any) => {
      console.log(res);
    }
    );
    console.log(this.formData);
  }

}



///
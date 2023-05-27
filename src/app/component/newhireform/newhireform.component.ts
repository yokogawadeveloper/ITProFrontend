import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
// import { FormData, InlineItem } from './newhireform.model';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';


interface InlineItem {
  name: string;
  category: number;
  item: number;
  quantity: number;
}

@Component({
  selector: 'app-newhireform',
  templateUrl: './newhireform.component.html',
  styleUrls: ['./newhireform.component.scss'],
})
export class NewhireformComponent implements OnInit {

  department!: number;
  isExpenditure!: string;
  totalBudget!: number;
  utilizedBudget!: number;
  remarks!: string;
  upload: any;
  formData: any = {
    DepartmentId: null,
    IsExpenditure: '',
    TotalBudget: null,
    UtilizedBudget: null,
    Remarks: '',
    inlineitem: []
  };
  inlineItem: InlineItem = {
    name: '',
    category: 1,
    item: 1,
    quantity: 0
  };



  addInlineItem(): void {
    const newItem = { ...this.inlineItem };
    this.formData.inlineitem.push(newItem);
    this.inlineItem = { name: '', category: 0, item: 0, quantity: 0 };
  }


  deleteInlineItem(index: number): void {
    this.formData.inlineitem.splice(index, 1);
  }


  // department!: string;
  // isExpenditure: boolean = false;
  // totalBudget!: number;
  // utilizedBudget!: number;
  // upload: any;
  // remarks!: string;
  rows: any = []
  //for dropdown
  departmentDropdown: any = [];
  costCenterdropdown: any = [];
  categoryDropdown: any = [];
  itemDropdown: any = [];
  //for dropdown
  selectedUserType: string | undefined;

  // main constructor
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.rows = [{
      name: '',
      category: '',
      item: '',
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
      name: '',
      category: '',
      item: '',
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
    this.formData.DepartmentId = this.department;
    this.formData.IsExpenditure = this.isExpenditure;
    this.formData.TotalBudget = this.totalBudget;
    this.formData.UtilizedBudget = this.utilizedBudget;
    this.formData.Remarks = this.remarks;
    this.formData.inlineitem = this.rows.map((row: any) => {
      return {
        name: row.name,
        category: row.category,
        item: row.item,
        quantity: row.quantity
      }
    });

    this.apiService.postProcurementData(this.formData).subscribe((res: any) => {
      console.log(res);
    }
    );
  }







}
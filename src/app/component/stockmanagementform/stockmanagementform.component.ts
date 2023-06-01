import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgToastService } from 'ng-angular-popup';


// Interface for inline item
interface InlineItem {
  category: number;
  item: number;
  costCenter: number;
  quantity: number;
}

@Component({
  selector: 'app-stockmanagementform',
  templateUrl: './stockmanagementform.component.html',
  styleUrls: ['./stockmanagementform.component.scss'],
})
export class StockmanagementformComponent  implements OnInit {
  name!: string;
  department!: number;
  remarks!: string;
  attachment!: FileList;
  //for form data with inline item
  formData: any = {
    Name : '',
    DepartmentId: null,
    Remarks: '',
    Attachment: null,
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


  constructor(private apiService: ApiService,private toast: NgToastService) { }

  ngOnInit(): void {
    this.rows = [{
      category: '',
      item: '',
      costCenter : '',
      quantity: 1,      
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
      quantity: 1,
    });
  }

  deleteRow(index: any) {
    if (this.rows.length == 1) {
      this.toast.error({
        detail: 'Atleast one row should be there',
        position: 'bottom-right',
        duration: 3000,
        type: 'danger'
      })
    }
    else {
      this.rows.splice(index, 1)
    }
  }

  submit(): void {
    this.formData.Name = this.name;
    this.formData.DepartmentId = this.department;
    this.formData.Remarks = this.remarks;
    this.formData.Attachment = this.attachment;
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

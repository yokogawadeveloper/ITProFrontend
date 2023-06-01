import { Component, OnInit ,Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgToastService } from 'ng-angular-popup';

// inline item interface
interface InlineItem {
  category: number;
  item: number;
  costCenter: number;
  quantity: number;
}

@Component({
  selector: 'app-temporaryform',
  templateUrl: './temporaryform.component.html',
  styleUrls: ['./temporaryform.component.scss'],
})
export class TemporaryformComponent  implements OnInit {
  name!: string;
  department!: number;
  isExpenditure!: string;
  totalBudget!: number;
  utilizedBudget!: number;
  remarks!: string;
  deviceType!: string;
  attachment!: FileList;

  //for form data with inline item
  formData: any = {
    Name : '',
    DepartmentId: null,
    IsExpenditure: '',
    TotalBudget: null,
    UtilizedBudget: null,
    Remarks: '',
    DeviceType: '',
    Attachment: null,
    inlineitem: []
  };
  inlineItem: InlineItem = {
    category: 0,
    item: 0,
    costCenter: 0,
    quantity: 0
  };
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
    if (this.rows.length < 5) {
      this.rows.push({
        category: '',
        item: '',
        costCenter : '',
        quantity: 1,
      });
    }
    else {
      this.toast.error({
        detail: 'Maximum 5 rows are allowed',
        position: 'bottom-right',
        duration: 3000,
        type: 'danger'
      })
    }
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
    this.formData.IsExpenditure = this.isExpenditure;
    this.formData.TotalBudget = this.totalBudget;
    this.formData.UtilizedBudget = this.utilizedBudget;
    this.formData.Remarks = this.remarks;
    this.formData.DeviceType = this.deviceType;
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
    });
  }
}

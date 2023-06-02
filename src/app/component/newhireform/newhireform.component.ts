import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';


// for inline item interface
interface InlineItem {
  category: number;
  item: number;
  costCenter: number;
  quantity: number;
}

@Component({
  selector: 'app-newhireform',
  templateUrl: './newhireform.component.html',
  styleUrls: ['./newhireform.component.scss'],
})

export class NewhireformComponent implements OnInit {
  formSubmitted = false;
  //main form variables
  name!: string;
  department!: number;
  isExpenditure!: string;
  totalBudget!: number;
  utilizedBudget!: number;
  remarks!: string;
  attachment!: FileList;
  //for form data with inline item
  formData: any = {
    Name : '',
    DepartmentId: null,
    IsExpenditure: '',
    TotalBudget: null,
    UtilizedBudget: null,
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

  //other variables for row and dropdown
  rows: any = []
  userProfile: any;
  departmentDropdown: any = [];
  costCenterdropdown: any = [];
  categoryDropdown: any = [];
  itemDropdown: any = [];


  constructor(private apiService: ApiService, private authService: AuthService,private toast: NgToastService) { }

  ngOnInit(): void {
    this.rows = [{category: '',item: '',costCenter : '',quantity: 1,}];

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

  // submit(): void {
  //   this.formData.Name = this.name;
  //   this.formData.DepartmentId = this.department;
  //   this.formData.IsExpenditure = this.isExpenditure;
  //   this.formData.TotalBudget = this.totalBudget;
  //   this.formData.UtilizedBudget = this.utilizedBudget;
  //   this.formData.Remarks = this.remarks;
  //   this.formData.Attachment = this.attachment;
  //   this.formData.inlineitem = this.rows.map((row: any) => {
  //     return {
  //       category : row.category,
  //       item : row.item,
  //       costcenter : row.costCenter,
  //       quantity : row.quantity
  //     }
  //   });

  //   this.apiService.postProcurementData(this.formData).subscribe((res: any) => {
  //     console.log(res);
  //   }
  //   );
  // }

  submitForm(){
  
    this.formSubmitted = true;
    this.formData.Name = this.name;
    this.formData.DepartmentId = this.department;
    this.formData.IsExpenditure = this.isExpenditure;
    this.formData.TotalBudget = this.totalBudget;
    this.formData.UtilizedBudget = this.utilizedBudget;
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
  }


}
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../app/guards/auth.guard';

// New imports


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule,),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'procurement',
    loadChildren: () => import('./pages/procurement/procurement.module').then( m => m.ProcurementPageModule)
  },
  {
    path: 'procurementview',
    loadChildren: () => import('./pages/procurementview/procurementview.module').then( m => m.ProcurementviewPageModule)
  },
  {
    path: 'approvallist',
    loadChildren: () => import('./pages/approvallist/approvallist.module').then( m => m.ApprovallistPageModule)
  },
  {
    path: 'procurementdetails/:id',
    loadChildren: () => import('./pages/procurementdetails/procurementdetails.module').then( m => m.ProcurementdetailsPageModule)
  },
  {
    path: 'approvallistdetails/:id/:sequenceId',
    loadChildren: () => import('./pages/approvallistdetails/approvallistdetails.module').then( m => m.ApprovallistdetailsPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

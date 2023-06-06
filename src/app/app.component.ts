import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface MenuItem {
  title: string;
  link: string;
  icon: string;
  submenuItems: SubmenuItem[];
  submenuOpen: boolean; // Added property
}

interface SubmenuItem {
  title: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    trigger('submenuAnimation', [
      state('expanded', style({
        height: '*',
        visibility: 'visible',
        opacity: 1
      })),
      state('collapsed', style({
        height: '0',
        visibility: 'hidden',
        opacity: 0
      })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out'))
    ])
  ]
})
export class AppComponent {
  public menuItems: MenuItem[] = [
    {
      title: 'Procurement',
      link: '/procurement',
      icon: 'add-circle-outline',
      submenuItems: [
        {
          title: 'Procurement Request',
          link: '/procurement',
          icon: 'analytics-outline',
        },
        {
          title: 'Procurement List',
          link: '/procurementview',
          icon: 'clipboard-outline',
        },
        {
          title: 'Procurement Approval',
          link: '/approvallist',
          icon: 'timer-outline',
        },

      ],
      submenuOpen: false, // Initialize with false
    },
  ];

  public submenuState: Map<string, boolean> = new Map();
  public userDropdownClicked: boolean = false;


  constructor(private router: Router) {}

  //
  logout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  } // logout

  toggleSubmenu(item: MenuItem) {
    item.submenuOpen = !item.submenuOpen;
  }

  isSubmenuOpen(item: MenuItem): boolean {
    return item.submenuOpen;
  }

  toggleUserDropdown() {
    this.userDropdownClicked = !this.userDropdownClicked;
  }


}

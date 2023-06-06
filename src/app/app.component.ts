import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  title: string;
  link: string;
  icon: string;
  submenuItems: SubmenuItem[];
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
})
export class AppComponent {
  public menuItems: MenuItem[] = [
    {
      title: 'Procurement',
      link: '/procurement',
      icon: 'home-outline',
      submenuItems: [
        {
          title: 'Procurement Request',
          link: '/procurement',
          icon: 'analytics-outline',
        },
        {
          title: 'Procurement List',
          link: '/procurementview',
          icon: 'bookmark-outline',
        },
        {
          title: 'Procurement Approval',
          link: '/procurementview',
          icon: 'bookmark-outline',
        },
      ],
    },
    {
      title: 'Menu Item 2',
      link: '/menu-item-2',
      icon: 'settings-outline',
      submenuItems: [
        {
          title: 'Submenu Item 3',
          link: '/submenu-item-3',
          icon: 'mail-outline',
        },
        {
          title: 'Submenu Item 4',
          link: '/submenu-item-4',
          icon: 'person-outline',
        },
      ],
    },
  ];

  public submenuState: Map<string, boolean> = new Map();

  constructor(private router: Router) {}

  //
  logout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  } // logout

  toggleSubmenu(item: MenuItem) {
    const submenuOpen = this.submenuState.get(item.title) || false;
    this.submenuState.set(item.title, !submenuOpen);
  }

  isSubmenuOpen(item: MenuItem): boolean {
    return this.submenuState.get(item.title) || false;
  }

}

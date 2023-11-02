import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isNavbarCollapsed = true;


  constructor(private router: Router) { }

  isParentActive(): boolean {
    return this.router.isActive('/raw-data/training-dashboard', false) || 
           this.router.isActive('/raw-data/batches', false) || 
           this.router.isActive('/raw-data/employees', false);
  }

  ngOnInit(): void {
  }

}

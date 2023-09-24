import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  activeTab = 'home';
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
     this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        let currentRoute = this.router.url;
        const arr = currentRoute.split("/");
        let params = this.route.snapshot.queryParams
        let active = ''
        if(!params?.user && !params?.property)
         active = arr[arr.length - 1]
      else {

        if(arr[arr.length - 1].includes("details")){
            active = arr[arr.length - 2]
        }
      
      else {

        let split = arr[arr.length - 1].split("?")[0]
         active = split
                       console.log(active)
      }
     
      }
       
      if(arr?.length)  this.activeTab = active?.toLowerCase()

      }
    });
   }

  ngOnInit(): void {
  }

}

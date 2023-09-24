import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { UserService } from 'src/service/user.service';
import { forkJoin } from 'rxjs';
import { AuthenticationService } from 'src/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator: MatPaginator;

  displayedColumns: string[] = ['full_name', 'email', 'mobile_number', 'type', 'status'];
  dataSource: MatTableDataSource<any>;

  counts: {totalProperty: number} = { totalProperty:0}
  chartsData: {count: number, label: string, percentage: number, upward: boolean}[] = [
     {
      count: 0,
      label: 'Total Landlords',
      percentage: 0,
      upward: true
     },
     {
      count: 0,
      label: 'Active Landlords',
      percentage: 0,
      upward: false
     },
     {
      count: 0,
      label: 'Pending Landlords',
      percentage: 0,
      upward: true
     },
     {
      count: 0,
      label: 'Rejected Landlords',
      percentage: 0,
      upward: true
     },
     {
      count: 0,
      label: 'Total Tenants',
      percentage: 0,
      upward: false
     },
     {
      count: 0,
      label: 'Active Tenants',
      percentage: 0,
      upward: true
     },
     {
      count: 0,
      label: 'Pending Tenants',
      percentage: 0,
      upward: true
     },
     {
      count: 0,
      label: 'Rejected Tenants',
      percentage: 0,
      upward: false
     },
  ]


  tenantsList: any[] = []
  landlordsList: any[] = []
  propertyList: any[] = []
  allUSers: any[] = []
  userMetrics: {total_users: number, total_landlords: number, active_landlords: number, pending_landlords: number, rejected_landlords: number,
              total_tenants: number, active_tenants: number,pending_tenants: number,rejected_tenants: number} 
  constructor(
    private cdref: ChangeDetectorRef ,
    private router: Router,
    private route: ActivatedRoute,
    private userS: UserService,
    public authS: AuthenticationService
  ) { 
  }

  ngOnInit(): void {
    this.setGraph()
  }

  ngAfterViewInit() {
  
   this.cdref.detectChanges();

 }

 setGraph(){
    forkJoin([ this.userS.fetchTenantList(),  this.userS.fetchLandlordList(),  this.userS.fetchPropertyList(),  this.userS.fetchUserMetrics()])
    .subscribe((r)=>{

     this.landlordsList = r[1].results?.data || []
     this.tenantsList = r[0].results?.data || []
     this.propertyList =  r[2].results?.data||[]
     this.counts.totalProperty = r[2].results?.pagination_meta?.total || 0

     this.userMetrics = r[3].results

      this.chartsData[4] =  {
      count: this.userMetrics.total_tenants,
      label: 'Total Tenants',
      percentage: 100,
      upward: true
     }

     this.chartsData[5] =  {
      count: this.userMetrics.active_tenants,
      label: 'Active Tenants',
      percentage:  (this.userMetrics.active_tenants/this.userMetrics.total_tenants) * 100,
      upward: false
     }

      this.chartsData[6] =  {
      count: this.userMetrics.pending_tenants,
      label: 'Pending Tenants',
      percentage:  (this.userMetrics.pending_tenants/this.userMetrics.total_tenants) * 100,
      upward: false
     }

     this.chartsData[7] =  {
      count: this.userMetrics.rejected_tenants,
      label: 'Rejected Tenants',
      percentage:  (this.userMetrics.rejected_tenants/this.userMetrics.total_tenants) * 100,
      upward: false
     }

      

      this.chartsData[0] =  {
      count: this.userMetrics.total_landlords,
      label: 'Total Landlords',
      percentage: 100,
      upward: true
     }

     this.chartsData[1] =  {
      count: this.userMetrics.active_landlords,
      label: 'Active Landlords',
      percentage:  (this.userMetrics.active_landlords/this.userMetrics.total_landlords) * 100,
      upward: false
     }

      this.chartsData[2] =  {
      count: this.userMetrics.pending_landlords,
      label: 'Pending Landlords',
      percentage:  (this.userMetrics.pending_landlords/this.userMetrics.total_landlords) * 100,
      upward: false
     }

     this.chartsData[3] =  {
      count: this.userMetrics.rejected_landlords,
      label: 'Rejected Landlords',
      percentage:  (this.userMetrics.rejected_landlords/this.userMetrics.total_landlords) * 100,
      upward: false
     }

     this.allUSers = [...this.landlordsList, ...this.tenantsList]
     .map(value=> ({value, sort: Math.random()}))
     .sort((a,b)=>a.sort - b.sort)
     .map(({value})=>value)

     this.dataSource = new MatTableDataSource(this.allUSers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.createFilter();

    })
   
 }

 viewUser(element: any, ){
  const navigationExtras: NavigationExtras = {
     relativeTo: this.route,
    state: {
      user: element,
    },
    queryParams: {user: element.identifier },
   };
   
   this.router.navigate([`./${element.type.toLowerCase()}`],navigationExtras)

 }

 createFilter() {
            let filterFunction = function (data: any, filter: string): boolean {
            let searchTerms = JSON.parse(filter);
            let isFilterSet = false;
            for (const col in searchTerms) {
                if (searchTerms[col].toString() !== '') {
                isFilterSet = true;
                } else {
                delete searchTerms[col];
                }
            }

            let nameSearch = () => {
                let found = false;
                if (isFilterSet) {
                for (const col in searchTerms) {
                    searchTerms[col].trim().toLowerCase().split(' ').forEach((word:any) => {
                    if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                        found = true
                    }
                    });
                }
                return found
                } else {
                return true;
                }
            }
            return nameSearch()
            }
            return filterFunction
        }

  // Called on Filter change
  filterChange(value: string) {
    let filterValues: any = {status: value}
    if(value)
    this.dataSource.filter = JSON.stringify(filterValues)
  else
  this.dataSource.filter = "";
  }  
  
   getStatus(element: any): string{

    if(element.is_active) return 'Active'
    if(element.is_pending) return 'Pending'
    else return 'Rejected'
  } 

}

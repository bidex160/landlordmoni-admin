import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { UserService } from 'src/service/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, merge, startWith, switchMap, map, catchError, of } from 'rxjs';

export interface PeriodicElement {
  id?: string|number;
  landlord: string;
  propertyUse: string;
  propertyStatus: string;
  serviceCharge: string;
  status: string
}

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;

  displayedColumns: string[] = ['landlord', 'propertyUse', 'propertyType', 'availabilityStatus', 'serviceCharge', 'status'];
  dataSource: MatTableDataSource<any>;

  counts: {all: number, rejected: number, active: number, pending:number} = { all: 0, rejected: 0, active: 0, pending: 0}
  propertyList: any[] = []
  activeTab: string = "All"
  loading: boolean = false
  pageNumber: number = 1
  pageSize: number = 10
  form: FormGroup
  filteredAndPagedResults: Observable<any[]>;

  constructor(
    private cdref: ChangeDetectorRef ,
    private router: Router,
    private route: ActivatedRoute,
    private userS: UserService
  ) { }

  ngOnInit(): void {
   this.form = new FormGroup({
      pageNumber: new FormControl(this.pageNumber || 0),
      pageSize: new FormControl(this.pageSize),
    });
  }

 ngAfterViewInit() {
     this.paginator.page.subscribe((r) => {
      this.form.patchValue({ pageNumber: r.pageIndex+1, pageSize: r.pageSize });
    });

   this.filteredAndPagedResults = merge(this.form.valueChanges).pipe(
      startWith({}),
      switchMap(() => {
        return this.userS.fetchPropertyList(
          this.form.value.pageNumber,
          this.form.value.pageSize
        ).pipe(
          map((r)=> {
            return {content: r?.results?.data||[], total: r?.results?.pagination_meta?.total}   }),
          catchError((e) => of({ content: [], total: 0 })));
      }),
      map((data) => {
         this.loading = false
        this.counts.all = data?.total;
        return data.content;
      }),
      catchError((e) => {

       this.loading = false
        return of([]);
      })
    );
   this.cdref.detectChanges()
 }


 viewProperty(element: any, ){
    const navigationExtras: NavigationExtras = {
     relativeTo: this.route,
    state: {
      property: element,
    },
    queryParams: {property: element.property_identifier },
   };
   this.router.navigate([`./details`],
     navigationExtras)

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

  filterChange(value: string) {
    this.activeTab = value
      this.loading = true
    this.filteredAndPagedResults = merge(this.form.valueChanges).pipe(
      startWith({}),
      switchMap(() => {
        return this.userS.fetchPropertyList(
          this.form.value.pageNumber,
          this.form.value.pageSize,
          this.activeTab
        ).pipe(
          map((r)=> {
            return {content: r?.results?.data||[], total: r?.results?.pagination_meta?.total}   }),
          catchError((e) => of({ content: [], total: 0 })));
      }),
      map((data) => {
         this.loading = false
      //  this.counts.all = data?.total;
        return data.content;
      }),
      catchError((e) => {

       this.loading = false
        return of([]);
      })
    );
  } 
  
  getCount(){
    if(this.activeTab == 'Pending') return this.counts.pending
    if(this.activeTab == 'Active') return this.counts.pending
    if(this.activeTab == 'Declined') return this.counts.pending
    else return this.counts.all
  }

   getStatus(element: any): string{

    if(element.property_approved) return 'Active'
    if(element.property_declined) return 'Rejected'
    else return 'Pending'
  }
}

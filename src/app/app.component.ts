import { Component } from '@angular/core';
import { AuthenticationService } from 'src/service/auth.service';
import { AppStorage } from 'src/service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title =''
  sidebarExpanded: boolean = true;

  constructor(
  ){}


}

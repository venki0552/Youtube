import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddVideoDiagComponent } from './add-video-diag/add-video-diag.component';
import { LocalStorageService } from './services/localstorage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  videoList: any[] = [];
  isPrivateMode:boolean = false;
  constructor(public dialog: MatDialog,
    private localStorage: LocalStorageService) {
      this.videoList = this.localStorage.get();
  }

  addVideo(): void {
    const dialogRef = this.dialog.open(AddVideoDiagComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.url && this.localStorage.set(result)) {
        this.videoList = this.localStorage.get();
      }
    });
  }

  tabClick() {
    this.isPrivateMode = !this.isPrivateMode;
  }
}

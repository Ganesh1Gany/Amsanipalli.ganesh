import { ChangeDetectorRef, Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  // snackBarRef = inject(MatSnackBarRef);

  demoConfiguration: any;
  color: string = 'success';

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
    // private snackBarRef1: MatSnackBarRef<SnackBarComponent>,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  close() {
    // this.snackBarRef.dismiss();
  }

}

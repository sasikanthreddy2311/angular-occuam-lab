import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { ProfileService } from 'src/app/services/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput: any;
  constructor(public dialog: MatDialog, private profileService: ProfileService, private _snackBar: MatSnackBar) { }

  enable: boolean = false;
  showEdit: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  displayedImage: any = "../../../assets/profile-icon.png";
  uploadedFile: File = null as any;
  uploadedImageUrl: any = "";
  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.uploadedFile = event.target.files[0];
    console.log(this.uploadedFile)
    this.openDialog();
  }

  upload() {
    this.fileInput.nativeElement.click();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(cropImageDialog, {
      width: '500px',
      data: this.imageChangedEvent,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fileInput.nativeElement.value = '';
      if (result) {
        this.croppedImage = result;
        this.displayedImage = this.croppedImage;
      } else {
        this.croppedImage = '';
      }
    });
  }

  cancelUpload() {
    this.showEdit = !this.showEdit;
  }

  saveUpload() {
    console.log(this.imageChangedEvent)
    this.profileService.uploadImage(this.uploadedFile).subscribe((data: any) => {
      // this.croppedImage = data.image_url;
      // this.displayedImage = data.image_url;
      this.showEdit = !this.showEdit;
      this._snackBar.open("Image uploaded successfully", "Done", {
        duration: 3000
      });
    })
  }

}

@Component({
  selector: 'crop-image-dialog',
  templateUrl: 'crop-image-dialog.html',
})
export class cropImageDialog {
  croppedImageFromDialog: any;
  constructor(
    public dialogRef: MatDialogRef<cropImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageFromDialog = event.base64;
    console.log(event, base64ToFile(this.croppedImageFromDialog));
    // console.log(this.croppedImageFromDialog)
  }

  setCroppedImage() {
    this.dialogRef.close(this.croppedImageFromDialog);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
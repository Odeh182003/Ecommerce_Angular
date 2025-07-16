import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-cutomer-update',
  templateUrl: './cutomer-update.component.html',
  styleUrl: './cutomer-update.component.css'
})
export class CutomerUpdateComponent {
  customerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CutomerUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.customerForm = this.fb.group({
      CustomerName: [data?.CustomerName || '', Validators.required],
      CustomerMobile: [data?.CustomerMobile || '', Validators.required],
      CustomerAddress: [data?.CustomerAddress || '', Validators.required],
    });
  }
  onSave(): void {
    if (this.customerForm.valid) {
      this.dialogRef.close(this.customerForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

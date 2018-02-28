// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { CheckoutDialogComponent } from './checkout-dialog.component';
// import { SharedModule } from '../shared/shared.module';
// import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
// import { MatDialog, MatDialogRef } from '@angular/material';
//
// describe('CheckoutDialogComponent', () => {
//   let component: CheckoutDialogComponent;
//   let fixture: ComponentFixture<CheckoutDialogComponent>;
//   const matDialogRefStub = {};
//
//   beforeEach(
//     async(() => {
//       TestBed.configureTestingModule({
//         imports: [SharedModule],
//         declarations: [CheckoutDialogComponent],
//         providers: [{ provider: MatDialogRef, useValue: matDialogRefStub }]
//       }).overrideModule(BrowserDynamicTestingModule, {
//         set: {
//           entryComponents: [CheckoutDialogComponent]
//         }
//       });
//     })
//   );
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(CheckoutDialogComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

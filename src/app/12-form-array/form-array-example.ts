import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { minSelectedCheckboxes } from './validators';
import { Order, OrderService } from '../11-dynamic-form-controls/order.service';

@Component({
  selector: 'app-form-array-example',
  templateUrl: './form-array-example.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class FormArrayExample {
  formBuilder = inject(FormBuilder);
  orderService = inject(OrderService);

  form = this.formBuilder.group({
    orders: new FormArray<FormControl<boolean | null>>([], minSelectedCheckboxes(1))
  });
  
  orders = this.orderService.loadOrders()
    .pipe(tap(orders => this.#addCheckboxes(orders)));

  get orderControls() {
    return this.form.controls.orders.controls;
  }

  #addCheckboxes(orders: Order[]) {
    orders.map((_, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      this.form.controls.orders.push(control);
    });
  }

  submit(orders: Order[]) {
    const selectedOrderIds = this.form.value.orders?.map((o, i) => o ? orders[i].id : null).filter(v => v !== null);
    console.log('checkbox list orders: ', selectedOrderIds);
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { OrderService, Order } from './order.service';

@Component({
  selector: 'app-dynamic-form-controls-example',
  templateUrl: './dynamic-form-controls-example.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export class DynamicFormControlsExample {
  formBuilder = inject(FormBuilder);
  orderService = inject(OrderService);

  form = this.formBuilder.group({
    selectOrder: [0],
    radioOrder: [0]
  });

  orders = this.orderService.loadOrders().pipe(
    tap(orders => this.initializeFormValues(orders))
  );

  initializeFormValues(orders: Order[]) {
    this.form.patchValue({
      selectOrder: orders[0].id,
      radioOrder: orders[0].id
    });
  }

  submit() {
    console.log('select order: ', this.form.value.selectOrder);
    console.log('radio order: ', this.form.value.radioOrder);
  }
}

import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Order {
  id: number;
  name: string;
}

const fakeData: Order[] = [
  { id: 100, name: 'order 1' },
  { id: 200, name: 'order 2' },
  { id: 300, name: 'order 3' },
  { id: 400, name: 'order 4' }
];

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  loadOrders() {
    // A real HTTP request will use the HTTPClientService, https://angular.io/guide/http for more details
    // Here we use RxJS to simulate an async response
    return of<Order[]>(fakeData).pipe(
      delay(1000)
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  

  constructor(private http: HttpClient) {
  }

  async createPaymentIntent(amount: number): Promise<any> {
    return this.http.post('https://localhost:7207/api/Payment/create-payment-intent', { amount }).toPromise();
  }

  
}

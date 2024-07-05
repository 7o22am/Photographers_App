import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { StripeService } from '../stripe.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
   amount :any;
   id:any;
  constructor(private stripeService: StripeService ,  private toastr: ToastrService,
    private router: Router , private route: ActivatedRoute , private service: UsersService ){}
  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      this.amount = params.get('amount');
      this.id = params.get('id');
      
    });
    this.stripe = await loadStripe('pk_test_51PYyJN2Kx6SzcGxo8DPT3OeP8tBw8lp1QKJq2WeqOf3qS3iQjf5LBnxI8YUpiEUemmv0eqoRgd5QECbTRSYawct300bajEeiNc');
    if (this.stripe) {
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
    }
  }

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
  clientSecret: string | null = null;
 

  async handlePayment(event: Event) {
    event.preventDefault();

    if (!this.card || !this.stripe) {
      return;
    }

    try { 
      const response = await this.stripeService.createPaymentIntent(6666666);
      this.clientSecret = response.clientSecret;

      if (this.clientSecret) {
        const result = await this.stripe.confirmCardPayment(this.clientSecret, {
          payment_method: {
            card: this.card,
          },
        });

        if (result.error) {
          console.error(result.error.message);
        } else if (result.paymentIntent?.status === 'succeeded') {
          console.log('Payment succeeded!');
          this.toastr.success('Payment succeeded!');
           
            this.service.changePayStata(this.id ,"Done").subscribe((res: any) => {
       
              console.log(res);
            });
     

          this.router.navigate(['/profile']);
        }
      }
    } catch (error) {
      this.toastr.success("some thing Wrong");
      console.error(error);
    }
  }


  
}

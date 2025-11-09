import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html'
})
export class PaymentSuccessComponent implements OnInit {
  order: any;
  @ViewChild('confettiCanvas', { static: true }) confettiCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private route: ActivatedRoute, private orderSvc: OrderService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.orderSvc.getOrderById(id || 'ORD-1001').subscribe((o) => (this.order = o));
    this.launchConfetti();
  }

  launchConfetti() {
    const canvas = this.confettiCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 2,
      c: `hsl(${Math.random() * 360}, 70%, 60%)`,
      s: Math.random() * 2 + 2
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach((p) => {
        p.y += p.s;
        if (p.y > canvas.height) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();
  }
}

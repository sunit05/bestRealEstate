import { Component, OnInit, OnDestroy, HostListener, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import panzoom from 'panzoom';

@Component({
  selector: 'app-lodha-lumis',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lodha-lumis.html',   // ✅ matches your HTML file
  styleUrls: ['./lodha-lumis.css']     // ✅ matches your CSS file
})
export class LodhaLumis implements OnInit, OnDestroy {

  @ViewChildren('zoomArea') zoomAreas!: QueryList<ElementRef>;
  
   ngAfterViewInit() {
    this.zoomAreas.forEach(area => {
      panzoom(area.nativeElement, {
        maxZoom: 4,
        minZoom: 1,
        bounds: true,
        boundsPadding: 0.2
      });
    });
  }

  slides = [
    { image: '/images/lodha_lumis/Screenshot_1.jpeg', title: 'Lodha Lumis', subtitle: 'Luxury Redefined' },
    { image: '/images/lodha_lumis/Screenshot_2.jpeg', title: 'Modern Living', subtitle: 'Comfort Meets Elegance' },
    { image: '/images/lodha_lumis/Screenshot_3.jpeg', title: 'Prime Location', subtitle: 'City Convenience' },
    { image: '/images/lodha_lumis/Screenshot_4.jpeg', title: 'Lodha Lumis', subtitle: 'Luxury Redefined' },
    { image: '/images/lodha_lumis/Screenshot_5.jpeg', title: 'Modern Living', subtitle: 'Comfort Meets Elegance' },
  ];
  currentSlide = 0;
  private intervalId: any;
  private touchStartX = 0;
  private touchEndX = 0;

  bhk1= true;
  bhk2 = true;
  bhk3= true;
  bhk4=true;
  
  // Projects
  projects = [
    { name: '2 BHK Apartment', location: 'Mumbai', price: 85000009, image: '/images/lodha_lumis.jpeg' },
    { name: '3 BHK Apartment', location: 'Mumbai', price: 125000009, image: '/images/image2.jpeg' },
    { name: 'Penthouse', location: 'Mumbai', price: 250000000, image: '/images/image3.jpeg' }
  ];

  // Amenities
  // amenities = [
  //   { name: 'Gym', icon: '/images/lodha_lumis/icons/gym.jpg' },
  //   { name: 'Swimming Pool', icon: '/images/lodha_lumis/icons/swimming-pool.jpg' },
  //   { name: 'Clubhouse', icon: '/images/lodha_lumis/icons/clubhouse.jpg' },
  //   { name: '24/7 Security', icon: '/images/lodha_lumis/icons/security.jpeg' },
  //   { name: 'Children\'s Play Area', icon: '/images/lodha_lumis/icons/play.jpg' }
  // ];

  amenities = [
    { name: 'Gym', icon: '/images/lodha_lumis/lodha-lumis-amenities/Lodha_lumis-amenity1.jpg' },
    { name: 'Swimming Pool', icon: '/images/lodha_lumis/lodha-lumis-amenities/Lodha_lumis-amenity2.jpg' },
    { name: 'Clubhouse', icon: '/images/lodha_lumis/lodha-lumis-amenities/Lodha_lumis-amenity3.jpg' },
    { name: '24/7 Security', icon: '/images/lodha_lumis/lodha-lumis-amenities/Lodha_lumis-amenity4.jpg' },
    { name: 'Children\'s Play Area', icon: '/images/lodha_lumis/lodha-lumis-amenities/Lodha_lumis-amenity5.jpg' },
    { name: 'Gym', icon: '/images/lodha_lumis/lodha-lumis-amenities/Lodha_lumis-amenity6.jpg' },
    { name: 'Swimming Pool', icon: '/images/lodha_lumis/lodha-lumis-amenities/Lodha_lumis-amenity7.jpg' },
    { name: 'Clubhouse', icon: '/images/lodha_lumis/lodha-lumis-amenities/Lodha_lumis-amenity8.jpg' },
    { name: '24/7 Security', icon: '/images/lodha_lumis/lodha-lumis-amenities/Lodha_lumis-amenity9.jpg' },
    { name: 'Children\'s Play Area', icon: '/images/lodha_lumis/lodha-lumis-amenities/Lodha_lumis-amenity10.jpg' },
    { name: 'Children\'s Play Area', icon: '/images/lodha_lumis/lodha-lumis-amenities/Lodha_lumis-amenity11.jpg' }
  ];

  // Testimonials
  clients = [
    { name: 'Rahul Sharma', feedback: 'The experience was seamless and professional.' },
    { name: 'Anita Deshmukh', feedback: 'I found my dream home at Lodha Lumis!' }
  ];

  // Call to Action
  cta = {
    title: 'Schedule a Visit Today',
    subtitle: 'Experience luxury living at Lodha Lumis.',
    buttonText: 'Book a Visit',
    buttonLink: '/contact'
  };

  // Lifecycle hooks
  ngOnInit() {
    this.intervalId = setInterval(() => this.nextSlide(), 7000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  // Slider controls
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goTo(index: number) {
    this.currentSlide = index;
  }

  // Touch events for mobile swipe
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    const distance = this.touchEndX - this.touchStartX;
    if (Math.abs(distance) > 50) {
      distance > 0 ? this.prevSlide() : this.nextSlide();
    }
  }

  onMouseMove(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const rect = target.getBoundingClientRect();

  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  target.style.transformOrigin = `${x}% ${y}%`;
}

}

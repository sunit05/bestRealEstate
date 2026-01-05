import { Component, OnInit, OnDestroy, HostListener, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import panzoom from 'panzoom';

@Component({
  selector: 'app-runwal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './runwal.html',   // ✅ matches your HTML file
  styleUrls: ['./runwal.css']     // ✅ matches your CSS file
})
export class Runwal implements OnInit, OnDestroy {


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
    { image: '/images/runwal/runwal-logo.jpg', title: 'Lodha Lumis', subtitle: 'Luxury Redefined' },
    { image: '/images/runwal/runwal-home.jpg', title: 'Modern Living', subtitle: 'Comfort Meets Elegance' },
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
    {name: '2 BHK Apartment', location: 'Mumbai', price: 85000009, image: '/images/lodha_lumis.jpeg' ,
      description:'Perfectly designed 2 BHK homes offering a comfortable living space with modern interiors, ideal for small families and working professionals.'
    },
    { name: '3 BHK Apartment', location: 'Mumbai', price: 125000009, image: '/images/image2.jpeg',
      description:'Spacious 3 BHK residences with smart layouts, premium finishes, and ample natural light, crafted for growing families seeking elegance and comfort.'
     },
    { name: '4 BHK Apartment', location: 'Mumbai', price: 250000000, image: '/images/image3.jpeg',
      description:'Luxurious 4 BHK homes featuring expansive living areas, premium amenities, and refined architecture for those who desire upscale living.'
     }  
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
    { name: 'Gym', icon: '/images/runwal/runwal-amenities/ame-1.jpg' },
    { name: 'Gym', icon: '/images/runwal/runwal-amenities/ame-2.jpg' },
    { name: 'Gym', icon: '/images/runwal/runwal-amenities/ame-3.jpg' },
    { name: 'Gym', icon: '/images/runwal/runwal-amenities/ame-4.jpg' },
    { name: 'Gym', icon: '/images/runwal/runwal-amenities/ame-5.jpg' },
    { name: 'Gym', icon: '/images/runwal/runwal-amenities/ame-6.jpg' },
    { name: 'Gym', icon: '/images/runwal/runwal-amenities/ame-7.jpg' },
    { name: 'Gym', icon: '/images/runwal/runwal-amenities/ame-8.jpg' },
    { name: 'Gym', icon: '/images/runwal/runwal-amenities/ame-9.jpg' },
    { name: 'Gym', icon: '/images/runwal/runwal-amenities/ame-10.jpg' },

  ];

  // Testimonials
  clients = [
    {
    name: 'Vikram Desai',
    feedback: 'Runwal Woods has a strong concept focused on greenery and open spaces, which is very appealing.'
  },
  {
    name: 'Pooja Nair',
    feedback: 'The master plan and proposed lifestyle amenities give a positive impression for future living.'
  },
  {
    name: 'Nitin Malhotra',
    feedback: 'Based on the project vision and developer track record, Runwal Woods looks like a promising residential option.'
  }
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

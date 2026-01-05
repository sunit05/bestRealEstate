import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule  } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // 🔹 Hero Slideshow
  // slides = [
  //   { image: '/images/bl-images/lodhabuilding.webp', title: 'INSPIRED', subtitle: 'by the green environs.' },
  //   { image: '/images/bl-images/bl1.jpg', title: 'DRIVEN', subtitle: 'to bring you serenity.' },
  //   { image: '/images/bl-images/bl2.jpg', title: 'ELEVATED', subtitle: 'to redefine your lifestyle.' },
  //   { image: '/images/bl-images/bl3.jpg', title: 'ELEVATED', subtitle: 'to redefine your lifestyle.' }
  // ];

  constructor(private router: Router) {}

  slides = [
  {
    image: '/images/lodha_lumis/lodha-lumis-home.jpg',
    title: 'Lodha Lumis',
    subtitle: 'Inspired by the green environs.',
    route: '/lodha-lumis'
  },
  {
    image: '/images/manhattan/manhattan_home_screenshot.png',
    title: 'Manhattan',
    subtitle: 'Driven to bring you serenity.',
    route: '/manhattan'
  },
  {
    image: '/images/runwal/runwal-home.jpg',
    title: 'Runwal',
    subtitle: 'A peaceful lifestyle.',
    route: '/runwal'
  }
  ];

  currentSlide = 0;
  private intervalId: any;
  private touchStartX = 0;
  private touchEndX = 0;

  // 🔹 Featured Projects
  featuredProjects = [
    {
      name: 'Lodha Lumis',
      location: 'Mumbai, India',
      image: '/images/lodha_lumis.jpeg',
      route: '/lodha-lumis' 
    },
    {
      name: 'Manhattan',
      location: 'Mumbai, India',
      image: '/images/manhattan/manhattan_home.jpg',
      route: '/manhattan' 
    },
    {
      name: 'Runwal',
      location: 'Mumbai, India',
      image: '/images/runwal/runwal-home.jpg',
      route: '/runwal' 
    }
    // Add more projects as needed
  ];

  // 🔹 Amenities / Facilities
  amenities = [
    { name: 'Modern Gym', icon: '/images/lodha_lumis/icons/gym.jpg' },
    { name: 'Swimming Pool', icon: '/images/lodha_lumis/icons/swimming-pool.jpg' },
    { name: 'Children\'s Park', icon: '/images/lodha_lumis/icons/play.jpg' },
    { name: '24/7 Security', icon: '/images/lodha_lumis/icons/security.jpg' },
    { name: 'Clubhouse', icon: '/images/lodha_lumis/icons/clubhouse.jpg' }
  ];

  // 🔹 Testimonials / Client Feedback
  clients = [
    { name: 'Rahul Sharma', project: 'Lodha Lumis', feedback: 'The team was amazing and helped me find my dream home effortlessly.' },
    { name: 'Anita Deshmukh', project: 'Oberoi Skyline', feedback: 'Professional and reliable – highly recommend BestRealEstate!' },
    { name: 'Vikram Singh', project: 'Brigade Panorama', feedback: 'Excellent support throughout the buying process.' }
  ];

  // 🔹 Call-to-Action / Schedule Visit
  cta = {
    title: 'Schedule a Visit Today',
    subtitle: 'Let us help you find your dream home!',
    buttonText: 'Book a Visit',
    buttonLink: '/contact'
  };

  ngOnInit() {
    // Auto slide every 7 seconds
    this.intervalId = setInterval(() => this.nextSlide(), 7000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  // 🔹 Slideshow controls
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goTo(index: number): void {
    this.currentSlide = index;
  }

  onImgError(ev: Event, path: string): void {
    console.warn('Image failed to load:', path, ev);
  }

  // 🔹 Swipe gesture handling
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    const swipeDistance = this.touchEndX - this.touchStartX;
    if (Math.abs(swipeDistance) > 50) {
      swipeDistance > 0 ? this.prevSlide() : this.nextSlide();
    }
  }

  navigateTo(route: string) {
  this.router.navigate([route]);
  }
}

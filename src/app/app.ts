  import { Component, NgModule } from '@angular/core';
  import { HomeComponent } from './pages/home/home.component';
  import { LodhaLumis } from './pages/lodha-lumis/lodha-lumis';
  import { NgClass } from '@angular/common';
  import { NgFor, NgIf } from '@angular/common';
  import { Router, RouterLink, RouterLinkActive, RouterModule,RouterOutlet } from '@angular/router';
import { Manhattan } from './pages/manhattan/manhattan';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Runwal } from './pages/runwal/runwal';
import { ProjectDataService } from './project-data.service';
import { Amaltis } from './pages/amaltis/amaltis';

interface Project {
  name: string;
  route: string;
  bhk: {
    1: boolean;
    2: boolean;
    3: boolean;
    4: boolean;
  };
}

  // @Component({
  //   selector: 'app-root',
  //   standalone: true,
  //   imports: [NgClass,RouterOutlet,HomeComponent,LodhaLumis,Manhattan,RouterModule],
  //   templateUrl: './app.html',
  //   styleUrls: ['./app.css']
  // })

  @Component({
  selector: 'app-root',
  standalone: true,
  imports: [
  NgClass,
  NgFor,
  NgIf,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  FormsModule,
  HomeComponent,
  LodhaLumis,
  Manhattan,
  Runwal,
  Amaltis
],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})


  export class AppComponent {
    isMenuOpen = false;
    openDropdown: string | null = null;

    projects: Project[] = [
  {
    name: 'Manhattan',
    route: '/manhattan',
    bhk: { 1: true, 2: true, 3: false, 4: false }
  },
  {
    name: 'Runwal',
    route: '/runwal',
    bhk: { 1: true, 2: false, 3: true, 4: true }
  },
  {
    name: 'Lodha Lumis',
    route: '/lodha-lumis',
    bhk: { 1: true, 2: true, 3: true, 4: false }
  },
  {
    name: 'Amaltis',
    route: '/amaltis',
    bhk: { 1: true, 2: true, 3: true, 4: false }
  }
];


    searchQuery: string = '';
    filteredResults: any[] = [];
    suggestions: any[] = [];

     constructor(private router: Router) {}

    currentYear = new Date().getFullYear(); // ✅ dynamic year for footer

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }

    toggleDropdown(name: string) {
      this.openDropdown = this.openDropdown === name ? null : name;
    }

    searchItems = [
    { label: 'Lodha Lumis', route: '/lodha-lumis' },
    { label: 'Manhattan', route: '/manhattan' },
    { label: 'Runwal', route: '/runwal' },
    { label: 'Amaltis', route: '/amaltis' },
    ];

  //   onSearchChange() {
  //   const text = this.searchQuery.toLowerCase().trim();

  //   if (text.length < 1) {
  //     this.filteredResults = [];
  //     return;
  //   }

  //   this.filteredResults = this.searchItems.filter(item =>
  //     item.label.toLowerCase().includes(text)
  //   );
  // }

 onSearchChange() {
  const raw = (this.searchQuery || '').toLowerCase().trim();

  // clear when empty
  if (!raw || raw.length < 1) {
    this.filteredResults = [];
    return;
  }

  // container for results (use Map to avoid duplicates keyed by route)
  const resultsMap = new Map<string, { label: string; route: string }>();

  // 1) SIMPLE TEXT SEARCH on predefined searchItems (if you have them)
  if (Array.isArray(this.searchItems) && this.searchItems.length) {
    this.searchItems.forEach(item => {
      if (item.label && item.label.toLowerCase().includes(raw)) {
        resultsMap.set(item.route, { label: item.label, route: item.route });
      }
    });
  }

  // 2) BHK detection: matches "1", "1bhk", "1 bhk", "2 ", "3bhk", etc.
  //    It captures only the first bhk-like number found (1..4)
  const bhkRegex = /(^|\s)([1-4])\s*(?:bhk)?\b/; 
  const bhkMatch = raw.match(bhkRegex);

  if (bhkMatch) {
    const bhkNumStr = bhkMatch[2];           // "1" | "2" | "3" | "4"
    // safe key cast for TS (your project.bhk keys are "1","2","3","4")
    type BHKKey = keyof typeof this.projects[0]['bhk']; // "1"|"2"|"3"|"4"
    const key = bhkNumStr as unknown as BHKKey;

    // iterate projects (from service or local array)
    (this.projects || []).forEach(project => {
      // safely read the bhk flag (keeps your project.bhk shape unchanged)
      const has = project.bhk[key]; // TS accepts because key typed as union
      if (has) {
        const label = `${bhkNumStr} BHK in ${project.name}`;
        resultsMap.set(project.route, { label, route: project.route });
      }
    });
  }

  // 3) If still no results and the user typed a number only (e.g. "2"), attempt less strict match:
  //    (This is optional — because bhkRegex already matches "2". Keep for safety)
  if (!resultsMap.size) {
    const numOnly = raw.match(/^([1-4])$/);
    if (numOnly) {
      const n = numOnly[1] as unknown as keyof typeof this.projects[0]['bhk'];
      (this.projects || []).forEach(project => {
        if (project.bhk[n]) {
          const label = `${n} BHK in ${project.name}`;
          resultsMap.set(project.route, { label, route: project.route });
        }
      });
    }
  }

  // assign filteredResults from resultsMap (convert to array, preserve insertion order)
  this.filteredResults = Array.from(resultsMap.values());
}

    navigateTo(route: string) {
      this.filteredResults = [];
      this.searchQuery = '';
      this.router.navigate([route]);
    }

    closeMenu() {
    this.isMenuOpen = false;
    this.openDropdown = null;
    }
    
  }

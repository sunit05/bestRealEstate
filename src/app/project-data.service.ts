import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  projects = [
    {
      name: 'Manhattan',
      route: '/manhattan',
      bhk: {
        1: true,
        2: true,
        3: true,
        4: true
      }
    },
    {
      name: 'Lodha Lumis',
      route: '/lodha-lumis',
      bhk: {
        1: true,
        2: false,
        3: true,
        4: false
      }
    },
    {
      name: 'Runwal',
      route: '/runwal',
      bhk: {
        1: true,
        2: true,
        3: false,
        4: true
      }
    }
  ];

  constructor() {}
}

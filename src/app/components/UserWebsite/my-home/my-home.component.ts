import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.component.html',
  styleUrls: ['./my-home.component.css']
})
export class MyHomeComponent implements OnInit {
  projects = [
    {
      name: 'Portfolio Website',
      description: 'A modern personal website built with Angular and Material Design.',
      image: 'assets/images/nexsuz.jpg'
    },
    {
      name: 'E-commerce Platform',
      description: 'A fully functional online store using Laravel and Angular.',
      image: 'assets/images/ecommerce.jpg'
    },
    {
      name: 'Task Manager App',
      description: 'A productivity tool for managing tasks with real-time collaboration features.',
      image: 'assets/images/task-manager.jpg'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

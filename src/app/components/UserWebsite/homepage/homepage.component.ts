import { Component, OnInit,AfterViewInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { MenuService } from 'src/app/Services/Menu/menu.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements AfterViewInit  {
  images = [
    { src: 'assets/home2.jpg', alt: 'Los Angeles', description: 'Los Angeles, the city of stars and Hollywood dreams.' },
    { src: 'assets/home.jpg', alt: 'Chicago', description: 'Chicago, known for its stunning skyline and deep-dish pizza.' },
  ];
  
  selectedIndex = 0; // Track active slide
  contact:any[]=[];


  constructor(private navigationService: MenuService,private notificationsService:NotificationsService) {
    
  }
  ngAfterViewInit() {
    this.getContact();

    setInterval(() => {
      const carousel = document.querySelector('#carouselExample');
      if (carousel) {
        // Trigger the next slide using Bootstrap's API
        (carousel as any).querySelector('.carousel-control-next')?.click();
      }
    }, 8000); 
  }
  ngOnInit(): void {
   
  }

  openInNewWindow(url: string) {
    const width = 900;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    window.open(url, '_blank', `width=${width},height=${height},top=${top},left=${left}`);
  }
  

    async getContact(): Promise<void> {
      try {
        const res = await firstValueFrom(this.navigationService.get_contact());
        
        if (res && res.data) { 
          this.contact = res.data;
        } else {
          this.contact = [];
          this.notificationsService.toastrWarning("No data found");
        }
      } catch (error) {
        this.notificationsService.toastrError(error);
      } 
    }
  
}

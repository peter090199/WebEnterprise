import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { MenuService } from 'src/app/Services/Menu/menu.service';
import { slideUpDownAnimation } from 'src/app/animation';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [slideUpDownAnimation]
})
export class ContactComponent implements OnInit {
  isLoading:boolean = false;
  success:boolean = false;
  modules:any[]= [];
  contact:any[]=[];

  constructor(private navigationService: MenuService,private notificationsService:NotificationsService
  ) { }

  ngOnInit(): void {
    this.getContact();
  }


  openInNewWindow(url: string) {
    const width = 900;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    window.open(url, '_blank', `width=${width},height=${height},top=${top},left=${left}`);
  }
  

  async getContact(): Promise<void> {
    this.isLoading = true;
    try {
      const res = await firstValueFrom(this.navigationService.get_contact());
      
      if (res && res.data) { // Assuming 'data' is the key for the actual data in the response
        this.contact = res.data;
      } else {
        this.contact = [];
        this.notificationsService.toastrWarning("No data found");
      }
    } catch (error) {
      this.notificationsService.toastrError(error);
    } finally {
      // Ensure that loading is false even if there is an error
      this.isLoading = false;
    }
  }
}

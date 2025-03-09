import { Component, Input, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/Services/Global/notifications.service';
import { firstValueFrom } from 'rxjs';
import { MenuService } from 'src/app/Services/Menu/menu.service';
@Component({
  selector: 'app-messenger-chat',
  templateUrl: './messenger-chat.component.html',
  styleUrls: ['./messenger-chat.component.css']
})
export class MessengerChatComponent implements OnInit {
  isChatVisible = false;
  contact:any[]=[];
  isLoading:boolean = false;

  constructor(private notificationsService:NotificationsService,private navigationService: MenuService


  ) { }

  ngOnInit(): void {
    this.getContact();
  }

  @Input() pageId: string = '253293024535662';
  
    async getContact(): Promise<void> {
      this.isLoading = true;
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
      } finally {
        // Ensure that loading is false even if there is an error
        this.isLoading = false;
      }
    }
  


  toggleChat(): void {
    this.isChatVisible = !this.isChatVisible;
    const chatElement = document.getElementById('fb-customer-chat');
    if (chatElement) {
      chatElement.style.display = this.isChatVisible ? 'block' : 'none';
    }
  }
}

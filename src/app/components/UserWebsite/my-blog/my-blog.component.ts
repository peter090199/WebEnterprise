import { Component, OnInit, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { ImageService } from 'src/app/Services/Images/image.service';
import { Router } from '@angular/router';
import { slideUpDownAnimation,slideLeftRightAnimation,slideUp, slideFade } from 'src/app/animation';
import { firstValueFrom } from 'rxjs';
import { MenuService } from 'src/app/Services/Menu/menu.service';

@Component({
  selector: 'app-my-blog',
  templateUrl: './my-blog.component.html',
  styleUrls: ['./my-blog.component.css'],
  animations: [slideUpDownAnimation,slideLeftRightAnimation,slideUp, slideFade]
})
export class MyBlogComponent implements OnInit,AfterViewInit{
  images: any[] = [];
  selectedImage: any = null;
  isLoading: boolean = false;
  roles:any[]=[];

  constructor
            (
                private imageService: ImageService, private menuServices:MenuService,
                private el: ElementRef, private router: Router
            )
            {}

  ngOnInit(): void {
    this.loadImages();
    this.getData();
  }

  ngAfterViewInit(): void {
    this.applyAnimations(); // Apply animations when component is loaded
  }
    
    async getData(): Promise<void> {
      this.isLoading = true;
      const res = await firstValueFrom(this.menuServices.get_blogByRole());
      if (res?.data?.length)
       {
        this.roles = res.data;
       } 
    }
    
  loadImages(): void {
    this.isLoading = true;
    this.imageService.getPublicImages().subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.images = response.data.map((image: { id: any; transCode: any; title: any; description: any; url: string; stats: any; }) => ({
            id: image.id,
            transCode: image.transCode,
            title: image.title,
            description: image.description,
            file_path: image.url.replace(/\\/g, ''),
            stats: image.stats || []
          }));
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching images:', error);
        this.isLoading = false;
      }
    });
  }

  onClick(image: any): void {
    this.selectedImage = image;
  }

  closePreview(): void {
    this.selectedImage = null;
  }

  /** Detect when user scrolls to bottom to load more images */
  @HostListener('window:scroll', [])
  onScroll(): void {
    this.applyAnimations();
  }

  /** Apply fade-in animation when elements appear on scroll */
  private applyAnimations(): void {
    const elements = this.el.nativeElement.querySelectorAll('.image-container, .description');
    elements.forEach((element: HTMLElement) => {
      const position = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (position < windowHeight * 0.8) {
        element.classList.add('fade-in');
      }
    });
  }
}

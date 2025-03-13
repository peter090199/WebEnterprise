import { Component, OnInit, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { ImageService } from 'src/app/Services/Images/image.service';
import { Router } from '@angular/router';
import { slideUpDownAnimation, slideLeftRightAnimation, slideUp, slideFade } from 'src/app/animation';
import { firstValueFrom } from 'rxjs';
import { MenuService } from 'src/app/Services/Menu/menu.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  animations: [slideUpDownAnimation, slideFade, slideLeftRightAnimation, slideUp]
})
export class AboutUSComponent implements OnInit, AfterViewInit {
  images: any[] = [];
  selectedImage: any = null;
  isLoading: boolean = false;
  roles: any[] = [];
  
  name: string = 'Pedro Yorpo';
  title: string = "I'M A WEB DEVELOPER";
  description: string = `My skilled detail-oriented Web Developer with over 2
  years of experience in designing, developing, and maintaining responsive websites and web
  applications. Proficient in front-end like HTML, CSS, JavaScript, Angular, and back-end technologies
  Laravel, PHP and databases like MySQL and SQL Server. Implementing cross-browser compatible,
  user-friendly, and mobile-first designs to enhance user engagement and experience.`;
  
  constructor(
    private imageService: ImageService,
    private menuServices: MenuService,
    private el: ElementRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadImages();
    this.getData();
  }

  ngAfterViewInit(): void {
    this.applyAnimations(); // Apply animations when the component is loaded
  }

  async getData(): Promise<void> {
    this.isLoading = true;
    try {
      const res = await firstValueFrom(this.menuServices.get_blogByRole());
      if (res?.data?.length) {
        this.roles = res.data;
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      this.isLoading = false;
    }
  }

  loadImages(): void {
    this.isLoading = true;
    this.imageService.getPublicImages().subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.images = response.data.map((image: any) => ({
            id: image.id,
            transCode: image.transCode,
            title: image.title,
            description: image.description,
            file_path: image.url.replace(/\\/g, ''),
            stats: image.stats || []
          }));
        }
      },
      error: (error) => {
        console.error('Error fetching images:', error);
      },
      complete: () => {
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

  /** Detect when the user scrolls to apply animations */
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

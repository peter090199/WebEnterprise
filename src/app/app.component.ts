import { Component, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './Services/Loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  title = 'Traveller';
  isLoading$!: Observable<boolean>; // ✅ Use "$" naming convention for observables

  constructor(
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    this.isLoading$ = this.loadingService.isLoading$;
  }


  ngAfterViewInit(): void {
    this.cdr.detectChanges(); // ✅ Ensure change detection runs after view init
    this.loadMessengerChat();
  }

  loadMessengerChat(): void {
    const fb = (window as any).FB;
    if (fb && fb.XFBML) {
      fb.XFBML.parse();
    }
  }
}

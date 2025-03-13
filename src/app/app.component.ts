import { Component, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './Services/Loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // ✅ Optimized Change Detection
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'PedsFolio | Freelancer';
  isLoading$: Observable<boolean>; // ✅ No need for "!:" (safe assignment in constructor)

  constructor(
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    this.isLoading$ = this.loadingService.isLoading$; // ✅ Proper observable initialization
  }

  ngOnInit(): void {
    this.isLoading$.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this.loadMessengerChat();
  }

  loadMessengerChat(): void {
    // ✅ Ensure FB SDK is loaded before parsing
    if ((window as any).FB?.XFBML) {
      (window as any).FB.XFBML.parse();
    }
  }
}

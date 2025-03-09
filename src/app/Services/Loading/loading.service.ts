import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  
  show(): void {
    if (!this.loadingSubject.value) {
      this.loadingSubject.next(true);
    }
  }

  hide(): void {
    if (this.loadingSubject.value) {
      this.loadingSubject.next(false);
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BudgetDataService {
  private dataCache: any = null;

  constructor(private http: HttpClient) {}

  getBudgetData(): Observable<any> {
    if (this.dataCache) {
      console.log("Using cached data:", this.dataCache);
      return of(this.dataCache);
    } else {
      console.log("Fetching data from backend...");
      return this.http.get<any>('http://localhost:3000/budget').pipe(
        tap(data => {
          console.log("Data received from backend:", data);
          this.dataCache = data;
        })
      );
    }
  }
}

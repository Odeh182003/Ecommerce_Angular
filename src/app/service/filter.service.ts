// src/app/service/filter.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private searchTermSource = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSource.asObservable();

  setSearchTerm(term: string) {
    this.searchTermSource.next(term);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  localStorage: Storage;
  
  constructor() {
    this.localStorage = window.localStorage;
  }
  get(): any {
    if (this.isLocalStorageSupported) {
      let item = this.localStorage.getItem('VIDEOS');
      if(item) return JSON.parse(item);
    }
    return null;
  }

  set(value: any): boolean {
    if (this.isLocalStorageSupported) {
      let videoList: any[] = this.get() && this.get().length > 0 ? this.get() : [];
      videoList.push(value);
      this.localStorage.setItem('VIDEOS', JSON.stringify(videoList));
      return true;
    }
    return false;
  }
  
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }
}
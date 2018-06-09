import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'user';

@Injectable()
export class UserProvider {

  constructor(public storage: Storage) { }

  IsSessionAlive() {
    return this.get().then(result => {
      console.log("result && result.IsActive", result && result.IsActive);
      return result && result.IsActive;
    });
  }

  set(user) {
    this.storage.set(STORAGE_KEY, user);
  }

  get() {
    return this.storage.get(STORAGE_KEY);
  }
}

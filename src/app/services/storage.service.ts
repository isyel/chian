import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storageReady = new BehaviorSubject(false);
  private storage: Storage | null = null;

  constructor(private _storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    // eslint-disable-next-line no-underscore-dangle
    const storage = await this._storage.create();
    this.storage = storage;
    this.storageReady.next(true);
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any): Promise<any> {
    return this.storage?.set(key, value);
  }

  public get(key: string): Promise<any> {
    return this.storage?.get(key);
  }

  public clearStorage(): Promise<any> {
    return this.storage?.clear();
  }
}

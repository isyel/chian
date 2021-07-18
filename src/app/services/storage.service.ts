import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage | null = null;

  constructor(private _storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    // eslint-disable-next-line no-underscore-dangle
    const storage = await this._storage.create();
    this.storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any): Promise<string> {
    return this.storage?.set(key, value);
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async get(key: string): Promise<string> {
    return await this.storage?.get(key);
  }
}

import { IStorage } from 'terrestrial-util-types';

export const ELECTRON_KEY_VALUE_STORAGE: IStorage | any = {
    FILE_NAME: 'userData/electron-key-value-storage.json',
  
    storageGet<T>(key: string): T | null {
      const theWindow = window as any;
  
      if(typeof theWindow === 'undefined' || !theWindow.fileAPI) {
        console.warn(`storageGet: Can't access fileAPI. Not in a electron environment.`, { theWindow, fileAPI: theWindow.fileAPI });
        return null;
      }
      
      try {
        const keyValuePairs = theWindow.fileAPI.readJSONSync(this.FILE_NAME);
        console.debug(`Read in the json file: ${(keyValuePairs ? JSON.stringify(keyValuePairs) : 'null')}`);
        const returnValue = keyValuePairs ? keyValuePairs[key] : null;
        console.debug(`Returning: ${(returnValue ? JSON.stringify(returnValue) : 'null')}`);
        return returnValue;
      } catch (error) {
        console.error(`Error reading fileAPI key "${key}":`, error);
        return null;
      }
    },
  
    storageSet<T>(key: string, value: T): void {
      const theWindow = window as any;
      let keyValuePairs: any = null;
  
      if(typeof theWindow === 'undefined' || !theWindow.fileAPI) {
        console.warn(`StorageSet: Can't access fileAPI. Not in a electron environment.`, { theWindow, fileAPI: theWindow.fileAPI });
        return;
      }
      
      try {
        // read in existing key value pairs
        try {
          keyValuePairs = theWindow.fileAPI.readJSONSync(this.FILE_NAME) || {};
          console.debug(`Read in the json file: ${(keyValuePairs ? JSON.stringify(keyValuePairs) : 'null')}`);
        } catch (error) {
          console.info(`"${this.FILE_NAME}" didn't exist. Will create a new one.`, error);
          keyValuePairs = {};
        }
        // update with the new value
        keyValuePairs[key] = value;
        // save the key value pairs
        theWindow.fileAPI.saveJSONSync(this.FILE_NAME, keyValuePairs);
        console.debug(`Saved the json file: ${(keyValuePairs ? JSON.stringify(keyValuePairs) : 'null')}`);
      } catch (error) {
        console.error(`Error saving fileAPI key "${key}":`, error);
      }
    },
  
    storageDelete(key: string): void {
      const theWindow = window as any;
  
      if(typeof theWindow === 'undefined' || !theWindow.fileAPI) {
        console.warn(`StorageDelete: Can't access fileAPI. Not in a electron environment.`, { theWindow, fileAPI: theWindow.fileAPI });
        return;
      }
      
      try {
        const keyValuePairs = theWindow.fileAPI.readJSONSync(this.FILE_NAME) || {};
        console.debug(`Read in the json file: ${(keyValuePairs ? JSON.stringify(keyValuePairs) : 'null')}`);
        if (key in keyValuePairs) {
          delete keyValuePairs[key];
          theWindow.fileAPI.saveJSONSync(this.FILE_NAME, keyValuePairs);
          console.debug(`Deleted key "${key}" from json file`);
        }
      } catch (error) {
        console.error(`Error deleting fileAPI key "${key}":`, error);
      }
    }
  };
  
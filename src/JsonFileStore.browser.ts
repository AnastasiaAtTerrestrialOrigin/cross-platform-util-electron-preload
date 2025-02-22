interface FileAPI {
  readJSON: (filePath: string) => Promise<any>;
  saveJSON: (filePath: string, data: any) => Promise<boolean>;
  deleteJSON: (filePath: string) => Promise<boolean>;
  readJSONSync: (filePath: string) => any;
  saveJSONSync: (filePath: string, data: any) => boolean;
  deleteJSONSync: (filePath: string) => boolean;
}

const ERROR_MESSAGE = 'File system operations are not available in browser environment. Use this module only in Node.js/Electron environments.';

export const fileAPI: FileAPI = {
  readJSON: async () => {
    throw new Error(ERROR_MESSAGE);
  },

  saveJSON: async () => {
    throw new Error(ERROR_MESSAGE);
  },

  deleteJSON: async () => {
    throw new Error(ERROR_MESSAGE);
  },

  readJSONSync: () => {
    throw new Error(ERROR_MESSAGE);
  },

  saveJSONSync: () => {
    throw new Error(ERROR_MESSAGE);
  },

  deleteJSONSync: () => {
    throw new Error(ERROR_MESSAGE);
  }
};

export default fileAPI; 
import {Renderer2} from "@angular/core";

enum SUPPORTED_FILE_TYPES {
  JS='js',
  CSS='css'
}

type FileTypeConfig = {
  type: 'script' | 'link'
  pathAttribute: 'src' | 'href'
  attributes: [string, string][]
}

const FILE_TYPE_CONFIGS: {[key in SUPPORTED_FILE_TYPES]: FileTypeConfig} = {
  [SUPPORTED_FILE_TYPES.JS]: {
    type: 'script',
    pathAttribute: 'src',
    attributes: [
      ['type', 'text/javascript'],
      ['async', 'true'],
      ['charset', 'utf-8']
    ]
  },
  [SUPPORTED_FILE_TYPES.CSS]: {
    type: 'link',
    pathAttribute: 'href',
    attributes: [
      ['type', 'text/css'],
      ['rel', 'stylesheet']
    ]
  }
}

export class ResourceLoaderService {
  constructor(
    private renderer: Renderer2
  ) {}

  loadFile(filePath: string): Promise<any> {

    return new Promise((resolve, reject) => {
      const config = this.#getFileTypeConfig(filePath);

      if(!config) {
        reject(`file type for '${filePath}' is not supported`);
        return;
      }

      const elem = this.#createElement(filePath, config);
      elem.onload = () => {
        resolve(true);
      }
      elem.onerror = (err: any) => {
        reject(err);
      }
    })
  }

  #getFileTypeConfig(filePath: string): FileTypeConfig | undefined {

    const fileType = /\.([0-9a-z]+)$/i;
    const result = fileType.exec(filePath);

    if(!result) {
      return;
    }

    return FILE_TYPE_CONFIGS[result[1] as SUPPORTED_FILE_TYPES];
  }

  #createElement(filePath: string, config: FileTypeConfig): any {

    const elem = this.renderer.createElement(config.type);

    config.attributes.forEach((attr) => {
      this.renderer.setAttribute(elem, attr[0], attr[1]);
    });

    this.renderer.setAttribute(elem, config.pathAttribute, filePath);
    this.renderer.appendChild(document.head, elem);

    return elem;
  }
}

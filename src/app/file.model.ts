

export interface File {
  name: string;
  path: string;
  files?: File[];
  content?: string;
  type: 'file' | 'dir';
}

export interface ProjectType {
  closed: boolean;
  projectId: string;
  projectName: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  folders: FolderType[];
}

export interface FolderType {
  closed: boolean;
  name: string;
  folderId: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  parentId: string;
  files: FileType[];
}

export interface FileType {
  fileName: string;
  fileId: string;
  folderId: string;
  createdAt: string;
  updatedAt: string;
  blocks: BlockType[];
}

export interface BlockType {
  blockType: string;
  type: string;
  fileId: string;
  blockId: string;
  createdAt: string;
  updatedAt: string;
  content: string;
}

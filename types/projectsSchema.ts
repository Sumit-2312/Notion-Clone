export interface ProjectType {
  projectId: string;
  projectName: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  folders: { [folderName: string]: FolderType };
}

export interface FolderType {
  folderName: string;
  folderId: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  parentId: string;
  files: { [fileName: string]: FileType };
}

export interface FileType {
  fileName: string;
  fileId: string;
  folderId: string;
  createdAt: string;
  updatedAt: string;
  blocks: { [blockName: string]: BlockType };
}

export interface BlockType {
  blockName: string;
  type: string;
  fileId: string;
  blockId: string;
  createdAt: string;
  updatedAt: string;
  content: string;
}

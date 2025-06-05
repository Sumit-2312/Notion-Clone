export interface IUser {
  userName: string;
  userId: number;
  email: string;
  password: string;
}


export interface IProject {
  name: string;
  userId: number;
  projectId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFolder {
  name: string;
  folderId: number;
  projectId: number;
  parentId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFile {
  name: string;
  fileId: number;
  folderId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type BlockType = "H1" | "H2" | "H3" | "text" | "image" | "icon";

export interface IBlock {
  type: BlockType;
  fileId: number;
  content: string;
}
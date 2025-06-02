import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// ------------------------------
export interface IUser {
  userName: string;
  userId: number;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
    minLength: [5, "Minimum length is 5 letters"]
  },
  userId: {
    type: Number,
    default: Date.now
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// ------------------------------
export interface IProject {
  name: string;
  userId: number;
  projectId: number;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  userId: { type: Number },
  projectId: { type: Number, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ------------------------------
export interface IFolder {
  name: string;
  folderId: number;
  projectId: number;
  parentId: number;
  createdAt: Date;
  updatedAt: Date;
}

const folderSchema = new Schema<IFolder>({
  name: { type: String, required: true },
  folderId: { type: Number, default: Date.now },
  projectId: { type: Number },
  parentId: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ------------------------------
export interface IFile {
  name: string;
  fileId: number;
  folderId: number;
  createdAt: Date;
  updatedAt: Date;
}

const fileSchema = new Schema<IFile>({
  name: { type: String, required: true },
  fileId: { type: Number, default: Date.now },
  folderId: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ------------------------------
export type BlockType = "H1" | "H2" | "H3" | "text" | "image" | "icon";

export interface IBlock {
  type: BlockType;
  fileId: number;
  content: string;
}

const blockSchema = new Schema<IBlock>({
  type: { type: String, enum: ["H1", "H2", "H3", "text", "image", "icon"] },
  fileId: { type: Number },
  content: { type: String }
});

// ------------------------------

const UserModel = mongoose.models.users || model<IUser>("users", userSchema);
const ProjectModel = mongoose.models.projects || model<IProject>("projects", projectSchema);
const FolderModel = mongoose.models.folders || model<IFolder>("folders", folderSchema);
const FileModel = mongoose.models.files || model<IFile>("files", fileSchema);
const BlockModel = mongoose.models.blocks || model<IBlock>("blocks", blockSchema);

// ------------------------------
export {
  UserModel as users,
  ProjectModel as projects,
  FolderModel as folders,
  FileModel as files,
  BlockModel as blocks
};

import { IBlock, IFile, IFolder, IProject, IUser } from '@/types/database';
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// ------------------------------

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

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  userId: { type: Number },
  projectId: { type: Number, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ------------------------------


const folderSchema = new Schema<IFolder>({
  name: { type: String, required: true },
  folderId: { type: Number, default: Date.now },
  projectId: { type: Number },
  parentId: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ------------------------------


const fileSchema = new Schema<IFile>({
  name: { type: String, required: true },
  fileId: { type: Number, default: Date.now },
  folderId: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ------------------------------


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

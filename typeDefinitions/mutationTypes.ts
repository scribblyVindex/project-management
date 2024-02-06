export type Account = {
  id: string | null;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
  user: User;
};

export type Session = {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;
};

export type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  accounts: Account[] | null;
  sessions: Session[] | null;
  projects: Project[] | null;
  projectAdmin: Project[] | null;
  projectsCreated: Project[] | null;
  tasksAssigned: Task[] | null;
  tasksReported: Task[] | null;
  createdAt: Date;
  updatedAt: Date;
};

export type VerificationToken = {
  identifier: string;
  token: string;
  expires: Date;
};

export type Task = {
  id: number;
  title: string;
  description: string | null;
  type: string;
  assignees: User[] | null;
  creatorId: string | null;
  creator: User | null;
  priority: string;
  dueDate: Date | null;
  tags: string[] | null;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type Project = {
  id: string;
  name: string;
  description: string | null;
  admins: User[] | null;
  members: User[] | null;
  prefix: string;
  tags: string[] | null;
  status: string[] | null;
  priority: string[] | null;
  invitations: string[] | null;
  createdBy: User;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date | null;
};

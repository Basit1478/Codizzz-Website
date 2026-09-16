export type ServiceRecord = {
  id: string;
  slug: string;
  iconKey: string;
  icon?: string;
  iconPath?: string;
  title: string;
  short: string;
  position: number;
  published: boolean;
  updatedAt?: string;
};

export type CareerRole = {
  id: string;
  slug: string;
  title: string;
  focus: string;
  description: string;
  position: number;
  published: boolean;
  updatedAt?: string;
};

export type TeamMember = {
  id: string;
  slug: string;
  name: string;
  role: string;
  image: string;
  imagePath: string;
  summary: string;
  skills: string[];
  linkedinUrl: string;
  xUrl: string;
  position: number;
  published: boolean;
  updatedAt?: string;
};

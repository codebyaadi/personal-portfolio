import { personal } from '@/constants/personal';
import { navbar } from '@/constants/navbar';
import { contact } from '@/constants/contact';
import { work } from '@/constants/work';
import { education } from '@/constants/education';
import { projects } from '@/constants/projects';

export const DATA = {
  ...personal,
  navbar,
  contact,
  work,
  education,
  projects,
} as const;

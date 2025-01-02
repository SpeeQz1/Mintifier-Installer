import { InstallFormat } from "@src/types/index";

export interface Application {
  id: string;
  name: string;
  categoryId: string;
  sectionId: string;
  formats?: InstallFormat[];
}
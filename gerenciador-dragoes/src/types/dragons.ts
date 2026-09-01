export interface Dragon {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  histories?: string[];
}

export interface DragonFormData {
  name: string;
  type: string;
}

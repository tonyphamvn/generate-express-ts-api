export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserPublicDto {
  id: number;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

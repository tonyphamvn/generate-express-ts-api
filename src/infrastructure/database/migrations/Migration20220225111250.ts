import { Migration } from '@mikro-orm/migrations';

export class Migration20220225111250 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`CREATE TABLE "users" (
  "id" SERIAL NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "password" VARCHAR(200) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_users" PRIMARY KEY ("id"),
  CONSTRAINT "UQ_users_email" UNIQUE ("email")
);`);
  }

  override async down(): Promise<void> {
    this.addSql('DROP TABLE "users";');
  }
}

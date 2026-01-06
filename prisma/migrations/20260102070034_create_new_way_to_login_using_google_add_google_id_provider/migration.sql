-- AlterTable
ALTER TABLE `users` ADD COLUMN `googleId` VARCHAR(191) NULL,
    ADD COLUMN `provider` VARCHAR(191) NOT NULL DEFAULT 'local',
    MODIFY `password` VARCHAR(100) NULL;

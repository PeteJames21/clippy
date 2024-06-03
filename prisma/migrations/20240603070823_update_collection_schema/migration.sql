/*
  Warnings:

  - Added the required column `public` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Collection` ADD COLUMN `description` VARCHAR(150) NULL,
    ADD COLUMN `public` BOOLEAN NOT NULL,
    ADD COLUMN `userID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Collection` ADD CONSTRAINT `Collection_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

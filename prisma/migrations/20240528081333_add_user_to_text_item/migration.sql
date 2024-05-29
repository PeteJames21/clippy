/*
  Warnings:

  - Added the required column `userID` to the `TextItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TextItem` ADD COLUMN `userID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `TextItem` ADD CONSTRAINT `TextItem_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

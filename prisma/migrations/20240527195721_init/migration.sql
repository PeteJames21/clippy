-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Collection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `imgPath` VARCHAR(191) NULL,

    UNIQUE INDEX `Collection_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TextItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `public` BOOLEAN NOT NULL,
    `content` VARCHAR(1500) NOT NULL,
    `description` VARCHAR(1000) NOT NULL,
    `tags` VARCHAR(100) NULL,
    `collectionId` INTEGER NOT NULL,

    INDEX `fulltext_index`(`content`(300), `description`(250), `tags`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TextItem` ADD CONSTRAINT `TextItem_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `Collection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

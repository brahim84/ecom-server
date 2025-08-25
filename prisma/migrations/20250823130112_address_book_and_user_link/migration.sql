/*
  Warnings:

  - You are about to drop the column `adress` on the `customer_order` table. All the data in the column will be lost.
  - You are about to drop the column `apartment` on the `customer_order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeSessionId]` on the table `Customer_order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[paymentIntentId]` on the table `Customer_order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `line1` to the `Customer_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `line2` to the `Customer_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Customer_order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer_order` DROP COLUMN `adress`,
    DROP COLUMN `apartment`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `line1` VARCHAR(191) NOT NULL,
    ADD COLUMN `line2` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentIntentId` VARCHAR(191) NULL,
    ADD COLUMN `stripeSessionId` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `UserProfile` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,

    UNIQUE INDEX `UserProfile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAddress` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `line1` VARCHAR(191) NOT NULL,
    `line2` VARCHAR(191) NULL,
    `city` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NULL,
    `postalCode` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `isDefaultShipping` BOOLEAN NOT NULL DEFAULT false,
    `isDefaultBilling` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `UserAddress_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_order_stripeSessionId_key` ON `Customer_order`(`stripeSessionId`);

-- CreateIndex
CREATE UNIQUE INDEX `Customer_order_paymentIntentId_key` ON `Customer_order`(`paymentIntentId`);

-- AddForeignKey
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAddress` ADD CONSTRAINT `UserAddress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer_order` ADD CONSTRAINT `Customer_order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

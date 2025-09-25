/*
  Warnings:

  - The primary key for the `SpotifyRefreshToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StravaRefreshToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `SpotifyRefreshToken` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `StravaRefreshToken` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "public"."SpotifyRefreshToken" DROP CONSTRAINT "SpotifyRefreshToken_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SpotifyRefreshToken_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."StravaRefreshToken" DROP CONSTRAINT "StravaRefreshToken_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "StravaRefreshToken_pkey" PRIMARY KEY ("id");

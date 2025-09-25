-- CreateTable
CREATE TABLE "public"."StravaRefreshToken" (
    "token" TEXT NOT NULL,

    CONSTRAINT "StravaRefreshToken_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "public"."SpotifyRefreshToken" (
    "token" TEXT NOT NULL,

    CONSTRAINT "SpotifyRefreshToken_pkey" PRIMARY KEY ("token")
);

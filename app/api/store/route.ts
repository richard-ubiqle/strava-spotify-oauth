import { NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
    // const strava_data = await prisma.stravaRefreshToken.create({
    //   data: {
    //     token: "084ec3c28c7d2e94fc79434cd87cf3f545b4d858"
    //   },
    // });
    // const spotify_data = await prisma.spotifyRefreshToken.create({
    //   data: {
    //     token:
    //       "AQAgrvFBKguQiEGlSv19KizbA-q51qNcLAHZRgs2zD_flAaNgipMz25ltSSPwaCj5zuoQc1Gd2MNja43aUf1iwBOg6WtTCwS5LFbmV1uAUshtQ899GmTlYkqvw15LB5iIY0"
    //   },
    // });

  const strava_data = (await prisma.stravaRefreshToken.findMany({orderBy:{createdAt:'desc'}}))[0];
  const spotify_data = (await prisma.spotifyRefreshToken.findMany({orderBy:{createdAt:'desc'}}))[0];

  return NextResponse.json({
    strava_data,
    spotify_data,
  });
}

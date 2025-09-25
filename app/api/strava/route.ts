import { NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

const client_id = process.env.STRAVA_CLIENT_ID!;
const client_secret = process.env.STRAVA_CLIENT_SECRET!;

export async function GET() {
  //fetch the latest saved refresh token
  const savedToken = await prisma.stravaRefreshToken.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  //fetch access token
  const tokenResponse = await axios.post("https://www.strava.com/oauth/token", {
    client_id,
    client_secret,
    grant_type: "refresh_token",
    refresh_token: savedToken?.[0]?.token,
  });

  const { access_token, refresh_token: newRefreshToken } = tokenResponse.data;

  //save new refresh token for later use if present
  if (newRefreshToken && newRefreshToken !== savedToken?.[0]?.token) {
    await prisma.stravaRefreshToken.create({
      data: {
        token: newRefreshToken,
      },
    });
  }

  //fetch activities
  const activitiesResponse = await axios.get(
    "https://www.strava.com/api/v3/athlete/activities",
    { headers: { Authorization: `Bearer ${access_token}` } }
  );

  return NextResponse.json(activitiesResponse.data);
}

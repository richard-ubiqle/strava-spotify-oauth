import axios from "axios";
import {  NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;

export async function GET() {
    //fetch the latest saved refresh token
    const savedToken = await prisma.spotifyRefreshToken.findMany({
      orderBy:{
        createdAt:'desc'
      }
    })

    //turn credentials to base64
    const token = Buffer.from(`${client_id}:${client_secret}`).toString(
      "base64"
    );

    if(!savedToken){
      throw new Error("No refresh token")
    }

    //fetch new access token
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: savedToken?.[0]?.token,
      }),
      {
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    //save new refresh token for later use if present
    if(response?.data?.refresh_token){
      await prisma.spotifyRefreshToken.create({
        data:{
          token:response?.data?.refresh_token
        }
      })
    }

    //fetch user playlist
    const data = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played?limit=5",
      {
        headers: {
          Authorization: `Bearer ${response?.data?.access_token}`,
        },
      }
    );

    return NextResponse.json(data.data);
 
}

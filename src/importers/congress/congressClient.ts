import dotenv from "dotenv";
dotenv.config();

// talk to congress.gov
const CONGRESS_API_BASE_URL = "https://api.congress.gov/v3";

const API_KEY = process.env.API_GOV_DATA;

const request = async (path: string) => {
  console.log("API Key Loaded:", !!API_KEY);
  const url = new URL(`${CONGRESS_API_BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY!);

  console.log("Request URL:");
  console.log(url.toString());

  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text();
    console.log(text);
    throw new Error(`Congress API Error: ${response.status}`);
  }

  return response.json();
};

export const getMemberByBioguideId = async (bioguideId: string) => {
  return request(`/member/${bioguideId}`);
};
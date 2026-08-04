import dotenv from "dotenv";
dotenv.config();

// talk to congress.gov
const BASE_URL = "https://api.congress.gov/v3";

const API_KEY = process.env.API_GOV_DATA;

const get = async <T>(
  endpoint: string
): Promise<T> => {

  if (!API_KEY) {
    throw new Error("Congress API key missing");
  }

  const response = await fetch(
    `${BASE_URL}${endpoint}?api_key=${API_KEY}`
  );


  if (!response.ok) {
    throw new Error(
      `Congress API error: ${response.status}`
    );
  }


  return response.json() as Promise<T>;
};


export const congressClient = {
  get,
};
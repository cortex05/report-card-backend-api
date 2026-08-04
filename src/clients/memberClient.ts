import { congressClient } from "./congressClient";
import { CongressMemberResponse } from "../types/congress/member";

const get = async (
  bioguideId: string
): Promise<CongressMemberResponse> => {

  return congressClient.get<CongressMemberResponse>(
    `/member/${bioguideId}`
  );
};


export const memberClient = {
  get,
};
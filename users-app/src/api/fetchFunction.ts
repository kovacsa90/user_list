import axios from "axios";
import { User, UserData, NatSet } from "./types";

async function fetchUsers(natSet: NatSet, pageNumber: number): Promise<User[]> {
  const natList = natSet.join();
  try {
    const res: UserData = await axios.get(
      `https://randomuser.me/api/?nat=${natList}&page=${pageNumber}&results=10`,
    );
    return res.data.results;
  } catch (err) {
    throw new Error(err);
  }
}

export default fetchUsers;

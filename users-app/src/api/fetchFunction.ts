import axios from "axios";
import { User, UserData } from "./types";

async function fetchUsers(pageNumber: number): Promise<User[]> {
  try {
    const res: UserData = await axios.get(
      `https://randomuser.me/api/?page=${pageNumber}&results=10`,
    );
    return res.data.results;
  } catch (err) {
    throw new Error(err);
  }
}

export default fetchUsers;

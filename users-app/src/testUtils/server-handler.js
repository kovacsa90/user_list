import {rest} from 'msw'
import mockData from "./MockData.json";

const handlers = [
    rest.get("https://randomuser.me/api", async (req, res, ctx) => {
        return res(ctx.json(mockData))
    }),
]
export {
    handlers
}

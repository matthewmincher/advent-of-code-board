import { Leaderboard } from "../types/AdventOfCodeLeaderboard";

export default class AdventOfCodeLeaderboardService {
  async getLeaderboard(
    sessionId: string,
    eventYear: string,
    boardId: string,
  ): Promise<Leaderboard> {
    const opts: RequestInit = {
      headers: {
        cookie: `session=${sessionId}`,
      },
    };

    const result = await fetch(
      `https://adventofcode.com/${eventYear}/leaderboard/private/view/${boardId}.json`,
      opts,
    );

    if (!result.ok) {
      throw new Error(
        `Request for leaderboard failed (${result.status}): ${result.statusText}`,
      );
    }

    return result.json();
  }
}

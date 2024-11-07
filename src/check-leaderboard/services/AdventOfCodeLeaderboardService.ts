import { Leaderboard } from "../types/AdventOfCodeLeaderboard";

export default class AdventOfCodeLeaderboardService {
  private readonly sessionId: string;

  constructor() {
    this.sessionId = process.env.AOC_SESSION_ID;
  }

  async getLeaderboard(
    eventYear: string,
    boardId: string,
  ): Promise<Leaderboard> {
    const opts: RequestInit = {
      headers: {
        cookie: `session=${this.sessionId}`,
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

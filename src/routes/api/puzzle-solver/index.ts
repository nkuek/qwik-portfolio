import type { RequestHandler } from '@builder.io/qwik-city';
import { solve8Puzzle } from '~/utils/puzzleSolver';

export const onPost: RequestHandler = async ({ json, request }) => {
  const shuffledBoard = await request.json();

  const solution = solve8Puzzle(shuffledBoard);
  json(200, solution);
};

interface QueueElement<T> {
  element: T;
  priority: number;
}

function createPriorityQueue<T>() {
  const items: QueueElement<T>[] = [];

  function enqueue(element: T, priority: number): void {
    const queueElement = { element, priority };
    let added = false;

    for (let i = 0; i < items.length; i++) {
      if (priority < items[i].priority) {
        items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }

    if (!added) {
      items.push(queueElement);
    }
  }

  function dequeue(): T | undefined {
    return items.shift()?.element;
  }

  function isEmpty(): boolean {
    return items.length === 0;
  }

  function peek(): T | undefined {
    return items[0]?.element;
  }

  function size(): number {
    return items.length;
  }

  return { enqueue, dequeue, isEmpty, peek, size };
}

// Define the possible moves for each position in the puzzle
const moves = [
  ['1', '3'], // Moves for piece at position 0
  ['0', '2', '4'], // Moves for piece at position 1
  ['1', '5'], // Moves for piece at position 2
  ['0', '4', '6'], // Moves for piece at position 3
  ['1', '3', '5', '7'], // Moves for piece at position 4
  ['2', '4', '8'], // Moves for piece at position 5
  ['3', '7'], // Moves for piece at position 6
  ['4', '6', '8'], // Moves for piece at position 7
  ['5', '7'], // Moves for piece at position 8
];

type PuzzleState = Record<string, number>; // Key: number or 'empty', Value: number
type PuzzleMove = string; // The piece that was swapped

interface PuzzleStep {
  state: PuzzleState;
  move?: PuzzleMove; // Store the piece that was swapped to reach this state
  cost: number; // The cost of this step
}

export function solve8Puzzle(initialState: PuzzleState): PuzzleMove[] {
  // Define the goal state
  const goalState: PuzzleState = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    empty: 8,
  };

  // Priority queue to perform A* search
  const queue = createPriorityQueue<PuzzleStep>();
  queue.enqueue({ state: initialState, cost: 0 }, 0);

  // Keep track of visited states to avoid cycles
  const visited: Record<string, boolean> = {
    [serializeState(initialState)]: true,
  };

  // Keep track of each state and the step that led to it
  const cameFrom: Record<string, PuzzleStep | undefined> = {};

  // While there are states in the queue
  while (!queue.isEmpty()) {
    const currentStep = queue.dequeue()!;

    // Check if the current state is the goal state
    if (compareStates(currentStep.state, goalState)) {
      // Reconstruct the sequence of moves
      const moves: PuzzleMove[] = [];
      let backtrackStep: PuzzleStep | undefined = currentStep;

      while (backtrackStep?.move) {
        moves.unshift(backtrackStep.move);
        backtrackStep = cameFrom[serializeState(backtrackStep.state)]; // Use the map to find the previous step
      }

      return moves;
    }

    // Generate next states by swapping the 'empty' piece with an adjacent piece
    for (const piece of moves[Number(currentStep.state.empty)]) {
      const newState = { ...currentStep.state };
      const emptyIndex = newState['empty'];
      const pieceIndex = Object.keys(newState).find(
        (key) => newState[key] === Number(piece)
      );

      if (pieceIndex) {
        newState[pieceIndex] = emptyIndex;
        newState['empty'] = Number(piece);

        const newStateSerialized = serializeState(newState);
        if (!visited[newStateSerialized]) {
          visited[newStateSerialized] = true;
          const newStep = {
            state: newState,
            move: pieceIndex,
            cost: currentStep.cost + 1 + heuristic(newState, goalState),
          };
          queue.enqueue(newStep, newStep.cost);
          cameFrom[newStateSerialized] = currentStep; // Store the step that led to this state
        }
      }
    }
  }

  // If no solution is found, return null
  return [];
}

// Heuristic function (number of misplaced tiles)
function heuristic(state: PuzzleState, goalState: PuzzleState): number {
  let misplacedTiles = 0;
  for (const key in state) {
    if (state[key] !== goalState[key]) {
      misplacedTiles++;
    }
  }
  return misplacedTiles;
}

// Helper function to compare two puzzle states
function compareStates(state1: PuzzleState, state2: PuzzleState): boolean {
  for (const key in state1) {
    if (state1[key] !== state2[key]) {
      return false;
    }
  }
  return true;
}

// Helper function to serialize a puzzle state to a string for tracking visited states
function serializeState(state: PuzzleState): string {
  return JSON.stringify(state);
}

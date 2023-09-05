import FullLogo from '~/images/puzzle/full.svg?jsx';
import Piece0 from '~/images/puzzle/piece-0.svg?jsx';
import Piece1 from '~/images/puzzle/piece-1.svg?jsx';
import Piece2 from '~/images/puzzle/piece-2.svg?jsx';
import Piece3 from '~/images/puzzle/piece-3.svg?jsx';
import Piece4 from '~/images/puzzle/piece-4.svg?jsx';
import Piece5 from '~/images/puzzle/piece-5.svg?jsx';
import Piece6 from '~/images/puzzle/piece-6.svg?jsx';
import Piece7 from '~/images/puzzle/piece-7.svg?jsx';
import {
  $,
  Slot,
  component$,
  useContext,
  useSignal,
  useStore,
  useStylesScoped$,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { css, cx } from '@styles/css';
import { ThemeContext } from '~/root';
import { DSButton } from '~/components/design-system/DSButton';
import { DSText } from '~/components/design-system/DSText';
import { LoadingDots } from '~/components/loading';

const depth = 3;
const numPuzzlePieces = depth ** 2 - 1; // 8
const gridGap = '7px';

type PuzzleMap = Record<number | 'empty', number>;

function generateInitialBoard(): PuzzleMap {
  const puzzleMap: PuzzleMap = { empty: 8 };

  for (let i = 0; i < numPuzzlePieces; i++) {
    puzzleMap[i] = i;
  }

  return puzzleMap;
}

function generateTranslationMatrix() {
  const matrix: string[] = [];
  for (let rowIndex = 0; rowIndex < depth; rowIndex++) {
    for (let colIndex = 0; colIndex < depth; colIndex++) {
      matrix.push(
        `translate(calc(100% * ${colIndex} + ${gridGap} * ${colIndex}), calc(100% * ${rowIndex} + ${gridGap} * ${rowIndex}))`
      );
    }
  }
  return matrix;
}

const initialBoard = generateInitialBoard();
const translationMatrix = generateTranslationMatrix();

// Fisher-Yates Shuffle
// https://www.tutorialspoint.com/what-is-fisher-yates-shuffle-in-javascript
function shuffleBoard(
  puzzleMap: PuzzleMap,
  shouldBeSolvable = true
): PuzzleMap {
  const copy = { ...puzzleMap };
  const shouldBeUnsolvable = !shouldBeSolvable;

  for (let i = Object.values(copy).length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    const piece1 = copy[i < 8 ? i : 'empty'];
    const piece2 = copy[j < 8 ? j : 'empty'];

    copy[i < 8 ? i : 'empty'] = piece2;
    copy[j < 8 ? j : 'empty'] = piece1;
  }

  const isSolvable = checkSolvability(copy);
  const isUnsolvable = !isSolvable;

  // create unsolvable board
  if (isSolvable && shouldBeUnsolvable) {
    return shuffleBoard(puzzleMap, shouldBeSolvable);
  }

  // create solvable board
  if (isUnsolvable && shouldBeSolvable) {
    return shuffleBoard(puzzleMap);
  }

  return copy;
}

/*
Solving a sliding puzzle is essentially just inverting adjacent tiles until the array is sorted.

We can ignore the empty tile since that is not a tile a user can invert.

In this simple algorithm, we iterate over pairs of elements in the array. If we find a pair where the outer loop is greater than the inner loop, that means that the elements are in reverse order, and thus, need to be inverted.

We could replace this with a merge sort algorithm, but that might be overly complex in this case since we know the array will always be a fixed size.

Sliding puzzles are only solvable if the number of inversions is even.
See https://www.geeksforgeeks.org/check-instance-8-puzzle-solvable/ for more details.
*/
function checkSolvability(puzzleMap: PuzzleMap) {
  let inversions = 0;
  const array = Object.entries(puzzleMap);
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const [initialIndex1, currentIndex1] = array[i];
      const [initialIndex2, currentIndex2] = array[j];
      if (
        currentIndex1 > currentIndex2 &&
        initialIndex1 !== 'empty' &&
        initialIndex2 !== 'empty'
      ) {
        inversions++;
      }
    }
  }

  const isEven = inversions % 2 === 0;
  return isEven;
}

type SliderPuzzleStore = {
  numTurns: number;
  shuffledBoard: PuzzleMap;
  restartCounter: number;
  // prevent interacting with the board until the shuffle animation plays
  isShuffled: boolean;
  isComplete: boolean;
  showPlayAgainButton: boolean;
  isSolving: boolean;
  isAnimating: boolean;
  disableButtons: boolean;
  hideSolveButton: boolean;
  showNoSolution: boolean;
};

type SliderPuzzleProps = {
  shuffle?: boolean;
  showUI?: boolean;
  isSolvable?: boolean;
};

const SliderPuzzle = component$(
  ({ shuffle = true, showUI = true, isSolvable = true }: SliderPuzzleProps) => {
    const theme = useContext(ThemeContext);
    const sliderPuzzleStore = useStore<SliderPuzzleStore>({
      numTurns: 0,
      restartCounter: 0,
      isShuffled: false,
      isComplete: false,
      showPlayAgainButton: false,
      shuffledBoard: shuffle
        ? shuffleBoard(initialBoard, isSolvable)
        : initialBoard,
      isSolving: false,
      isAnimating: false,
      disableButtons: false,
      hideSolveButton: false,
      showNoSolution: false,
    });

    const puzzleContainerSignal = useSignal<HTMLDivElement>();
    const puzzleWrapperSignal = useSignal<HTMLDivElement>();

    const checkAdjacency = $((index: number) => {
      const maybeAdjacentTile = sliderPuzzleStore.shuffledBoard[index];
      const emptyTileRow = Math.floor(
        sliderPuzzleStore.shuffledBoard.empty / depth
      );
      const emptyTileCol = sliderPuzzleStore.shuffledBoard.empty % depth;

      const maybeAdjacentRow = Math.floor(maybeAdjacentTile / depth);
      const maybeAdjacentCol = maybeAdjacentTile % depth;

      const rowDiff = Math.abs(emptyTileRow - maybeAdjacentRow);
      const colDiff = Math.abs(emptyTileCol - maybeAdjacentCol);

      const isVerticallyAdjacent = rowDiff === 1 && colDiff === 0;
      const isHorizontallyAdjacent = rowDiff === 0 && colDiff === 1;

      return isVerticallyAdjacent || isHorizontallyAdjacent;
    });

    const swapTiles = $(async (index: number, buttonEl: HTMLButtonElement) => {
      const isAdjacent = await checkAdjacency(index);

      const tile = sliderPuzzleStore.shuffledBoard[index];

      if (!isAdjacent) {
        return;
      }
      buttonEl.style.transform =
        translationMatrix[sliderPuzzleStore.shuffledBoard.empty];

      sliderPuzzleStore.shuffledBoard[index] =
        sliderPuzzleStore.shuffledBoard.empty;
      sliderPuzzleStore.shuffledBoard.empty = tile;

      sliderPuzzleStore.numTurns++;
    });

    const solvePuzzle = $(async () => {
      sliderPuzzleStore.isAnimating = true;
      sliderPuzzleStore.disableButtons = true;
      const solutionData = await fetch('/api/puzzle-solver', {
        body: JSON.stringify(sliderPuzzleStore.shuffledBoard),
        method: 'POST',
      });

      const solution: string[] = await solutionData.json();
      sliderPuzzleStore.isSolving = false;

      for (const step of solution) {
        const buttonEl = document.getElementById(
          `index-${step}`
        ) as HTMLButtonElement;
        // Add a delay for each step to create an animation effect
        await new Promise((resolve) => setTimeout(resolve, 250));
        // Trigger the swapTiles function for each step
        swapTiles(parseInt(step), buttonEl);
      }
      if (!solution.length) {
        sliderPuzzleStore.disableButtons = false;
        sliderPuzzleStore.showNoSolution = true;
      }
      sliderPuzzleStore.isAnimating = false;
    });

    // Shuffle animation
    useVisibleTask$(({ track, cleanup }) => {
      track(() => sliderPuzzleStore.restartCounter);
      if (!puzzleContainerSignal.value) {
        return;
      }
      const tiles = puzzleContainerSignal.value.children;

      const shuffleTimeout = setTimeout(
        () => {
          for (let i = 0; i < tiles.length; i++) {
            const boardTile = sliderPuzzleStore.shuffledBoard[i];

            const tile = tiles[i] as HTMLButtonElement;

            tile.style.transform = translationMatrix[boardTile];
          }

          sliderPuzzleStore.isShuffled = true;
        },
        sliderPuzzleStore.restartCounter > 0 ? 0 : 500
      );
      cleanup(() => clearTimeout(shuffleTimeout));
    });

    // Check for completion state
    useVisibleTask$(({ track }) => {
      track(() => sliderPuzzleStore.numTurns);
      if (sliderPuzzleStore.numTurns === 0) {
        return;
      }

      // check the current state of the board against the initial state of the board (ie the piece's currentIndex vs the key in the puzzle map)

      const allCorrect = Object.entries(sliderPuzzleStore.shuffledBoard).every(
        ([correctIndex, currentIndex]) => {
          if (correctIndex === 'empty') {
            return currentIndex === 8;
          }
          return currentIndex === parseInt(correctIndex);
        }
      );

      if (!allCorrect) {
        return;
      }

      setTimeout(() => {
        puzzleWrapperSignal.value?.classList.add('complete');
        sliderPuzzleStore.isComplete = true;
      }, 750);
    });

    // Check for board state for adjacency to enable/disable buttons
    // Disable all buttons except for those adjacent to the empty tile
    useVisibleTask$(async ({ track }) => {
      track(() => sliderPuzzleStore.numTurns);
      track(() => sliderPuzzleStore.restartCounter);
      if (!puzzleContainerSignal.value) {
        return;
      }
      const tiles = puzzleContainerSignal.value.children;

      for (let i = 0; i < tiles.length; i++) {
        const tileElement = tiles[i] as HTMLButtonElement | undefined;
        if (!tileElement) {
          return;
        }
        const isAdjacent = await checkAdjacency(i);
        tileElement.disabled = sliderPuzzleStore.isAnimating || !isAdjacent;
      }
    });

    // If no solution, hide after 5 seconds
    useTask$(({ track, cleanup }) => {
      track(() => sliderPuzzleStore.showNoSolution);

      const timeout = setTimeout(() => {
        sliderPuzzleStore.showNoSolution = false;
      }, 5000);

      cleanup(() => clearTimeout(timeout));
    });

    const resetState = $(() => {
      sliderPuzzleStore.isComplete = false;
      sliderPuzzleStore.showPlayAgainButton = false;
      sliderPuzzleStore.isShuffled = false;
      sliderPuzzleStore.numTurns = 0;
      sliderPuzzleStore.shuffledBoard = shuffleBoard(initialBoard, isSolvable);
      sliderPuzzleStore.restartCounter++;
      puzzleWrapperSignal.value?.classList.remove('complete');
      puzzleContainerSignal.value?.style.setProperty('--visibility', 'visible');
      sliderPuzzleStore.isSolving = false;
      sliderPuzzleStore.hideSolveButton = false;
    });

    useStylesScoped$(`
  @keyframes scaleColorBar {
    50% {
      stroke-width: 200vh
    }
  }

  .complete {
    & .fullPuzzle {
      opacity: 1;
      & path {
        transition: fill-opacity 1000ms ease, fill 1000ms ease;
        fill: var(--fill);
        fill-opacity: 1;
      }
      & g {
        & path:nth-child(1) {
            animation: scaleColorBar 3000ms ease-in;
            animation-play-state: var(--animationState)
          }

          & path:nth-child(2) {
            animation: scaleColorBar 3000ms ease-in 250ms;
            animation-play-state: var(--animationState)
          }
          & path:nth-child(3) {
            animation: scaleColorBar 3000ms ease-in 500ms;
            animation-play-state: var(--animationState)
          }
          & path:nth-child(4) {
            animation: scaleColorBar 3000ms ease-in 750ms;
            animation-play-state: var(--animationState)
          }
      }
    }

    & .puzzleContainer {
      opacity: 0;
    }
  }
  `);
    const PuzzlePiece = component$(({ index }: { index: number }) => {
      return (
        <button
          style={{
            transform: translationMatrix[index],
          }}
          id={`index-${index}`}
          class={css({
            position: 'absolute',
            width: 'var(--side-length)',
            height: 'var(--side-length)',
            borderRadius: '14%',
            border: '2.65px solid gray',
            background: 'rgba(250, 250, 249, 0.2)',
            transition: 'transform 250ms ease',
            backdropFilter: 'blur(6px)',
            overflow: 'hidden',
            left: 0,
            '& svg': {
              pointerEvents: 'none',
              width: '100%',
              height: '100%',
            },

            _focus: {
              outlineWidth: '4px',
              outlineStyle: 'solid',
              outlineColor: 'rgba(70, 94, 209)',
            },
          })}
          aria-label={`Puzzle piece ${index + 1}`}
          onClick$={async (e) => {
            const buttonEl = e.target as HTMLButtonElement;
            await swapTiles(index, buttonEl);
          }}
        >
          <Slot />
        </button>
      );
    });

    return (
      <>
        <div
          style={{
            '--opacity': sliderPuzzleStore.isSolving ? '.5' : '1',
          }}
          class={css({
            position: 'relative',
            width: 'full',
            height: 'auto',
            aspectRatio: 1,
            opacity: 'var(--opacity)',
          })}
        >
          <div
            style={{
              '--depth': 3,
              '--grid-gap': '7px',
              '--side-length':
                'calc((100% - var(--grid-gap) * (var(--depth) - 1)) / var(--depth))',
            }}
            class={css({ aspectRatio: 1 })}
            ref={puzzleWrapperSignal}
          >
            {sliderPuzzleStore.showNoSolution && (
              <div
                class={css({
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(23, 23, 23, .5)',
                  zIndex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                })}
              >
                <DSText size="hero">No solution found</DSText>
              </div>
            )}
            <div
              class={cx(
                css({
                  transition: 'filter 1.25s ease 0.5s',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  overflow: 'hidden',
                }),
                'fullPuzzleContainer'
              )}
              style={{
                '--fill': theme.value === 'dark' ? '#fafaf9' : '#171717',
              }}
            >
              <FullLogo
                class={cx(
                  css({
                    width: '100%',
                    height: '100%',
                    opacity: 0.5,
                    transition: 'opacity 1000ms ease',
                  }),
                  'fullPuzzle'
                )}
                onAnimationStart$={() => {
                  sliderPuzzleStore.disableButtons = true;
                }}
                onAnimationEnd$={(e) => {
                  const target = e.target as HTMLElement;
                  const last = !!target.getAttribute('data-last');
                  if (last) {
                    sliderPuzzleStore.showPlayAgainButton = true;
                    sliderPuzzleStore.disableButtons = false;
                  }
                }}
              />
            </div>
            <div
              style={{
                '--visibility': sliderPuzzleStore.isComplete
                  ? 'hidden'
                  : 'visible',
                '--pointer-events': sliderPuzzleStore.isShuffled
                  ? 'initial'
                  : 'none',
              }}
              class={cx(
                css({
                  transition: 'opacity 1000ms ease, visibility 500ms',
                  pointerEvents: 'var(--pointer-events)' as any,
                  visibility: 'var(--visibility)' as any,
                }),
                'puzzleContainer'
              )}
              id="puzzle-container"
              ref={puzzleContainerSignal}
            >
              <PuzzlePiece index={0}>
                <Piece0 />
              </PuzzlePiece>
              <PuzzlePiece index={1}>
                <Piece1 />
              </PuzzlePiece>
              <PuzzlePiece index={2}>
                <Piece2 />
              </PuzzlePiece>
              <PuzzlePiece index={3}>
                <Piece3 />
              </PuzzlePiece>
              <PuzzlePiece index={4}>
                <Piece4 />
              </PuzzlePiece>
              <PuzzlePiece index={5}>
                <Piece5 />
              </PuzzlePiece>
              <PuzzlePiece index={6}>
                <Piece6 />
              </PuzzlePiece>
              <PuzzlePiece index={7}>
                <Piece7 />
              </PuzzlePiece>
            </div>
          </div>
        </div>

        <div
          class={css({
            display: 'flex',
            width: 'full',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            marginTop: '24px',
          })}
        >
          {showUI && (
            <>
              <DSButton
                variant="secondary"
                style={{
                  '--visibility':
                    sliderPuzzleStore.hideSolveButton ||
                    sliderPuzzleStore.isComplete
                      ? 'hidden'
                      : 'visibile',
                }}
                class={css({
                  color: 'text',
                  _hover: {
                    color: 'links.hover',
                  },
                  _disabled: {
                    pointerEvents: 'none',
                  },
                  visibility: 'var(--visibility)' as any,
                })}
                onClick$={() => {
                  sliderPuzzleStore.isSolving = true;
                  solvePuzzle();
                }}
                disabled={sliderPuzzleStore.disableButtons}
              >
                {sliderPuzzleStore.isSolving ? (
                  <LoadingDots class={css({ paddingBlock: '5px' })} />
                ) : (
                  'Solve'
                )}
              </DSButton>
              <DSText
                size="body"
                class={css({
                  color: 'text',
                  position: 'absolute',
                  transform: 'translateX(-50%)',
                  left: '50%',
                })}
              >
                Turns: {sliderPuzzleStore.numTurns}
              </DSText>
              <DSButton
                class={css({
                  width: 'fit-content',
                  _disabled: {
                    opacity: 0.5,
                    pointerEvents: 'none',
                  },
                })}
                variant="primary"
                onClick$={resetState}
                disabled={sliderPuzzleStore.disableButtons}
              >
                {sliderPuzzleStore.showPlayAgainButton
                  ? 'Play again?'
                  : 'Reset'}
              </DSButton>
            </>
          )}
        </div>
      </>
    );
  }
);

export default SliderPuzzle;

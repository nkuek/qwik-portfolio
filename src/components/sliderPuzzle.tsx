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
  useSignal,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { css, cx } from '@styles/css';
import { text } from '@styles/recipes';

const depth = 3;
const numPuzzlePieces = depth ** 2 - 1; // 8
const gridGap = '7px';

type TPuzzleMap = Record<number | 'empty', number>;

function generateInitialBoard(): TPuzzleMap {
  const puzzleMap: TPuzzleMap = { empty: 8 };

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
function shuffleBoard(puzzleMap: TPuzzleMap): TPuzzleMap {
  const copy = { ...puzzleMap };

  for (let i = Object.values(copy).length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    const piece1 = copy[i < 8 ? i : 'empty'];
    const piece2 = copy[j < 8 ? j : 'empty'];

    copy[i < 8 ? i : 'empty'] = piece2;
    copy[j < 8 ? j : 'empty'] = piece1;
  }

  const isUnsolvable = !checkSolvability(copy);

  // keep shuffling the board until it is solvable
  if (isUnsolvable) {
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
function checkSolvability(puzzleMap: TPuzzleMap) {
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
  shuffledBoard: TPuzzleMap;
  restartCounter: number;
  // prevent interacting with the board until the shuffle animation plays
  isShuffled: boolean;
  isComplete: boolean;
  showPlayAgainButton: boolean;
};

const SliderPuzzle = component$(({ noShuffle }: { noShuffle?: boolean }) => {
  const sliderPuzzleStore = useStore<SliderPuzzleStore>({
    numTurns: 0,
    restartCounter: 0,
    isShuffled: false,
    isComplete: false,
    showPlayAgainButton: false,
    shuffledBoard: noShuffle ? initialBoard : shuffleBoard(initialBoard),
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

  // Shuffle animation
  useVisibleTask$(({ track }) => {
    track(() => sliderPuzzleStore.restartCounter);
    if (!puzzleContainerSignal.value) {
      return;
    }
    const tiles = puzzleContainerSignal.value.children;

    setTimeout(() => {
      for (let i = 0; i < tiles.length; i++) {
        const boardTile = sliderPuzzleStore.shuffledBoard[i];

        const tile = tiles[i] as HTMLButtonElement;

        tile.style.transform = translationMatrix[boardTile];
      }

      sliderPuzzleStore.isShuffled = true;
    }, 500);
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
      tileElement.disabled = !isAdjacent;
    }
  });

  useStylesScoped$(`
  .complete {

    & .fullPuzzle {
      opacity: 1;

      & path {
        transition: fill-opacity 1000ms ease, fill 1000ms ease;
        fill: #171717;
        fill-opacity: 1;
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
        class={css({
          position: 'absolute',
          width: 'var(--side-length)',
          height: 'var(--side-length)',
          borderRadius: '14%',
          border: '2.65px solid gray',
          background: 'rgba(211, 214, 233, 0.2)',
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
    <div
      class={css({
        position: 'relative',
        width: 'full',
        height: 'auto',
        aspectRatio: 1,
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
            '--animationState': sliderPuzzleStore.isComplete
              ? 'running'
              : 'paused',
          }}
        >
          <FullLogo
            class={cx(
              css({
                width: '100%',
                height: '100%',
                opacity: 0.5,
                transition: 'opacity 1000ms ease',
                '& g': {
                  '& path:nth-child(1)': {
                    animation: 'translateColorBar 3000ms ease-in',
                    animationPlayState: 'var(--animationState)',
                  },
                  '& path:nth-child(2)': {
                    animation: 'translateColorBar 3000ms ease-in 250ms',
                    animationPlayState: 'var(--animationState)',
                  },
                  '& path:nth-child(3)': {
                    animation: 'translateColorBar 3000ms ease-in 500ms',
                    animationPlayState: 'var(--animationState)',
                  },
                  '& path:nth-child(4)': {
                    animation: 'translateColorBar 3000ms ease-in 750ms',
                    animationPlayState: 'var(--animationState)',
                  },
                },
              }),
              'fullPuzzle'
            )}
            onAnimationEnd$={(e) => {
              const target = e.target as HTMLElement;
              const last = !!target.getAttribute('data-last');
              if (last) {
                sliderPuzzleStore.showPlayAgainButton = true;
              }
            }}
          />
        </div>
        <div
          style={{
            '--visibility': sliderPuzzleStore.isComplete ? 'hidden' : 'visible',
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
      {(sliderPuzzleStore.numTurns > 0 ||
        sliderPuzzleStore.restartCounter > 0) && (
        <span
          class={cx(
            css({
              position: 'absolute',
              bottom: '-40px',
              left: '50%',
              transform: 'translate(-50%)',
              color: 'text',
            }),
            text({
              size: {
                base: 'mobileBody',
                md: 'body',
              },
            })
          )}
        >
          Turns: {sliderPuzzleStore.numTurns}
        </span>
      )}
      {sliderPuzzleStore.showPlayAgainButton && (
        <button
          class={css({
            color: 'text',
            position: 'absolute',
            bottom: '-72px',
            left: '50%',
            transform: 'translate(-50%)',
          })}
          onClick$={() => {
            sliderPuzzleStore.isComplete = false;
            sliderPuzzleStore.showPlayAgainButton = false;
            sliderPuzzleStore.isShuffled = false;
            sliderPuzzleStore.numTurns = 0;
            sliderPuzzleStore.shuffledBoard = shuffleBoard(initialBoard);
            sliderPuzzleStore.restartCounter++;
            puzzleWrapperSignal.value?.classList.remove('complete');
            puzzleContainerSignal.value?.style.setProperty(
              '--visibility',
              'visible'
            );
          }}
        >
          Play again?
        </button>
      )}
    </div>
  );
});

export default SliderPuzzle;

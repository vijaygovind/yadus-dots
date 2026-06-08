import type { Meta, StoryObj } from '@storybook/react-vite'
import { catPuzzle } from '../../data/puzzles/cat'
import { DotCanvas } from './DotCanvas'

const easyDots = catPuzzle.levels.easy.dots

const meta = {
  title: 'Components/DotCanvas',
  component: DotCanvas,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DotCanvas>

export default meta
type Story = StoryObj<typeof meta>

export const Start: Story = {
  args: {
    puzzle: catPuzzle,
    dots: easyDots,
    segments: [],
    expectedNext: 1,
    nextDot: easyDots[0],
    wrongDotN: null,
    highlightNext: false,
    isComplete: false,
    motionEnabled: true,
    onConnect: () => true,
    onWrongAttempt: () => {},
  },
}

export const PartialProgress: Story = {
  args: {
    puzzle: catPuzzle,
    dots: easyDots,
    segments: [{ from: easyDots[0], to: easyDots[1] }],
    expectedNext: 3,
    nextDot: easyDots[2],
    wrongDotN: null,
    highlightNext: false,
    isComplete: false,
    motionEnabled: true,
    onConnect: () => true,
    onWrongAttempt: () => {},
  },
}

export const WrongTap: Story = {
  args: {
    puzzle: catPuzzle,
    dots: easyDots,
    segments: [{ from: easyDots[0], to: easyDots[1] }],
    expectedNext: 3,
    nextDot: easyDots[2],
    wrongDotN: 5,
    highlightNext: true,
    isComplete: false,
    motionEnabled: true,
    onConnect: () => false,
    onWrongAttempt: () => {},
  },
}

export const Completed: Story = {
  args: {
    puzzle: catPuzzle,
    dots: easyDots,
    segments: easyDots.slice(0, -1).map((from, i) => ({ from, to: easyDots[i + 1] })),
    expectedNext: 11,
    nextDot: null,
    wrongDotN: null,
    highlightNext: false,
    isComplete: true,
    motionEnabled: true,
    onConnect: () => true,
    onWrongAttempt: () => {},
  },
}

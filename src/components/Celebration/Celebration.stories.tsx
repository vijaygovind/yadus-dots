import type { Meta, StoryObj } from '@storybook/react-vite'
import { catPuzzle } from '../../data/puzzles/cat'
import { Celebration } from './Celebration'

const meta = {
  title: 'Components/Celebration',
  component: Celebration,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Celebration>

export default meta
type Story = StoryObj<typeof meta>

export const WithConfetti: Story = {
  args: {
    puzzleLabel: catPuzzle.label,
    fillColor: catPuzzle.fillColor,
    outlinePath: catPuzzle.outlinePath,
    motionEnabled: true,
    onPlayAgain: () => {},
    onNextPicture: () => {},
  },
}

export const CalmMode: Story = {
  args: {
    puzzleLabel: catPuzzle.label,
    fillColor: catPuzzle.fillColor,
    outlinePath: catPuzzle.outlinePath,
    motionEnabled: false,
    onPlayAgain: () => {},
    onNextPicture: () => {},
  },
}

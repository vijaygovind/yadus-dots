import type { Meta, StoryObj } from '@storybook/react-vite'
import { catPuzzle } from '../../data/puzzles/cat'
import { PuzzleCard } from './PuzzleCard'

const meta = {
  title: 'Components/PuzzleCard',
  component: PuzzleCard,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof PuzzleCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    puzzle: catPuzzle,
    completed: false,
    onSelect: () => {},
  },
}

export const Completed: Story = {
  args: {
    puzzle: catPuzzle,
    completed: true,
    onSelect: () => {},
  },
}

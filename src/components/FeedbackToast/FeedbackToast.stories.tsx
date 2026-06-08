import type { Meta, StoryObj } from '@storybook/react-vite'
import { FeedbackToast } from './FeedbackToast'

const meta = {
  title: 'Components/FeedbackToast',
  component: FeedbackToast,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="relative h-24 w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FeedbackToast>

export default meta
type Story = StoryObj<typeof meta>

export const TryAgain: Story = {
  args: { message: 'Almost! Try 3' },
}

export const Hidden: Story = {
  args: { message: null },
}

import type { Meta, StoryObj } from '@storybook/react-vite'
import { Buddy } from './Buddy'

const meta = {
  title: 'Components/Buddy',
  component: Buddy,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Buddy>

export default meta
type Story = StoryObj<typeof meta>

export const Idle: Story = {
  args: { expression: 'idle' },
}

export const Encouraging: Story = {
  args: { expression: 'encouraging', message: 'Try again!' },
}

export const Cheering: Story = {
  args: { expression: 'cheering', message: 'Yay Yadu!', size: 'lg' },
}

export const Waving: Story = {
  args: { expression: 'waving', message: "Let's draw a cat!" },
}

export const CalmMode: Story = {
  args: { expression: 'cheering', message: 'Yay!', motionEnabled: false },
}

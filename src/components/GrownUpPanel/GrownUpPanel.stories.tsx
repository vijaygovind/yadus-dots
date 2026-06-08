import type { Meta, StoryObj } from '@storybook/react-vite'
import { DEFAULT_SETTINGS } from '../../types/puzzle'
import { GrownUpPanel } from './GrownUpPanel'

const meta = {
  title: 'Components/GrownUpPanel',
  component: GrownUpPanel,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof GrownUpPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    open: true,
    settings: DEFAULT_SETTINGS,
    onClose: () => {},
    onUpdate: () => {},
    onReset: () => {},
    showReset: true,
  },
}

export const HardMode: Story = {
  args: {
    open: true,
    settings: { ...DEFAULT_SETTINGS, dotLevel: 'hard', calmMode: true },
    onClose: () => {},
    onUpdate: () => {},
    onReset: () => {},
    showReset: true,
  },
}

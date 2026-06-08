let audioContext: AudioContext | null = null

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioContext) {
    audioContext = new AudioContext()
  }
  return audioContext
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.15,
) {
  const ctx = getContext()
  if (!ctx) return

  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()

  oscillator.type = type
  oscillator.frequency.value = frequency
  gain.gain.value = volume

  oscillator.connect(gain)
  gain.connect(ctx.destination)

  const now = ctx.currentTime
  gain.gain.setValueAtTime(volume, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

  oscillator.start(now)
  oscillator.stop(now + duration)
}

export function playConnectSound() {
  playTone(523, 0.12, 'sine', 0.12)
  setTimeout(() => playTone(659, 0.1, 'sine', 0.1), 80)
}

export function playBoopSound() {
  playTone(220, 0.18, 'triangle', 0.1)
}

export function playCelebrationJingle() {
  const notes = [523, 659, 784, 1047]
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.2, 'sine', 0.14), i * 140)
  })
}

export async function resumeAudioContext() {
  const ctx = getContext()
  if (ctx?.state === 'suspended') {
    await ctx.resume()
  }
}

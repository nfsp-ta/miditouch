import { WebMidi } from 'webmidi'
import { ref } from 'vue'

export type OutputDevice = {
  id: string
  name: string
}

export interface IMidiService {
  readonly outputDevices: OutputDevice[]

  refreshDevices(): void
  sendCC(deviceId: string, channel: number, cc: number, value: number): void
}

export class MidiService implements IMidiService {
  private _outputDevices = ref<OutputDevice[]>([])

  constructor() {
    this.refreshDevices()
    WebMidi.addListener('connected', () => this.refreshDevices())
    WebMidi.addListener('disconnected', () => this.refreshDevices())
  }

  sendCC(deviceId: string, channel: number, cc: number, val: number): void {
    try {
      const device = WebMidi.getOutputById(deviceId)
      if (device == null) {
        throw new Error('MIDI device now found')
      }
      device.sendControlChange(cc, val, { channels: channel })
    } catch (err) {
      console.error(err)
    }
  }

  public get outputDevices() {
    return this._outputDevices.value
  }

  public refreshDevices(): void {
    WebMidi.enable({ sysex: true }).then(() => {
      this._outputDevices.value = WebMidi.outputs.map(({ id, name }) => ({ id, name }))
    })
  }
}

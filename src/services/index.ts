import { inject } from 'vue'
import type { InjectionKey } from 'vue'
import type { IMidiService } from './midiService'
import { MidiService } from './midiService'

const midiServiceKey = Symbol() as InjectionKey<IMidiService>

const serviceProvider = {
  get midiService() {
    return inject(midiServiceKey, () => new MidiService(), true)
  },
}

export function injectService<T extends keyof typeof serviceProvider>(
  serviceName: T,
): (typeof serviceProvider)[T] {
  return serviceProvider[serviceName]
}

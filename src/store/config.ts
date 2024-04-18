import { SocketConfig } from '@humeai/voice-embed-react';
import { create } from 'zustand';

interface ConfigStore {
  config: SocketConfig | null;
  setConfig: (config: SocketConfig) => void;
  clearConfig: () => void;
}

export const useConfigStore = create<ConfigStore>()((set) => ({
  config: null,
  setConfig: (config) => set({ config }),
  clearConfig: () => set({ config: null }),
}));

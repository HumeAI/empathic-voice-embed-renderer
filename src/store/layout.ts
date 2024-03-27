import { create } from 'zustand';
import { parentDispatch } from '../utils/parentDispatch';
import {
  COLLAPSE_WIDGET_ACTION,
  EXPAND_WIDGET_ACTION,
  MINIMIZE_WIDGET_ACTION,
  RESIZE_FRAME_ACTION,
  WindowDimensions,
} from '@humeai/voice-embed-react';

export enum LayoutState {
  CLOSED = 'closed',
  OPEN = 'open',
  MINIMIZED = 'minimized',
}

interface LayoutStore {
  state: LayoutState;
  frameSize: WindowDimensions;
  open: () => void;
  setFrameSize: (dimensions: WindowDimensions) => void;
  close: () => void;
}

let timeout: number | undefined = undefined;

const DEFAULT_FRAME_WIDTH = 400;
const FRAME_MARGIN_X = 48;

const DEFAULT_FRAME_HEIGHT = 300;
export const SHORT_FRAME_HEIGHT = 250;
const HEIGHT_BREAKPOINT = 750;

const CLOSED_SIZE = 50;

function getFrameSize(dimensions: WindowDimensions) {
  return {
    width:
      dimensions.width - FRAME_MARGIN_X < DEFAULT_FRAME_WIDTH
        ? dimensions.width - FRAME_MARGIN_X
        : DEFAULT_FRAME_WIDTH,
    height:
      dimensions.height < HEIGHT_BREAKPOINT
        ? SHORT_FRAME_HEIGHT
        : DEFAULT_FRAME_HEIGHT,
  };
}

export const useLayoutStore = create<LayoutStore>()((set, get) => {
  return {
    state: LayoutState.CLOSED,
    frameSize: { width: DEFAULT_FRAME_WIDTH, height: DEFAULT_FRAME_HEIGHT },
    setFrameSize: (parentDimensions: WindowDimensions) => {
      const frameSize = getFrameSize(parentDimensions);
      set({ frameSize });
      const isOpen = get().state === LayoutState.OPEN;
      if (isOpen) {
        parentDispatch(RESIZE_FRAME_ACTION(frameSize));
      } else {
        parentDispatch(
          RESIZE_FRAME_ACTION({
            width: CLOSED_SIZE,
            height: CLOSED_SIZE,
          }),
        );
      }
    },
    open: () => {
      clearTimeout(timeout);
      const frameSize = get().frameSize;
      parentDispatch(RESIZE_FRAME_ACTION(frameSize));
      parentDispatch(EXPAND_WIDGET_ACTION);
      return set({ state: LayoutState.OPEN });
    },
    close: () => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        parentDispatch(
          RESIZE_FRAME_ACTION({
            width: CLOSED_SIZE,
            height: CLOSED_SIZE,
          }),
        );
      }, 300);
      parentDispatch(COLLAPSE_WIDGET_ACTION);
      return set({ state: LayoutState.CLOSED });
    },
    minimize: () => {
      clearTimeout(timeout);
      parentDispatch(
        RESIZE_FRAME_ACTION({
          width: 400,
          height: 50,
        }),
      );
      parentDispatch(MINIMIZE_WIDGET_ACTION);
      return set({ state: LayoutState.CLOSED });
    },
  };
});

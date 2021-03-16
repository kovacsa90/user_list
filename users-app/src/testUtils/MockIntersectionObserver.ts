/* eslint-disable @typescript-eslint/no-empty-function */
export default class MockIntersectionObserver {
  readonly root: Element | null;

  readonly rootMargin: string;

  readonly thresholds: ReadonlyArray<number>;

  constructor() {
    this.root = null;
    this.rootMargin = "";
    this.thresholds = [];
  }

  disconnect = (): void => {};

  observe = (): void => {};

  // eslint-disable-next-line class-methods-use-this
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve = (): void => {};
}

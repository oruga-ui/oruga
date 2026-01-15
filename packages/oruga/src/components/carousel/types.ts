import type { ProviderItem } from "@/composables";

export type CarouselComponent<T> = {
  activeIndex: number;
  indicators: boolean;
  itemWidth: number;
  onClick: (event: Event) => void;
  onDrag: (event: TouchEvent | MouseEvent) => void;
  setActive: (value: T) => void;
};

export type CarouselItemComponent<T> = {
  getValue: () => T;
  activate: (index: number) => void;
  deactivate: (index: number) => void;
};

export type CarouselItem<T> = ProviderItem<CarouselItemComponent<T>>;

export type CarouselComponent = {
    restartTimer: () => void;
    itemWidth: number;
    activeIndex: number;
    onClick: (event: Event) => void;
    setActive: (index: number) => void;
};

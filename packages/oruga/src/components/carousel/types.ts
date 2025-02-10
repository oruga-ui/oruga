export type CarouselComponent = {
    activeIndex: number;
    indicators: boolean;
    total: number;
    itemWidth: number;
    onClick: (event: Event) => void;
    setActive: (index: number) => void;
};

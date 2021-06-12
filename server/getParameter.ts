
export type Input = {
    second: number,
    bottom?: number,
    top?: number,
    increase?: number
    stop?: boolean
}


export default function getParameter(p: Input) {

    const {
        second,
        bottom = -67.5,
        top = 69.4,
        increase = 0,
        stop = false
    } = p;
    if (stop) return 0;
    if (increase) {
        if (increase > 0.5 && increase < 0.75) {
            return (bottom * increase) * Math.cos((Math.PI / 15) * second) + (top * increase);
        }
    }
    return bottom * Math.cos((Math.PI / 15) * second) + top;
};


export type Input = {
    second: number,
    bottom?: number,
    top?: number,
    increase?: number
    stop?: boolean,
    connect?: boolean,
    disconnect?: boolean,

}


function precise(x: number) {
    return Number.parseFloat(x.toString()).toPrecision(4);
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
            return precise(
                (bottom * increase) * Math.cos((Math.PI / 15) * second) + (top * increase));
        }
    }
    return precise(bottom * Math.cos((Math.PI / 15) * second) + top);
};

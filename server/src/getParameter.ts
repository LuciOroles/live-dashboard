
export type Input = {
    second: number,
    bottom?: number,
    top?: number,
    factor?: number
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
        factor = 1,
        stop = false
    } = p;
    if (stop) return 0;

    if (factor > 0.5 && factor <= 1) {
        return precise(
            (bottom * factor) * Math.cos((Math.PI / 15) * second) + (top * factor));
    }
};

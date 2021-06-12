import paramGenerator from '../src/paramGenerator';
describe('paramter generator', () => {
    test('should get a value each time it is called', () => {

        const generator = paramGenerator();
        for (let i = 0; i < 10; i++) {
            expect(Number.isFinite(Number(generator.next({ second: i }).value))).toBeTruthy();
        }
    });

    test('sending stop will force the generator to return 0', () => {
        const generator = paramGenerator();

        const v1 = Number(generator.next({ second: 1 }).value);
        expect(v1).toBeGreaterThan(0);

        const v2 = Number(generator.next({ second: 2, stop: true }).value);
        expect(v2).toEqual(0);

        const v3 = Number(generator.next({ second: 99, stop: false }).value);
        expect(v3).toBeGreaterThan(90);

    })
})
export class Multiset<T> {
    private elements: Map<T, number>;

    constructor() {
        this.elements = new Map<T, number>();
    }

    add(element: T) {
        if (!this.elements.has(element)) {
            this.elements.set(element, 1);
        }
    }

    remove(element: T) {
        if (this.elements.has(element)) {
            const count = this.elements.get(element)!;
            if (count === 1) {
                this.elements.delete(element);
            } else {
                this.elements.set(element, count - 1);
            }
        }
    }

    count(element: T): number {
        return this.elements.get(element) || 0;
    }

    size(): number {
        let total = 0;
        for (const count of this.elements.values()) {
            total += count;
        }
        return total;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    toArray(): T[] {
        const result: T[] = [];
        for (const [element, count] of this.elements.entries()) {
            for (let i = 0; i < count; i++) {
                result.push(element);
            }
        }
        return result;
    }

    *entries(): IterableIterator<[T, number]> {
        for (const [element, count] of this.elements) {
            yield [element, count];
        }
    }

    clear() {
        this.elements.clear();
    }
}
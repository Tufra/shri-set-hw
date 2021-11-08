module.exports = class {
    // реализация

    constructor(props) {
        this.value = makeUnique(props) || []
        this.size = this.value.length


        function makeUnique(arr) {
            if (arr.length > 0) {
                arr.sort((a, b) => a - b)
                let newArr = [arr[0]]
                for (let i = 1; i < arr.length; i++) {
                    if (arr[i] !== arr[i - 1]) {
                        newArr.push(arr[i])
                    }
                }
                return newArr
            }
            return []
        }
    }

    [Symbol.iterator]() {
        return this.value[Symbol.iterator]()
    }

    *keys() {
        yield* this.value.values()

    }

    *values() {
        yield* this.value.values()
        // return this.value[this.value.length - 1]
    }

    *entries() {
        for(let item of this.value.values()) {
            yield [item, item]
        }
        // return [this.value[this.value.length - 1], this.value[this.value.length - 1]]
    }

    add(elem) {
        if (!this.value.includes(elem)) {
            this.value.push(elem)
            this.value.sort((a, b) => a - b)
            this.size++
        }
        return this
    }

    delete(elem) {
        let index = this.value.findIndex((setElem) => setElem === elem)
        if (index !== -1) {
            this.value.splice(index, 1)
            this.size--
        }
        return this
    }

    has(elem) {
        return this.value.includes(elem)
    }

    clear() {
        this.value = []
        this.size = 0
    }

    valueOf() {
        return this
    }

    get [Symbol.toStringTag]() {
        // console.log('bbb')
        return '^_^'
    }

    forEach(cb, data) {
        this.value.forEach(cb, data)
    }

}

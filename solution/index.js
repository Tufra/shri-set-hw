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

    keys() {
        return {
            index: 0,
            arr: this.value,
            [Symbol.iterator]() {
                return {
                    index: 0,
                    arr: this.arr,
                    next() {
                        if (this.arr.length > 0 && this.index < this.arr.length) {
                            return {
                                done: false,
                                value: (this.arr)[this.index++]
                            }
                        } else {
                            return { done: true }
                        }
                    }
                }

            }

        }

    }

    values() {
        return {
            index: 0,
            arr: this.value,
            [Symbol.iterator]() {
                return {
                    index: 0,
                    arr: this.arr,
                    next() {
                        if (this.arr.length > 0 && this.index < this.arr.length) {
                            return {
                                done: false,
                                value: (this.arr)[this.index++]
                            }
                        } else {
                            return { done: true }
                        }
                    }
                }

            }

        }
    }

    entries() {
        return {
            index: 0,
            arr: this.value,
            [Symbol.iterator]() {
                return {
                    index: 0,
                    arr: this.arr,
                    next() {
                        if (this.arr.length > 0 && this.index < this.arr.length) {
                            return {
                                done: false,
                                value: [(this.arr)[this.index],(this.arr)[this.index++]]
                            }
                        } else {
                            return { done: true }
                        }
                    }
                }

            }

        }
    }

    add(elem) {
        if (!this.value.includes(elem)) {
            this.value.push(elem)
            this.value.sort((a, b) => a - b)
            this.size++
        }
        // console.log(this)
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

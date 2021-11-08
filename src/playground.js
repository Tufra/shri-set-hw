class MySet {
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

// тесты
const set = new MySet([4, 8, 15, 4, 15, 16, 8, 23, 42]);

// хранит только уникальные значения
console.log([...set]); // [ 4, 8, 15, 16, 23, 42 ]

// есть свойство size
console.log(set.size); // 6

// работает в цикле for-of
for (const item of set) {
    console.log(item); // 4 8 15 16 23 42
}
console.log('keys')
for (const item of set.keys()) {
    console.log(item); // [ 4, 4 ] [ 8, 8 ] ...
}
console.log('values')
for (const item of set.values()) {
    console.log(item); // [ 4, 4 ] [ 8, 8 ] ...
}
// есть методы keys, values, entries
console.log('entries')
for (const item of set.entries()) {
    console.log(item); // [ 4, 4 ] [ 8, 8 ] ...
}

// есть метод clear
set.clear();
console.log(set.size); // 0

const object = {
    getValue () { return this.value }
}

const data = {
    value: 42
}

// есть метод add
set.add(object);
set.add(data);

// который может работать в цепочке вызовов
set.add(object).add(object).add(object);
console.log(set)

// есть метод delete
set.delete(data);
console.log(set)
// есть метод has
console.log(set.has({})); // false
console.log(set.has(object)); // true
console.log(set.has(data)); // false

// и кое-что еще
console.log(set === set.valueOf()) // true
console.log(String(set)) // [object ^_^]
console.log(Object.prototype.toString.call(set)) // [object ^_^]

// есть forEach, который делает какие-то странные вещи...
set.forEach(function (item) {
    console.log(item.getValue.call(this)); // 42
}, data)

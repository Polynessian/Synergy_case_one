const A = new Array()
const B = getRandomInt(-35, 35)

/* Примеры данных, охватывающие все ветви алгоритма:

A = [-30, 100, 0, 55, -1, 2345]
N = 6
B = 0

A = [-30, 100, 0, 55, -1, 2345]
N = 6
B = -1000 // Произведение чисел будет равно нулю - нулевой множитель

A = [-30, 100, 0, 55, -1, 345]
N = 6
B = 1000

A = [] // Выбросит в исключение, пустой массив
N = -1 // Исключение - Элемент(ы) массива или переданные значения B, N некорректны
B = 0

A = [55, 5, 5, 5, 5, 5]
N = 6
B = 55 // Исключение - не существует элементов, больших заданного числа

A = [-30, -100, -6, -55, -1, -2345] // Вернет "В массиве нет положительных чисел"
N = 6
B = -50 */

/* Заполнение массива случайными числами */

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const N = getRandomInt(1, 20)
let i = 0

do {
    A.push(getRandomInt(-30, 30))
    i += 1
} while (i < N)

if (A.length == 0) {
    throw new Error('Пустой массив')
}

function isAllDigits(arr) {
    return arr.every(el => typeof el === 'number' && isFinite(el));
};

if ((isAllDigits(A) == true) && (/^\d+$/.test(new String(N))) && (/^-?\d+$/.test(new String(B)))) {   
} else {
    throw new TypeError('Элемент(ы) массива или переданные значения B, N некорректны')
}


class FindElement {
    constructor(A, N, B) {
        this.A = A
        this.N = N
        this.B = B
    }

    get getPositiveSum() {
        return this.findSumOfPositiveElements()
    }

    findSumOfPositiveElements() {
        let positiveData = new Array()

        this.A.forEach((el) => {
            if (el > 0) {
                positiveData.push(el)
            } 
        })
    
        let elemQuantity = positiveData.length;
        let sumOfElem = positiveData.reduce(function(a, b) { return a + b}, 0);
        let result;

        result = ((sumOfElem != 0) && (elemQuantity != 0)) 
        ? `Количество положительных элементов: ${elemQuantity}, их сумма ${sumOfElem}` 
        : `0, в массиве нет положительных чисел`
        return result 
    }

    get getSumElemFromB() {
        return this.countSumOfElemFromB()
    }

    countSumOfElemFromB() {
        let arrayB = JSON.parse(JSON.stringify(this.A))
        arrayB.sort((a, b) => {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        });
        
        let elementB = 0;

        /* Проверка на одинаковость */

        if(arrayB.every((element) => element == this.B)) {
            throw new Error('Все числа в массиве одинаковые')
        }
        
        /* Определяем индекс элемента, с которого начнется срез чисел из списка, больших заданного числа B */

        for (let el = 0; el < arrayB.length; el++) {
            if(arrayB[el]> this.B) {
                elementB = arrayB[el]
                break
            } else if(arrayB[el] < arrayB.length - 1) {
                continue
            } else {
                throw new Error('Элементов, больше заданного числа B в массиве нет')
            }
        }

        let spliceArrayB = arrayB.slice(arrayB.indexOf(elementB))

        /* Проверка на наличие нуля среди множителей */
        let multRes = 1

        if (!spliceArrayB.includes(0)) {
            
            if (spliceArrayB.length == 1) {
                multRes = spliceArrayB[0]
            } else {
                for (let s of spliceArrayB) {
                    multRes *= s
                }
            }
        } else {
            multRes = '0, т.к. один или несколько множителей являются нулевыми элементами'
        }

        return `Количество элементов, больших B: ${spliceArrayB.length}, произведение равно: ${multRes}`

    } /* метод*/

} /* class */

const answer = new FindElement(A, N, B)

console.log(answer.getPositiveSum)
console.log(answer.getSumElemFromB)

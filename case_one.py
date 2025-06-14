import re

#import random
#Вариант для заполнения массива случайными значениями
#N = 10
#A = []

#i = 0
#while i < N:
#    item = randint(-100, 100)
#    A.append(item)
#    i += 1
   
#Примеры данных, охватывающие все ветви алгоритма:

#A = [-30, 100, 0, 55, -1, 2345]
#N = 6
#B = 0

#A = [-30, 100, 0, 55, -1, 2345]
#N = 6
#B = -1000 // Произведение чисел будет равно нулю - нулевой множитель

#A = [-30, 100, 0, 55, -1, 345]
#N = 6
#B = 1000

#A = [] // Выбросит в исключение, пустой массив
#N = -1 // Исключение - неверная размерность массива
#B = 0

#A = [55, 5, 5, 5, 5, 5]
#N = 6
#B = 55 // Исключение - не существует элементов, больших заданного числа

#A = [-30, -100, -6, -55, -1, -2345] // Вернет "В массиве нет положительных чисел"
#N = 6
#B = -50

class ExceptFalseCollection(Exception):
    pass


N = input("Размерность массива(Целое положительное число): ")
B = input("Элемент B(Целое число): ")

if not re.match(r'^\d+(\.\d+)?$', str(N)) or not re.match(r'^-?\d+(\.\d+)?$', str(B)):
    raise ExceptFalseCollection('Элемент не является числом')

print("Элементы массива поочередно(Числа): ")

A = [input() for x in range(int(N))]

for wrong_element in A:
    if not re.match(r'^-?\d+(\.\d+)?$', str(wrong_element)):
        raise ExceptFalseCollection('В качестве элемента массива передано не число')

    
class FindElement:
    def __init__(self, A):
        self.A = A
    
    def find_positive_sum(self):
        # Выделяем список положительных чисел из массива
        if self.A:
            positive_data = [int(x) for x in self.A if int(x) > 0]
            quantity = len(positive_data)
            sum_elements = sum(positive_data)
            
            return sum_elements, quantity if sum_elements and quantity else '0, в массиве нет положительных чисел'
        else:
            raise ExceptFalseCollection('Передан пустой список или неверно указана размерность массива')
         
    def sort_by_B(self, B):
        array_B = sorted(map(int, self.A))
        element_B = 0
        
        #Проверка на одинаковость:
        if all(map(lambda x: x == int(B), array_B)):
            raise ExceptFalseCollection('Элементов, больше заданного числа B в массиве нет, все элементы равны')
        
        # Определяем индекс элемента, с которого начнется срез чисел из списка, больших заданного числа B
        for el in array_B:
            if el > int(B) :
                element_B = array_B.index(el)
                break
            elif array_B.index(el) < (len(array_B) - 1):
                continue
            else:
                raise ExceptFalseCollection('Элементов, больше заданного числа B в массиве нет')
        
        splice_array_B = array_B[element_B:]
        
        
        #Проверка на наличие нуля среди множителей
        if 0 not in splice_array_B:
            result = 1
            if len(splice_array_B) == 1:
                result = splice_array_B[0]
            else: 
                for s in splice_array_B:
                    result *= s
        else:
            result = '0, т.к. один или несколько множителей являются нулевыми элементами'
        
        return len(splice_array_B), result
        
        
answer_1 = FindElement(A)
answer_2 = answer_1.sort_by_B(B)

print(f'Сумма положительных чисел: {answer_1.find_positive_sum()[0]}, их количество: {answer_1.find_positive_sum()[1]}')
print(f'Количество элементов, больших заданного числа B: {answer_2[0]}, произведение равно {answer_2[1]}')

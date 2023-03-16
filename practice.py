def mergeSort(myList):
    if len(myList) <= 1:
        return myList

    mid = len(myList) // 2
    left = myList[:mid]
    right = myList[mid:]

    left_sorted = mergeSort(left)
    right_sorted = mergeSort(right)

    return merge(left_sorted, right_sorted)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result += left[i:]
    result += right[j:]
    return result


print(mergeSort([1,5,4,321,213,321,32,1,41]))

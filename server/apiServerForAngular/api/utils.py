def bisector_left(array, value):
    lo = 0
    hi = len(array)
    while lo < hi:
        mid = lo + hi >> 1
        if array[mid] > value:
            hi = mid
        elif array[mid] == value:
            return mid
        else:
            lo = mid + 1

    return mid



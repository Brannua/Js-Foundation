/**
 * @desc 选择排序
 */
function selectionSort(arr) {
  for (let i = 0, len = arr.length, temp; i < len; i ++) {

    let minIdx = 0,
      min = arr[minIdx];
      
    for (let j = i + 1; j < len; j ++) {
      if (arr[j] < min) {
        minIdx = j
        min = arr[minIdx]
      }
    }

    temp = arr[i]
    arr[i] = min
    arr[minIdx] = temp

    console.log(arr);

  }
  return arr
}

console.log(selectionSort([12, 3, 42, 14, -1, 10, -10, 6, 34, 14]));
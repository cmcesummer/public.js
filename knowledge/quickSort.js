function quick(arr) {
    const middle = arr[0];
    let i = 1,
        arrayLeft = [],
        arrayRight = [],
        length = arr.length;
    if (length == 1) {
        return [middle];
    }
    for (; i < length; i++) {
        const item = arr[i];
        if (item <= middle) {
            arrayLeft.push(item);
        } else {
            arrayRight.push(item);
        }
    }

    return arrayLeft.length === 0
        ? [middle].concat(quick(arrayRight))
        : arrayRight.length === 0
            ? quick(arrayLeft).concat(middle)
            : quick(arrayLeft).concat(middle, quick(arrayRight));
}

function realQuick(arr) {
    const middle = arr[0];
    let i = 1,
        j = arr.length - 1,
        arrayLeft = [],
        arrayRight = [];

    if (j <= 0) {
        return [middle];
    }

    while (i <= j) {
        const itemLeft = arr[i];
        if (itemLeft <= middle) {
            arrayLeft.push(itemLeft);
        } else {
            arrayRight.push(itemLeft);
        }
        if (i === j) {
            break;
        }
        const itemRight = arr[j];
        if (itemRight <= middle) {
            arrayLeft.push(itemRight);
        } else {
            arrayRight.push(itemRight);
        }
        i++;
        j--;
    }
    return arrayLeft.length === 0
        ? [middle].concat(realQuick(arrayRight))
        : arrayRight.length === 0
            ? realQuick(arrayLeft).concat(middle)
            : realQuick(arrayLeft).concat(middle, realQuick(arrayRight));
}

function pop(arr) {
    let i = 0,
        lengthi = arr.length,
        j,
        lengthj,
        middle;
    for (; i < lengthi; i++) {
        j = 0;
        lengthj = lengthi - i;
        for (; j < lengthj - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                middle = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = middle;
            }
        }
    }
    return arr;
}

function stepOne(arr, left, right) {
    const indexItem = arr[left];
    while (left < right) {
        while (left < right && arr[right] > indexItem) {
            right--;
        }
        if (left < right) {
            arr[left++] = arr[right];
        }

        while (left < right && arr[left] <= indexItem) {
            left++;
        }
        if (left < right) {
            arr[right--] = arr[left];
        }
    }
    arr[left] = indexItem;
    return left;
}
function sortA(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        let item = stepOne(arr, left, right);
        sortA(arr, left, item - 1);
        sortA(arr, item + 1, right);
    }
    return arr;
}

function quickTrue(array, start = 0, end = array.length - 1) {
    if (start < end) {
        let left = start,
            right = end;
        const middle = array[left];
        while (left < right) {
            if (left < right && array[right] > middle) {
                right--;
            }
            if (left < right) {
                array[left++] = array[right];
            }
            if (left < right && array[left] <= middle) {
                left++;
            }
            if (left < right) {
                array[right--] = array[left];
            }
        }
        array[left] = middle;
        quickTrue(array, start, left - 1);
        quickTrue(array, left + 1, end);
    }
}

;(function() {
	let bigArray = [],
            i = 0,
            arrC = [],
            arrsortA = [],
            arrquickTrue = [],
            arrD = [];
        for (; i < 2000000; i++) {
            bigArray.push(Math.random() * 200000);
        }
        console.time("quick");
        quick(bigArray);
        console.timeEnd("quick");

        console.time("realQuick");
        realQuick(bigArray);
        console.timeEnd("realQuick");

        $.extend(true, arrsortA, bigArray);
        console.time("sortA");
        sortA(arrsortA);
        console.timeEnd("sortA");

        $.extend(true, arrquickTrue, bigArray);
        console.time("quickTrue");
        quickTrue(arrquickTrue);
        console.timeEnd("quickTrue");

        $.extend(true, arrC, bigArray);
        console.time("sort");
        arrC.sort((a, b) => a - b);
		console.timeEnd("sort");
		
		$.extend(true, arrD, bigArray);
        console.time("pop");
        pop(arrD);
        console.timeEnd("pop");
})();


/**
 * 数据量小的时候看不出什么 ， sort更有优势
 * 但是数据量大的时候， 快排是挺快的
 */ 
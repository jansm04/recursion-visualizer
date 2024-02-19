var templates = new Map();

templates.set("custom", {
        name: "Custom",
        code: 
`def fun():
    # write your code here



fun() # make sure you call the function`
    });

templates.set("fibonacci", {
    name: "Fibonacci",
    code:
`def fun(n):
    if n == 0 or n == 1:
        return 1
    return fun(n - 1) + fun(n - 2)

fun(5) # make sure you call the function`
});

templates.set("fibonacci-memo", {
    name: "Fibonacci w/ Memoization",
    code:
`memo = {}
def fun(n):
    if n == 0 or n == 1:
        return 1
    if n not in memo:
        memo[n] = fun(n - 1) + fun(n - 2)
    return memo[n]

fun(5) # make sure you call the function`
});

templates.set("binomial-coefficient", {
    name: "Binomial Coefficient", 
    code: 
`# given a set of n elements, how many different  
# subsets of k elements can we make
def fun(n, k):
    if (k == 0 or n == k):
        return 1

    return fun(n-1, k-1) + fun(n-1, k)

fun(5, 2) # make sure you call the function`
});

templates.set("coin-change", {
    name: "Coin Change",
    code:
`# given a set of coins, what is the minimum 
# number coins required to sum up to n cents
coins = [1,3,4,5]
def fun(n):
    if (n == 0): return 0
    if (n < 0): return float('inf')
    ans = float('inf')
    for coin in coins:
        ans = min(ans, 1 + fun(n - coin))
    return ans

fun(3) # make sure you call the function`
});

templates.set("fast-power", {
    name: "Fast Power",
    code: 
`def fun(a, n):
    if (n == 0):
        return 1
    if (n % 2 == 0):
        return fun(a*a, n/2)
    return a * fun(a*a, (n-1)/2)

fun(2, 5) # make sure you call the function`
});

templates.set("qsort", {
    name: "Quicksort",
    code: 
`def qsort(array):
    if len(array) <= 1:
        return array

    less, equal, greater = [], [], []
    pivot = array[0]
    for x in array:
        if x < pivot: less.append(x)
        elif x == pivot: equal.append(x)
        elif x > pivot: greater.append(x)

    return qsort(less) + equal + qsort(greater) 

qsort([5, 11, 3, 7, 1, 4, 2, 9, 12, 6, 0, 8]) # make sure to call the function`
});

export { templates }
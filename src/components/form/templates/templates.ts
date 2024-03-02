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
`def fib(n):
    if n == 0 or n == 1:
        return 1
    return fib(n - 1) + fib(n - 2)

fib(5) # make sure you call the function`
});

templates.set("fibonacci-memo", {
    name: "Fibonacci w/ Memoization",
    code:
`memo = {}
def fib(n):
    if n == 0 or n == 1:
        return 1
    if n not in memo:
        memo[n] = fib(n - 1) + fib(n - 2)
    return memo[n]

fib(5) # make sure you call the function`
});

templates.set("factorial", {
    name: "Factorial",
    code: 
`def fact(n):
    if n == 0:
        return 1

    return n * fact(n-1)

fact(5) # make sure you call the function`
})

templates.set("binomial-coefficient", {
    name: "Binomial Coefficient", 
    code: 
`# given a set of n elements, how many different  
# subsets of k elements can we make
def binco(n, k):
    if (k == 0 or n == k):
        return 1

    return binco(n-1, k-1) + binco(n-1, k)

binco(5, 2) # make sure you call the function`
});

templates.set("coin-change", {
    name: "Coin Change",
    code:
`# given a set of coins, what is the minimum 
# number coins required to sum up to n cents
coins = [1,2,3]
def coin_change(n):
    if (n == 0): return 0
    if (n < 0): return float('inf')
    ans = float('inf')
    for coin in coins:
        ans = min(ans, 1 + coin_change(n - coin))
    return ans

coin_change(4) # make sure you call the function`
});

templates.set("coin-change-memo", {
    name: "Coin Change w/ Memoization",
    code:
`# given a set of coins, what is the minimum 
# number coins required to sum up to n cents
coins = [1,2,3]
memo = {}
def coin_change(n):
    if (n == 0): return 0
    if (n < 0): return float('inf')
    if n not in memo:
        ans = float('inf')
        for coin in coins:
            ans = min(ans, 1 + coin_change(n - coin))
        memo[n] = ans
    return memo[n]

coin_change(7) # make sure you call the function`
})

templates.set("fast-power", {
    name: "Fast Power",
    code: 
`def fast_pow(a, n):
    if (n == 0):
        return 1
    if (n % 2 == 0):
        return fast_pow(a*a, n/2)
    return a * fast_pow(a*a, (n-1)/2)

fast_pow(2, 5) # make sure you call the function`
});

templates.set("permutations", {
    name: "String Permutations",
    code: 
`# find all the permutations of a string
def permute(prev, curr): 
    if(len(curr) == 0):
        return [prev]
    perms = []
    for i in range(len(curr)):
        perms += permute(prev+curr[i], curr[:i] + curr[i+1:])
    return perms
 
permute('', 'abc') # make sure to call the function`
})

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

unsorted = [5, 11, 3, 7, 1, 4, 2, 9, 12, 6, 0, 8]
qsort(unsorted) # make sure to call the function`
});

export { templates }
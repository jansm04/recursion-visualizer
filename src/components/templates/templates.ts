var templates = new Map();

templates.set("custom", {
        name: "Custom",
        code: 
`def fun(): # do NOT change this line
    # write your code here



fun() # make sure you call the function`
    });

templates.set("fibonacci", {
    name: "Fibonacci",
    code:
`def fun(n): # do NOT change this line
    if n == 0 or n == 1:
        return 1
    return fun(n - 1) + fun(n - 2)

fun(5) # make sure you call the function`
});

templates.set("fibonacci-memo", {
    name: "Fibonacci w/ Memoization",
    code:
`memo = {}
def fun(n): # do NOT change this line
    if n == 0 or n == 1:
        return 1
    if n not in memo:
        memo[n] = fun(n - 1) + fun(n - 2)
    return memo[n]

fun(5) # make sure you call the function`
});

templates.set("coin-change", {
    name: "Coin Change",
    code:
`coins = [1,3,4,5]
def fun(n): # do NOT change this line
    if (n == 0): return 0
    if (n < 0): return float('inf')
    ans = float('inf')
    for coin in coins:
        ans = min(ans, 1 + fun(n - coin))
    return ans

fun(3) # make sure you call the function`
})

var keys = new Array();
keys.push("custom");
keys.push("fibonacci");
keys.push("fibonacci-memo");
keys.push("coin-change");

export {
    templates,
    keys
}
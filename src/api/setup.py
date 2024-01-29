
# "map = {}\\n"
# maps parameter to node
# a node is defined as (rv, children)
# where 
#   rv = return value
#   children = list of child parameters
map = "qTY8eDfs9 = {}\\n"


t = """\\n# fibonacci sequence\\ndef fun(num):\\n    if (n == 0 or n == 1):\\n        return 1\\n    else:\\n        return fun(n-1) + fun(n-2)\\nprint("Result: " + str(fun(4)))"""


def insert_lines(code, rv, tab, start, end):
    var_line = tab + "jB2h3dCi1 = " + rv + "\\n"
    map_line = tab + "qTY8eDfs9[n] = (jB2h3dCi1, True, [])\\n"
    return_line = tab + "return " + "jB2h3dCi1"

    start = code[:start]
    end = code[end:]
    code = start + var_line + map_line + return_line + end

    # number of characters inserted
    s = len(var_line) + len(map_line) + len(return_line) - 7 - len(rv) - len(tab)

    return (code, s)


def find_returns(code):
    keyword = "return "
    n = len(keyword)
    indices = []
    i = 0
    while i+n < len(code):
        if code[i:i+n] == keyword:
            indices.append(i)
        i += 1
    return indices

# edit every return statement so we replace
#   return <return_value>
# with
#   a = <return_value>
#   map[n] = (a, [<p1>, ... ,<pn>])
#   return a
def edit_returns(code, indices):
    for i in range(len(indices)):
        idx = indices[i]
        tab = ""
        j = idx
        while j >= 0 and code[j-2:j] != "\\n": 
            tab = tab + " "
            j -= 1
        
        rv = ""
        k = idx+7
        print(len(tab))
        while k+2 < len(code) and code[k:k+2] != "\\n":
            rv += code[k]
            k += 1
        print(rv)
        c = insert_lines(code, rv, tab, j, k);
        code, s = c[0], c[1]

        for l in range(len(indices)):
            if (l > i):
                indices[l] += s
    
    return code
        

def setup(code):
    indices = find_returns(code)
    code = edit_returns(code, indices)
    code = map + code
    print(code)

setup(t)

import extract as ex


# "map = {}\\n"
# maps parameter to node
# a node is defined as (rv, children)
# where 
#   rv = return value
#   children = list of child parameters
map = "qTY8eDfs9 = {}\\n"

# print(map)
printMapLine = """print(qTY8eDfs9)"""


# replace
#  return <return_value>
# with
#   a = <return_value>
#   map[n] = (a, [<p1>, ... ,<pn>])
#   return a
def insert_lines(code, rv, tab, start, end, recursiveArgs):
    tempVarLine = tab + "jB2h3dCi1 = " + rv + "\\n"
    mapLine = tab + "qTY8eDfs9[n] = (jB2h3dCi1, [" + recursiveArgs + "])\\n"
    returnLine = tab + "return " + "jB2h3dCi1"

    start = code[:start]
    end = code[end:]
    code = start + tempVarLine + mapLine + returnLine + end

    # add 7 to count 'return' keyword itself and space
    originalReturnLen = len(tab) + 7 + len(rv)

    # number of characters inserted
    s = len(tempVarLine) + len(mapLine) + len(returnLine) - originalReturnLen
    return (code, s)


# find all return statements in recursive function 
# and return their places in the code
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

# go through recursive function and edit every return 
# statement so we store the return value in a map 
# before we return the value
def edit_returns(code, indices, recursiveArgs):
    for i in range(len(indices)):
        idx = indices[i]
        tab = ""
        j = idx
        while j >= 0 and code[j-2:j] != "\\n": 
            tab = tab + " "
            j -= 1
        
        rv = ""
        k = idx+7
        while k+2 < len(code) and code[k:k+2] != "\\n":
            rv += code[k]
            k += 1
        # replace return statement with map lines
        c = insert_lines(code, rv, tab, j, k, recursiveArgs);
        code, s = c[0], c[1]
        for l in range(len(indices)):
            if (l > i):
                indices[l] += s
    
    return code
        

def setup(code):
    indices = find_returns(code)
    recursiveArgs = ex.extract(code)
    code = edit_returns(code, indices, recursiveArgs)
    code = map + code
    return code

# setup(t)
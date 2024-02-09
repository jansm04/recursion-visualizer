import extract as ex


# "map = {}\\n"
# maps parameter to node
# a node is defined as (rv, children)
# where 
#   rv = return value
#   children = list of child arguments
mapInitLine = "qTY8eDfs9 = {}\\n"

# "count = 0"
# initializes the count for the number of function calls
countInitLine = "b7Hy4dv3A = 0\\n"

# print(map)
printMapLine = "print(qTY8eDfs9)"


# replaces
#   return <return_value>
# with
#   a = <return_value>
#   map[n] = (a, [<arg1>, ... ,<argn>], isBaseCase)
#   return a
def insert_return_lines(code, rv, tab, start, end, recursiveArgs):
    tempVarLine = tab + "jB2h3dCi1 = " + rv + "\\n"
    mapLine = tab + "qTY8eDfs9[n] = (jB2h3dCi1, [" + recursiveArgs + "], fV42hUijP == b7Hy4dv3A)\\n"
    returnLine = tab + "return " + "jB2h3dCi1"

    start = code[:start]
    end = code[end:]
    code = start + tempVarLine + mapLine + returnLine + end

    # add 7 to count 'return' keyword itself and space
    originalReturnLen = len(tab) + 7 + len(rv)

    # number of characters inserted
    s = len(tempVarLine) + len(mapLine) + len(returnLine) - originalReturnLen
    return (code, s)


# finds all return statements in recursive function and returns 
# their places in the code
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

# goes through recursive function and edits every return statement so we 
# store the return value in a map before we return the value
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
        c = insert_return_lines(code, rv, tab, j, k, recursiveArgs)
        code, s = c[0], c[1]
        for l in range(len(indices)):
            if (l > i):
                indices[l] += s
    
    return code


# inserts map initialization and count initialization before 
# the recursive function
def insert_initializations(code):
    return mapInitLine + countInitLine + code


# goes through the code and inserts the global count declaration, the counter  
# increment and the temp variable initialization right below the function   
# header. the temp variable is initialized to the count value so we can   
# compare their values in the return statement and determine if the function  
# call returns a base case 
# 
# the insert looks like this:
# 
#    def fun(n, ...):
#        global count
#        count += 1  
#        temp = count
#        ...
# 

def insert_counter_lines(code):
    globalDecLine = "    global b7Hy4dv3A\\n"          # "global count"
    counterIncLine = "    b7Hy4dv3A += 1\\n"           # "count += 1"
    tempInitLine = "    fV42hUijP = b7Hy4dv3A\\n\\n"   # "temp = count"
    
    header = "\\ndef fun"
    n = len(header)
    i = 0
    # traverse to function header
    while i+n < len(code) and code[i:i+n] != header:
        i += 1
    i += n
    # traverse to end of line
    while i+2 < len(code) and code[i:i+2] != "\\n":
        i += 1
    i += 2
    start = code[:i]
    end = code[i:]

    return start + globalDecLine + counterIncLine + tempInitLine + end


# inserts print statement after the function call
def insert_print_line(code):
    return code + printMapLine


        

def setup(code):
    indices = find_returns(code)
    extracts = ex.extract(code)
    recursiveArgs, initalArg = extracts[0], extracts[1]

    # replace return statement with custom return lines
    code = edit_returns(code, indices, recursiveArgs)

    # make necessary insertions
    code = insert_initializations(code)
    code = insert_counter_lines(code)
    code = insert_print_line(code)

    return (code, initalArg)
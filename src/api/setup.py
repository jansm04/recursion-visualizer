import extract as ex


# "callMap = {}\\n"
# maps parameter to node
# a node is defined as (rv, children)
# where 
#   rv = return value
#   children = list of child arguments
mapInitLine = "qTY8eDfs9 = {}\\n"

# "levelsMap = {}"
# initializes the levelsMap so we can map each level to a list of arguments at that 
# level in the recursion tree. once we backtrack to each parent level, (after all 
# the recursive calls in the function) we can use the arguments in the list for the 
# level above to set the child arguments in the call map
levelsMapInitLine = "cFV43ghEo = {}\\n"

# "count = 0"
# initializes the count for the number of function calls
countInitLine = "b7Hy4dv3A = 0\\n"

# "level = -1"
# initializes the level variable, which can be used to access the current level in 
# the recursion tree at each function call
levelInitLine = "hG5yU321X = -1\\n"

# levelsMap[level+1] = []
levelZeroListInitLine = "cFV43ghEo[hG5yU321X+1] = []\\n\\n"

# "print(map)"
printMapLine = "print(qTY8eDfs9)"

# replaces
#   return <return_value>
# with
#   a = <return_value>
#   isMemoized = n in callMap and temp == count and not callMap[n][2]
#   childArgs = levelsMap[level+1] if n not in callMap else callMap[n][1] -- so memoization can't override
#   callMap[n] = (a, childArgs, temp == count, isMemoized)
#   levelsMap[level+1] = []
#   level -= 1
#   return a
def insert_return_lines(code, rv, tab, start, end):
    tempVarLine = tab + "jB2h3dCi1 = " + rv + "\\n"
    memoLine = tab + "d4fHj8KaC = n in qTY8eDfs9 and fV42hUijP == b7Hy4dv3A and not qTY8eDfs9[n][2]\\n"
    childArgsLine = tab + "hV4g09iPs = cFV43ghEo[hG5yU321X+1] if n not in qTY8eDfs9 else qTY8eDfs9[n][1]\\n"
    callMapLine = tab + "qTY8eDfs9[n] = (jB2h3dCi1, hV4g09iPs, fV42hUijP == b7Hy4dv3A, d4fHj8KaC)\\n"
    levelsMapLine = tab + "cFV43ghEo[hG5yU321X+1] = []\\n"
    levelDecLine = tab + "hG5yU321X -= 1\\n"
    returnLine = tab + "return " + "jB2h3dCi1"

    start = code[:start]
    end = code[end:]
    linesToInsert = tempVarLine + memoLine + childArgsLine + callMapLine + levelsMapLine + levelDecLine + returnLine
    code = start + linesToInsert + end

    # add 7 to count 'return' keyword itself and space
    originalReturnLen = len(tab) + 7 + len(rv)

    # number of characters inserted
    s = len(linesToInsert) - originalReturnLen
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
        c = insert_return_lines(code, rv, tab, j, k)
        code, s = c[0], c[1]
        for l in range(len(indices)):
            if (l > i):
                indices[l] += s
    
    return code


# inserts map initialization and count initialization before 
# the recursive function
def insert_initializations(code):
    return mapInitLine + levelsMapInitLine + countInitLine + levelInitLine + levelZeroListInitLine + code


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
# 
#        global level
#        level += 1
#        if level+1 not in levelsMap: 
#            levelsMap[level+1] = []
#        levelsMap[level].append(n) 
#        ...
# 
def insert_globals(code):
    # count variable lines
    globalCountLine = "    global b7Hy4dv3A\\n"        
    counterIncLine = "    b7Hy4dv3A += 1\\n"           
    tempInitLine = "    fV42hUijP = b7Hy4dv3A\\n\\n"   
    # levels map lines
    globalLevelLine = "    global hG5yU321X\\n"                      
    levelIncLine = "    hG5yU321X += 1\\n"                           
    conditionalMapLine = "    if hG5yU321X+1 not in cFV43ghEo:\\n"   
    listInitLine = "        cFV43ghEo[hG5yU321X+1] = []\\n"          
    listAppendLine = "    cFV43ghEo[hG5yU321X].append(n)\\n\\n"

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

    countLines = globalCountLine + counterIncLine + tempInitLine
    levelsMapLines = globalLevelLine + levelIncLine + conditionalMapLine + listInitLine + listAppendLine
    return start + countLines + levelsMapLines + end


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
    code = insert_globals(code)
    code = insert_print_line(code)

    return (code, initalArg)
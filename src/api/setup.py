import extract as ex
import check as ck

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

# replaces
#   return <return_value>
# with
#   a = <return_value>
#   isMemoized = key in callMap and temp == count and not callMap[key][2]
#   childArgs = levelsMap[level+1] if key not in callMap else callMap[key][1] -- so memoization can't override
#   callMap[key] = (a, childArgs, temp == count, isMemoized)
#   levelsMap[level+1] = []
#   level -= 1
#   return a
def insert_return_lines(code, rv, indent, start, end):
    tempVarLine = indent + "jB2h3dCi1 = " + rv + "\\n"
    memoLine = indent + "d4fHj8KaC = v7yG8jN2x in qTY8eDfs9 and fV42hUijP == b7Hy4dv3A and (not qTY8eDfs9[v7yG8jN2x][2] or qTY8eDfs9[v7yG8jN2x][3])\\n"
    childArgsLine = indent + "hV4g09iPs = cFV43ghEo[hG5yU321X+1] if v7yG8jN2x not in qTY8eDfs9 else qTY8eDfs9[v7yG8jN2x][1]\\n"
    callMapLine = indent + "qTY8eDfs9[v7yG8jN2x] = (jB2h3dCi1, hV4g09iPs, fV42hUijP == b7Hy4dv3A, d4fHj8KaC)\\n"
    levelsMapLine = indent + "cFV43ghEo[hG5yU321X+1] = []\\n"
    levelDecLine = indent + "hG5yU321X -= 1\\n"
    returnLine = indent + "return " + "jB2h3dCi1"

    start = code[:start]
    end = code[end:]
    linesToInsert = tempVarLine + memoLine + childArgsLine + callMapLine + levelsMapLine + levelDecLine + returnLine
    code = start + linesToInsert + end

    # add 7 to count 'return' keyword itself and space
    originalReturnLen = len(indent) + 7 + len(rv)

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
    inComment, inString = False, False
    stack = []
    while i+n < len(code):

        # handle comments and strings
        result = ck.checkCodeAtIdx(code, i, inComment, inString, stack)
        inComment, inString, stack = result[0], result[1], result[2]

        if not inComment and not inString and code[i:i+n] == keyword:
            indices.append(i)
        i += 1
    return indices

 # returns true if the return statement is on the same line as a condition
def has_line_break(code, idx):
    while idx-2 >= 0:
        if code[idx] == ':':
            return True
        if code[idx-2:idx] == "\\n":
            return False
        idx -= 1
    return False

# goes through recursive function and edits every return statement so we 
# store the return value in a map before we return the value
def edit_returns(code, indices):
    for i in range(len(indices)):
        idx = indices[i]
        indent = ""
        j, k = idx, 0
        # insert a line break and increase the indent in the conditional statement by one more tab
        if has_line_break(code, idx):
            while j >= 0 and code[j-2:j] != "\\n":
                j -= 1
            while code[j] == " ":
                indent += code[j]
                j += 1
            start = code[:idx-1]
            end = code[idx:]
            lineBreak = "\\n" + indent + "    "
            code = start + lineBreak + end
            j = idx+1
            k += len(lineBreak)-1
            indent += "    "
            # update indices for remaining return statements in the code
            for l in range(len(indices)):
                if (l > i):
                    indices[l] += len(lineBreak)-1
        else:
            while j >= 0 and code[j-2:j] != "\\n": 
                indent = indent + " "
                j -= 1
        
        rv = ""
        k += idx+7
        while k+2 < len(code) and code[k:k+2] != "\\n":
            rv += code[k]
            k += 1
        # replace return statement with map lines
        c = insert_return_lines(code, rv, indent, j, k)
        code, s = c[0], c[1]
        # update indices for remaining return statements in the code
        for l in range(len(indices)):
            if (l > i):
                indices[l] += s
    
    return code


# inserts map initialization and count initialization before 
# the recursive function
def insert_initializations(code):
    return  mapInitLine + levelsMapInitLine + countInitLine + levelInitLine + levelZeroListInitLine + code


# goes through the code and inserts the global count declaration, the counter  
# increment and the temp variable initialization right below the function   
# header. the temp variable is initialized to the count value so we can   
# compare their values in the return statement and determine if the function  
# call returns a base case 
# 
# the insert looks like this:
# 
#    def fun(arg1, ...):
#        key = str((arg1, ...))
# 
#        global count
#        count += 1  
#        temp = count
# 
#        global level
#        level += 1
#        if level+1 not in levelsMap: 
#            levelsMap[level+1] = []
#        levelsMap[level].append(key)
# 
#        if level > 6: print('invalid')
#        ...
# 
def insert_globals(code, fnName, params):
    # key line - converts the param(s) to a string that is used as a key in the call map
    keyLine = "    v7yG8jN2x = str((" + params + "))\\n\\n"
    # call count lines
    globalCountLine = "    global b7Hy4dv3A\\n"        
    counterIncLine = "    b7Hy4dv3A += 1\\n"           
    tempInitLine = "    fV42hUijP = b7Hy4dv3A\\n\\n"   
    # levels map lines
    globalLevelLine = "    global hG5yU321X\\n"                      
    levelIncLine = "    hG5yU321X += 1\\n"                           
    conditionalMapLine = "    if hG5yU321X+1 not in cFV43ghEo:\\n"   
    listInitLine = "        cFV43ghEo[hG5yU321X+1] = []\\n"          
    listAppendLine = "    cFV43ghEo[hG5yU321X].append(v7yG8jN2x)\\n\\n"
    # depth checker
    depthCheckLine = "    if hG5yU321X > 6: print('h6Bv1yO2n')\\n\\n"
    # infinite loop checker
    infLoopCheckLine = "    if b7Hy4dv3A > 100:\\n"
    infLoopPrintLine = "        print('j7Kbx9p1s')\\n"
    emptyReturnLine = "        return\\n\\n"

    header = "\\ndef " + fnName
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
    infLoopCheckLines = infLoopCheckLine + infLoopPrintLine + emptyReturnLine
    return start + keyLine + countLines + levelsMapLines + depthCheckLine + infLoopCheckLines + end


# inserts lines to print map as a table
# the insert looks like this:
# 
#     for key in callMap:
#         children = ""
#         for child in callMap[key][1]: children += child + ";"
#         print(key + "|" + str(callMap[key][0]) + "|" + children + "|" + str(callMap[key][2]) + "|" + str(callMap[key][3]) + "|")
# 
# this will print a table where each value is seperated using a '|' delimeter.
# as the child arguments are in an array, they are also seperated by an additional ';' delimeter
# 
# for example, if we were to call fun(5) where fun(n) returns the nth fibonacci number,
# this would be the table printed out:
# 
#       1|1||True|False|
#       0|1||True|False|
#       2|2|1;0;|False|False|
#       3|3|2;1;|False|False|
#       4|5|3;2;|False|False|
#       5|8|4;3;|False|False|
# 
def insert_print_line(code):
    loopLine = "for yG7iJ8s2a in qTY8eDfs9:\n"
    childrenInitLine = "    children = \"\"\n"
    childrenAppenderLine = "    for child in qTY8eDfs9[yG7iJ8s2a][1]: children += child + \";\"\n"
    printMapLine = "    print(yG7iJ8s2a + \"|\" + str(qTY8eDfs9[yG7iJ8s2a][0]) + \"|\" + children + \"|\" + str(qTY8eDfs9[yG7iJ8s2a][2]) + \"|\" + str(qTY8eDfs9[yG7iJ8s2a][3]) + \"|\")\n"
    return code + loopLine + childrenInitLine + childrenAppenderLine + printMapLine


# setup the code so that we can map all of the function calls to their
# return value, recursive call arguments, base case boolean variable and 
# memoization boolean variable
def setup(code):
    indices = find_returns(code)
    extracts = ex.extract(code)
    fnName, params = extracts[0], extracts[1]

    # replace return statement with custom return lines
    code = edit_returns(code, indices)

    # make necessary insertions
    code = insert_initializations(code)
    code = insert_globals(code, fnName, params)
    code = insert_print_line(code)

    return code
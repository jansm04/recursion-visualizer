# check code at index to see if we are entering or exiting a comment or a string
def checkCodeAtIdx(code, idx, inComment, inString, stack):

    # always reset inComment to false at each new line
    if code[idx:idx+2] == '\\n':
        inComment = False

    # check if we are entering or exiting a string
    # keep track using a stack
    if (code[idx] == '\'' or code[idx] == '\"') and (idx == 0 or (idx > 0 and code[idx-1] != '\\')):
        if len(stack) == 0:
            stack.append(code[idx])
            inString = True

        elif stack[len(stack)-1] == code[idx]:
            stack.pop()
            if len(stack) == 0:
                inString = False
        
        else:
            stack.append(code[idx])

    # if we are in a comment
    if not inString and code[idx] == '#':
        inComment = True

    return (inComment, inString, stack)
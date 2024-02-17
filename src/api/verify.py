
# goes through the code and makes sure there aren't any issues
def verify(code):

    print("CODE IN VERIFY: \n" + code)
    defKeys = ["\\ndef ", " def "]
    i = 0
    defCount = 0
    inComment, inString = False, False
    stack = []

    while i+len(defKeys[0]) < len(code):

        # always reset inComment to false at each new line
        if code[i:i+2] == '\\n':
            inComment = False

        # check if we are entering or exiting a string
        # keep track using a stack
        if (code[i] == '\'' or code[i] == '\"') and (i == 0 or (i > 0 and code[i-1] != '\\')):
            if len(stack) == 0:
                stack.append(code[i])
                inString = True

            elif stack[len(stack)-1] == code[i]:
                stack.pop()
                if len(stack) == 0:
                    inString = False
            
            else:
                stack.append(code[i])

        if not inString and code[i] == '#':
            inComment = True

        # if we have a valid function definiton
        if not inComment and not inString and (code[i:i+len(defKeys[0])] == defKeys[0] or code[i:i+len(defKeys[1])] == defKeys[1]):
            defCount += 1
            if defCount > 1:
                return (False, "Make sure only one function is defined.")
    
        i += 1
    
    return (True, "All good here")
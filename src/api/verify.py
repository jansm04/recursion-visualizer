import check as ck

# goes through the code and makes sure there aren't any issues
def verify(code):

    print("CODE IN VERIFY: \n" + code)
    defKeys = ["\\ndef ", " def "]
    i = 0
    defCount, indentCount = 0, 0
    inComment, inString, inIndent = False, False, False
    stack = []

    while i+len(defKeys[0]) < len(code):

        if i >= 2 and code[i-2:i] == '\\n':
            inIndent = True
            indentCount = 0
        
        # once we exit an indent we need to verify that it was a multiple of 4 spaces
        if inIndent:
            if code[i] != ' ':
                if indentCount % 4 != 0 and i+2 < len(code) and code[i:i+2] != '\\n':
                    return (False, "You gotta fix your indents.")
                else:
                    indentCount = 0
                    inIndent = False
            else:
                indentCount += 1
            

        # handle comments and strings
        result = ck.checkCodeAtIdx(code, i, inComment, inString, stack)
        inComment, inString, stack = result[0], result[1], result[2]

        # if we have a valid function definiton
        if not inComment and not inString and (code[i:i+len(defKeys[0])] == defKeys[0] or code[i:i+len(defKeys[1])] == defKeys[1]):
            defCount += 1
            if defCount > 1:
                return (False, "Make sure only one function is defined.")
    
        i += 1
    
    return (True, "All good here")
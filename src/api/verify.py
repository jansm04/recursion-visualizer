import check as ck

# goes through the code and makes sure there aren't any issues
def verify(code):

    print("CODE IN VERIFY: \n" + code)
    defKeys = ["\\ndef ", " def "]
    i = 0
    defCount = 0
    inComment, inString = False, False
    stack = []

    while i+len(defKeys[0]) < len(code):

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
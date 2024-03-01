def parseCode(code):
    # trim 'b' in the beginning and "'" wrapping the string
    code = code[2:]
    code = code[:-1]
    # add \n at end of code
    code = "\\n" + code + "\\n"
    return code
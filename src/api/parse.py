
def parseCode(code):
    # trim 'b' in the beginning and "'" wrapping the string
    code = code[2:-1]
    # replace all "\\n" with "\n"
    code = code.replace("\\\\n", "\\n")
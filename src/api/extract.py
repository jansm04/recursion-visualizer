# extract the function name from the
# function header
def extract_fn_name(code):
    fnName, keyword = "", "def "
    i = 0
    while i < len(code):
        if (code[i:i+4] == keyword):
            break
        i += 1

    i += 4
    while i < len(code) and code[i] != '(':
        fnName += code[i]
        i += 1
    return fnName

# go through code after function header and 
# find each recursive function call. at each 
# call, extract the arguments and save them 
# to a string
def extract_recursive_args(code, fnName):
    recursiveArgs, insideFnIndicator = "", "\\n    "
    i = 0
    # skip function header
    while i < len(code) and code[i] != ":":
        i += 1
    i += 1
    while i+len(fnName) < len(code):
        if code[i:i+2] == "\\n" and code[i:i+6] != insideFnIndicator:
            break
        if code[i:i+len(fnName)] == fnName:
            while i < len(code) and code[i] != '(':
                i += 1
            i += 1
            while i < len(code) and code[i] != ')':
                recursiveArgs += code[i]
                i += 1
            i += 1
            recursiveArgs = recursiveArgs + ", "
        else:
            i += 1
    
    if len(recursiveArgs) > 0:
        recursiveArgs = recursiveArgs[:-2]
    return recursiveArgs


def extract(code):
    fnName = extract_fn_name(code)
    recursiveArgs = extract_recursive_args(code, fnName)
    return recursiveArgs
# extracts the function name from the function header
def extract_fn_name(code):
    fnName, keyword = "", "def "
    i, keyword_len = 0, len(keyword)
    while i < len(code):
        if (code[i:i+keyword_len] == keyword):
            break
        i += 1

    i += keyword_len
    while i < len(code) and code[i] != '(':
        fnName += code[i]
        i += 1
    return fnName

# extracts the parameters of the recursive function so we can later 
# create a map of function calls using the parameters as the map key
def extract_params(code, fnName):
    params, keyword = "", "def " + fnName
    i, n = 0, len(keyword)
    while i+n < len(code) and code[i:i+n] != keyword:
        i += 1
    i += n
    while i < len(code) and code[i] != '(':
        i += 1
    i += 1
    while i < len(code) and code[i] != ')':
        params += code[i]
        i += 1
    return params


# goes through code and extracts the arg(s) passed to the 
# intial function call
def extract_initial_args(code, fnName):
    initialArgs, keyword = "", "\\n" + fnName
    i, n = 0, len(keyword)
    while i+n < len(code) and code[i:i+n] != keyword:
        i += 1
    i += n
    while i < len(code) and code[i] != '(':
        i += 1
    i += 1
    while i < len(code) and code[i] != ')':
        initialArgs += code[i]
        i += 1
    argsInKeyForm = "(" + initialArgs + ")"
    return argsInKeyForm


def extract(code):
    fnName = extract_fn_name(code)
    params = extract_params(code, fnName)
    initialArg = extract_initial_args(code, fnName)
    return (initialArg, fnName, params)
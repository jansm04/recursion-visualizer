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

# goes through code and extracts the arg passed to the 
# intial function call
def extract_initial_arg(code, fnName):
    initialArg, keyword = "", "\\n" + fnName
    n = len(keyword)
    i = 0
    while i+n < len(code) and code[i:i+n] != keyword:
        i += 1
    i += n
    while code[i] != '(':
        i += 1
    i += 1
    while code[i] != ')':
        initialArg += code[i]
        i += 1
    return initialArg


def extract(code):
    fnName = extract_fn_name(code)
    initialArg = extract_initial_arg(code, fnName)
    return (initialArg, fnName)
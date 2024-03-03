import check as ck

# extracts the function name from the function header
def extract_fn_name(code):
    fnName, keyword = "", "def "
    i, keyword_len = 0, len(keyword)
    inComment, inString = False, False
    stack = []

    while i < len(code):

        # handle comments and strings
        result = ck.checkCodeAtIdx(code, i, inComment, inString, stack)
        inComment, inString, stack = result[0], result[1], result[2]

        if not inComment and not inString and code[i:i+keyword_len] == keyword:
            break
        i += 1

    i += keyword_len
    while i < len(code) and code[i] not in ['(', ' ']:
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


# extracts the text describing the error in the code
def extract_err_message(errorText):
    keyword = "NameError: "
    i, n = 0, len(keyword)
    while i+n < len(errorText) and errorText[i:i+n] != keyword:
        i += 1
    i += n
    message = errorText[i:-1]
    print(message)
    return message


def extract(code):
    fnName = extract_fn_name(code)
    params = extract_params(code, fnName)
    return (fnName, params)
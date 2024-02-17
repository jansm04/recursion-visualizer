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

def extract_fn_name(code):
    name, keyword = "", "def "
    i = 0
    while i < len(code):
        if (code[i:i+4] == keyword):
            break
        i += 1

    i += 4
    while i < len(code) and code[i] != '(':
        name += code[i]
        i += 1
    return name

def extract_params(code, fn_name):
    params = ""
    i = 0
    # skip function header
    while i < len(code) and code[i] != ":":
        i += 1
    i += 1
    while i+len(fn_name) < len(code):
        if code[i:i+len(fn_name)] == fn_name:
            while i < len(code) and code[i] != '(':
                i += 1
            i += 1
            while i < len(code) and code[i] != ')':
                params += code[i]
                i += 1
            i += 1
            params = params + ", "
        else:
            i += 1
    
    if len(params) > 0:
        params = params[:-2]
    return params

def extract(code):
    fn_name = extract_fn_name(code)
    params = extract_params(code, fn_name)
    return params
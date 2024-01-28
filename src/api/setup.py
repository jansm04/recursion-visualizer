
map = """map = {}\n"""
# maps parameter to node
# a node is defined as (rv, isBase, children)
# where 
#   rv = return value
#   isBase = boolean indicating if function returns base case
#   children = list of child parameters (if not base case)

def find_function_name(code):
    name = ""
    keyword = "\\ndef "
    inComment = found = False

    i = 0
    while i < len(code):
        if inComment:
            if code[i:i+1] != "\\n":
                inComment = False
        else:
            if (code[i] == '#'):
                inComment = True
            elif (code[i:i+6] == keyword):
                found = True
                break
        i += 1

    if not found:
        return False
    i += 6
    while i < len(code) and code[i] != '(':
        name += code[i]
        i += 1
    return name
       
            
def setup(code):
    code = map + code

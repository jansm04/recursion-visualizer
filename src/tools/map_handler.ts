import Call from "../interfaces/call";

/** 
 * Transforms the string recieved from the backend to a Map object. 
 * Each entry in the Map represents a function call. 
 * 
 * The key of each entry is the argument passed to the function call. 
 * 
 * The value of each entry is a Call object consisting of the function call's return 
 * value, the arguments passed to its recursive function calls, and a boolean variable 
 * indicating if the call returns a base case.
*/
export default function toMap(responseText: string): Map<string, Call> {
    var map = new Map<string, Call>();
    var i = 2; // start at first key
    while (i < responseText.length) {

        // extract key
        var keyExtract = "";
        while (responseText[i+1] != ':' && i < responseText.length-1)
            keyExtract += responseText[i++];
        i += 4;

        // extract return value
        var returnExtract = "";
        while (responseText[i] != ',' && i < responseText.length)
            returnExtract += responseText[i++];
        i += 4;

        // extract child arguments
        var childrenExtract = new Array<string>();
        if (responseText[i-1] == ']') {
            i += 2;
        } else {
            while (i < responseText.length-1) {
                var childString = "";
                if (responseText[i] == '(') {
                    while (responseText[i-1] != ')')
                        childString += responseText[i++];
                } else {
                    while (responseText[i+1] != ',' && responseText[i+1] != ']')
                        childString += responseText[i++];
                }
                childrenExtract.push(childString);
                if (responseText[i+1] == ']') 
                    break;
                else
                    i += 4
            }
            i += 4
        }
        

        // extract base case variable
        var isBaseCaseExtract
        if (responseText[i] == 'T') {
            isBaseCaseExtract = true;
            i += 6
        } else {
            isBaseCaseExtract = false;
            i += 7
        }

        // extract memoization variable
        var isMemoizedExtract
        if (responseText[i] == 'T') {
            isMemoizedExtract = true;
            i += 8
        } else {
            isMemoizedExtract = false;
            i += 9
        }

        // create map entry
        map.set(keyExtract, {
            rv: returnExtract,
            children: childrenExtract,
            isBaseCase: isBaseCaseExtract,
            isMemoized: isMemoizedExtract
        });
    }
    return map;
}
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
    var i = 1;
    while (i < responseText.length && responseText[i] != '}') {

        // extract key
        var keyExtract = "";
        while (responseText[i] != ':')
            keyExtract += responseText[i++];
        i += 3;

        // extract return value
        var returnExtract = "";
        while (responseText[i] != ',')
            returnExtract += responseText[i++];
        i += 3;

        // extract child arguments
        var childrenExtract = new Array<string>();
        while (responseText[i] != ']') {
            var childString = "";
            while (responseText[i] != ',' && responseText[i] != ']')
                childString += responseText[i++];
            if (responseText[i] == ',') 
                i += 2;
            childrenExtract.push(childString);
        }
        i += 3

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
            i += 7
        } else {
            isMemoizedExtract = false;
            i += 8
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
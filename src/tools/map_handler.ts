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
    var i = 0; // start at first key
    while (i < responseText.length) {

        // extract key
        var keyExtract = "";
        while (responseText[i] != '|')
            keyExtract += responseText[i++];
        i++;

        // extract return value
        var returnExtract = "";
        while (responseText[i] != '|')
            returnExtract += responseText[i++];
        i++;

        // extract children
        var childrenExtract = new Array<string>();
        while (responseText[i] != '|') {
            // extract child
            var childExtract = "";
            while (responseText[i] != ';')
                childExtract += responseText[i++];
            i++;
            childrenExtract.push(childExtract)
        }
        i++;

        // extract base case boolean
        var isBaseCaseExtract = responseText[i] == 'T';
        while (responseText[i++] != '|');

        // extract memoization boolean
        var isMemoizedExtract = responseText[i] == 'T';
        while (responseText[i++] != '|');

        // create map entry
        map.set(keyExtract, {
            rv: returnExtract,
            children: childrenExtract,
            isBaseCase: isBaseCaseExtract,
            isMemoized: isMemoizedExtract
        });
        i++;
    }
    return map;
}
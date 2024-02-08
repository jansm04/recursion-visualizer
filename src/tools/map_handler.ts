import Call from "../interfaces/call";

/** 
 * Transforms the string recieved from the backend to a Map object. 
 * Each entry in the Map represents a function call. The key of each 
 * entry is the argument passed to the function call. The value of 
 * each entry is a Call object consisting of the function call's return 
 * value and the arguments passed to its recursive function calls.
*/
export default function toMap(responseText: string): Map<string, Call> {
    var map = new Map<string, Call>();
    var i = 1;
    while (i < responseText.length && responseText[i] != '}') {
        var keyString = "";
        while (responseText[i] != ':')
            keyString += responseText[i++];
        i += 3;
        var returnString = "";
        while (responseText[i] != ',')
            returnString += responseText[i++];
        i += 3;
        var children = new Array<string>();
        while (responseText[i] != ']') {
            var childString = "";
            while (responseText[i] != ',' && responseText[i] != ']')
                childString += responseText[i++];
            if (responseText[i] == ',') 
                i += 2;
            children.push(childString);
        }
        map.set(keyString, {
            rv: returnString,
            children: children
        });
        i += 4;
    }
    return map;
}
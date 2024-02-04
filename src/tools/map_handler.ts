import Call from "../interfaces/call";

/** 
 * Transforms the string recieved from the backend to a Map object. 
 * Each entry in the Map represents a function call. The key of each 
 * entry is the argument passed to the function call. The value of 
 * each entry is a Call object consisting of the function call's return 
 * value and the arguments passed to its recursive function calls.
*/
export default function toMap(responseText: string): Map<number, Call> {
    var map = new Map<number, Call>();
    var i = 1;
    while (i < responseText.length && responseText[i] != '}') {
        var keyString = "";
        while (responseText[i] != ':')
            keyString += responseText[i++];
        var keyNumber = Number.parseInt(keyString);
        i += 3;
        var returnString = "";
        while (responseText[i] != ',')
            returnString += responseText[i++];
        var returnNumber = Number.parseInt(returnString);
        i += 3;
        var children = new Array<number>();
        while (responseText[i] != ']') {
            var childString = "";
            while (responseText[i] != ',' && responseText[i] != ']')
                childString += responseText[i++];
            var childNumber = Number.parseInt(childString);
            if (responseText[i] == ',') 
                i += 2;
            children.push(childNumber);
        }
        map.set(keyNumber, {
            rv: returnNumber,
            children: children
        });
        i += 4;
    }
    return map;
}
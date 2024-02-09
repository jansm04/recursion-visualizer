interface Call {
    rv: string,
    children: string[],
    isBaseCase: boolean,
    isMemoized: boolean
};

export default Call;
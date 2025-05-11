const setFirstCharUpperCase = (input: string = "") => {
    if (!input) return input;
    const firstChar = input[0]?.toUpperCase();
    const remaingString = input.slice(1, input.length);
    return firstChar + remaingString;
}

export default { setFirstCharUpperCase }
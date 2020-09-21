export const allValuesInArrayAreTrue = (booleanList: boolean[]): boolean => {
    return booleanList.reduce((prev: boolean, curr: boolean) => {
        if (prev === false) {
            return false;
        }
        return curr;
    }, true);
};

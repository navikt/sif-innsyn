export const allValuesInArrayAreTrue = (booleanList: boolean[]) => {
    return booleanList.reduce((prev: boolean, curr: boolean) => {
        if (prev === false) {
            return false;
        }
        return curr;
    }, true);
};

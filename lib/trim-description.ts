const trimDescription = (description: string) => {
    if (description === undefined) {
        return;
    }
    if (description.length < 500) {
        return description;
    }

    return description.substring(0, 500);
};

export { trimDescription };

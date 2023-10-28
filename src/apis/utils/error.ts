export const ErrorMsg = (err: any) => {
    if (err instanceof Error) return err;
    return new Error(String(err));
};

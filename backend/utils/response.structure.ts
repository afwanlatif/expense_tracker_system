export const responseStructure = (
  status: number,
  message: string,
  data?: any
) => {
  return {
    status,
    message,
    data,
  };
};

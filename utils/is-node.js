export const isNode = () => {
  try {
    return (
      Object.prototype.toString.call(global.process) === "[object process]"
    );
  } catch (e) {
    return false;
  }
};

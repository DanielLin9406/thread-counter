import { useThreadPool } from "./useThreadPool";

export const List = () => {
  const current = useThreadPool();
  console.log(current);
  return <>{current}</>;
};

export const Item = () => {
  return <div></div>;
};

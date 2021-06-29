import { useEffect, useState } from "react";
import ThreadPool from "../libs/lib";

export const initState = {
  threads: {
    current: null,
    processed: [],
    taskList: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateTaskList":
      return {
        ...state,
      };
    default:
      return state;
  }
};
export const useThreadPool = () => {
  const [state, setState] = useState([]);
  useEffect(() => {
    const pool = new ThreadPool(2);
    pool.addTask("task1");
    pool.addTask("task2");
    pool.addTask("task3");
    const callbackProcessed = (index, current, processed, taskList) => {
      setState(index);
    };
    pool.assignTasks(callbackProcessed);
    return () => {};
  }, []);
  return state;
};

// return prevCurrentRef.current;
// };

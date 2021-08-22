import { useEffect, useReducer, useRef } from "react";
import ThreadPool from "../libs/lib";
// import { useData } from "./useData";
export const initState = {
  // currentThread: {
  //   currentTask: null,
  //   processed: [],
  // },
  instance: null,
  taskList: [],
  threads: {
    0: {
      currentTask: null,
      threadIndex: 0,
      processed: [],
    },
  },
};

const reducer = (state, action) => {
  let pool = null;
  switch (action.type) {
    case "updateCurrentTask":
      return {
        ...state,
        taskList: [...action.payload.taskList],
        threads: {
          ...state.threads,
          [action.payload.curentThreadIndex]: {
            ...state.threads[action.payload.curentThreadIndex],
            threadIndex: action.payload.curentThreadIndex,
            currentTask: action.payload.currentTask,
          },
        },
      };
    case "updateProcessed":
      return {
        ...state,
        taskList: [...action.payload.taskList],
        threads: {
          ...state.threads,
          [action.payload.curentThreadIndex]: {
            ...state.threads[action.payload.curentThreadIndex],
            currentTask: null,
            threadIndex: action.payload.curentThreadIndex,
            processed: action.payload.processed,
          },
        },
      };
    case "addTask":
      if (pool) {
        return {
          ...state,
          taskList: [...state.taskList, action.payload.task],
        };
      } else {
        return {
          ...state,
        };
      }
    case "setInstance":
      return {
        ...state,
        instance: null,
      };
    case "setCallBack":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const useThreadPool = (threadNum) => {
  const poolRef = useRef(null);
  // const handleThreadPool = (e) => {};
  useEffect(() => {
    poolRef.current = new ThreadPool(3);
    // poolRef.current.addEventListener("click", handleThreadPool);
  }, [poolRef]);
  return poolRef;
};

export const useThread = (poolRef) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const clickRef = useRef(null);
  useEffect(() => {
    if (poolRef && poolRef.current) {
      const poolRefCurr = poolRef.current;
      poolRefCurr.addTask("task1");
      poolRefCurr.addTask("task2");
      poolRefCurr.addTask("task3");
      poolRefCurr.addTask("task4");
      poolRefCurr.addTask("task5");
      poolRefCurr.addTask("task6");
      poolRefCurr.addTask("task7");
      poolRefCurr.addTask("task8");
      poolRefCurr.addTask("task9");

      const handleAddTask = (e) => {
        e.preventDefault();
        poolRefCurr.addTask("task10");
        dispatch({
          type: "addTask",
          payload: {
            task: "task10",
          },
        });
      };
      clickRef.current.addEventListener("click", handleAddTask);
      const callbackProcessed = (
        threadIndex,
        currentTask,
        processed,
        taskList
      ) => {
        // Dealing current task
        if (currentTask) {
          dispatch({
            type: "updateCurrentTask",
            payload: {
              curentThreadIndex: threadIndex,
              currentTask: currentTask,
              taskList: taskList,
            },
          });
        }
        // finish task and push into processed queue
        if (processed) {
          dispatch({
            type: "updateProcessed",
            payload: {
              curentThreadIndex: threadIndex,
              processed: processed,
              taskList: taskList,
            },
          });
        }
      };
      poolRefCurr.assignCallback(callbackProcessed);
      poolRefCurr.executeThread();
    }
    return () => {};
  }, [poolRef]);
  return { state, clickRef };
};

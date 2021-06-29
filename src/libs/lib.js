function ThreadPool(size) {
  this.threads = [];
  this.tasks = [];
  for (let i = 0; i < size; i++) {
    this.threads.push(new Thread(i));
  }
}
ThreadPool.prototype.assignTasks = function (callback, task) {
  if (this.threads.length > 0) {
    for (let ithread = 0; ithread < this.threads.length; ithread++) {
      this.threads[ithread].run(this.tasks, callback);
    }
  } else {
    this.tasks.push(task);
  }
};
ThreadPool.prototype.addTasks = function (tasks) {
  this.tasks.push([...tasks]);
};

ThreadPool.prototype.addTask = function (task) {
  this.tasks.push(task);
};

ThreadPool.prototype.readProcessedRecords = function () {
  const arr = [];
  for (let ithread = 0; ithread < this.threads.length; ithread++) {
    arr.push(this.threads[ithread].readProcessedRecord());
  }
  return arr;
};

function Thread(threadIndex) {
  this.threadIndex = threadIndex;
  this.processed = [];
  this.current = 0;
}

Thread.prototype.run = async function (taskList, callback) {
  const randomDelay = Math.floor((Math.random() + 0.5) * 100) * 10;
  let current = this.current;
  let processed = this.processed;
  function dealWithTasksPromise(delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const value = taskList.shift();
        current = value;
        resolve(current);
      }, delay);
    });
  }
  function addTaskProcessedPromise(current) {
    return new Promise((resolve) => {
      setTimeout(() => {
        processed.push(current);
        resolve(processed);
      }, 0);
    });
  }
  while (taskList.length > 0) {
    current = await dealWithTasksPromise(randomDelay);
    callback(this.threadIndex, current, "", taskList);
    processed = await addTaskProcessedPromise(current);
    callback(this.threadIndex, "", processed, taskList);
  }
  this.processed = processed;
};

module.exports = ThreadPool;

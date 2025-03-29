const TASK_LIST = [{
  id: 1, name: "查阅指南",

}, {
  id: 2, name: "编写功能"
}]

async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const fetchTasks = async (): Promise<typeof TASK_LIST> => {
  return delay(2000).then(() => TASK_LIST)
}

type Task = {
  id: number
  name: string
}

export const addTask = (task: Task): Promise<void> => {
  return delay(1000).then(() => {
    TASK_LIST.push(task)
  })
}

export default class Service {
  tasks = [];
  id = 0;
  getTasks = () => {
    this.tasks = [...JSON.parse(localStorage.getItem('tasks'))];
    this.tasks = this.tasks === [] ? [] : this.tasks;
    return this.tasks;
  };
  addItem = (payload) => {
    this.tasks = this.tasks.filter((item) => {
      return item.statusTask !== 'progress';
    });
    this.tasks.push({ id: ++this.id, ...payload });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  };
  deleteItem = (payload) => {
    this.tasks = this.tasks.filter(item => {
      return item.taskName !== payload;
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  };
  addProgressTask = (payload) => {
    this.tasks = [...this.tasks, payload];
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  };
  generateTask = (payload) => {
    this.tasks = payload;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  };
}
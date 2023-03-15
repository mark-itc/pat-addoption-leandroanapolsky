let tasksCollection;

module.exports = class TasksDAO {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      tasksCollection = await connection.collection("tasks");
    } catch (e) {
      console.log("error", error);
    }
  }
};

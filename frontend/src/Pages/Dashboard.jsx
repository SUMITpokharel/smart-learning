import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [taskCategories, setTaskCategories] = useState([]);
  const [month, setMonth] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [taskData, setTaskData] = useState([]);
  const [taskVsDoneData, setTaskVsDoneData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [pieChartData1, setPieChartData1] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [reminderData, setReminderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/helper/length", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      setReminders(res.data.data.reminders);
      setTasks(res.data.data.tasks);
      setTeachers(res.data.data.teachers);
      setNotes(res.data.data.notes);

      const categoriesData = await axios.get(
        "http://localhost:3000/api/category",
        {
          withCredentials: true,
        }
      );
      setTaskCategories(categoriesData.data.data);

      // Process tasks and reminders data
      const groupedTasks = processTasks(res.data.data.tasks);
      const groupedReminders = processReminders(res.data.data.reminders);

      setTaskData(groupedTasks.taskCountsByMonth);
      setTaskVsDoneData(groupedTasks.taskCountsByMonthAndStatus);
      setReminderData(groupedReminders.reminderCountsByMonthAndStatus);
    };

    fetchData();
  }, []);

  const processTasks = (tasks) => {
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const month = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ][date.getMonth()];
      const day = date.getDate();
      return `${day}-${month}`;
    };

    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

    const groupedTasks = tasks.reduce((acc, task) => {
      const month = formatDate(task.date).split("-")[1];
      const status = task.status;

      if (!acc[month]) acc[month] = { tasks: [], count: 0 };
      if (!acc[month][status]) acc[month][status] = { tasks: [], count: 0 };

      acc[month][status].tasks.push(task);
      acc[month].tasks.push(task);
      acc[month].count++;
      acc[month][status].count++;

      return acc;
    }, {});

    const taskCountsByMonth = Object.keys(groupedTasks).map((month) => [
      month,
      groupedTasks[month].count,
    ]);
    taskCountsByMonth.unshift(["month", "tasks"]);

    const taskCountsByMonthAndStatus = Object.keys(groupedTasks).reduce(
      (acc, month) => {
        const completedCount = groupedTasks[month].completed
          ? groupedTasks[month].completed.count
          : 0;
        const pendingCount = groupedTasks[month].pending
          ? groupedTasks[month].pending.count
          : 0;
        acc.push([month, completedCount, pendingCount]);
        return acc;
      },
      []
    );
    taskCountsByMonthAndStatus.unshift(["month", "completed", "pending"]);

    return { taskCountsByMonth, taskCountsByMonthAndStatus };
  };

  const processReminders = (reminders) => {
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const month = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ][date.getMonth()];
      const day = date.getDate();
      return `${day}-${month}`;
    };

    const groupedReminders = reminders.reduce((acc, reminder) => {
      const month = formatDate(reminder.date).split("-")[1];
      const complete = reminder.status;

      if (!acc[month]) acc[month] = {};
      if (!acc[month]["complete"]) acc[month]["complete"] = [];
      if (!acc[month]["incomplete"]) acc[month]["incomplete"] = [];

      if (complete === "pending") {
        acc[month]["complete"].push(reminder);
      } else {
        acc[month]["incomplete"].push(reminder);
      }

      return acc;
    }, {});

    const reminderCountsByMonthAndStatus = Object.keys(groupedReminders).reduce(
      (acc, month) => {
        const completeCount = groupedReminders[month]["complete"]
          ? groupedReminders[month]["complete"].length
          : 0;
        const incompleteCount = groupedReminders[month]["incomplete"]
          ? groupedReminders[month]["incomplete"].length
          : 0;
        const total = completeCount + incompleteCount;
        acc.push([month, completeCount, incompleteCount, total]);
        return acc;
      },
      []
    );

    reminderCountsByMonthAndStatus.unshift([
      "month",
      "completed",
      "incomplete",
      "total",
    ]);

    return { reminderCountsByMonthAndStatus };
  };

  const getPendingTasksCount = () =>
    tasks.filter((task) => task.status === "pending").length;
  const getPendingRemindersCount = () =>
    reminders.filter((reminder) => reminder.status === "pending").length;

  const handleSearchTask = async () => {
    const data = { month, categoryId };
    const response = await axios.post(
      "http://localhost:3000/api/task/my-task-filter",
      data, {
        withCredentials: true,
      }
    );

    const filterdTaskVsComArray = [
      [month, "Pending", "Completed", "Incomplete"],
      [
        response.data.category,
        response.data.pending,
        response.data.completed,
        response.data.incomplete,
      ],
    ];

    const filterCount = [
      ["Month", "Task"],
      [
        month,
        response.data.pending +
          response.data.completed +
          response.data.incomplete,
      ],
    ];

    setTaskVsDoneData(filterdTaskVsComArray);
    setTaskData(filterCount);

    const chartData = [
      ["Month", "Task"],
      ["Pending", response.data.pending],
      ["Completed", response.data.completed],
      ["Incomplete", response.data.incomplete],
    ];

    setPieChartData(chartData);
  };

  // eslint-disable-next-line no-unused-vars
  const handleFilterByMonth = async () => {
    const data = { month };
    const filteredTask = await axios.post(
      "http://localhost:3000/api/task/my-task-filter-monthly",
      data, {
        withCredentials: true,
      }
    );
    const filteredTask1 = await axios.post(
      "http://localhost:3000/api/task/my-task-filter-monthly-category",
      data, {
        withCredentials: true,
      }
    );

    const chartData = [
      ["Month", "Task"],
      ["Pending", filteredTask.data.pending],
      ["Completed", filteredTask.data.completed],
      ["Incomplete", filteredTask.data.incomplete],
    ];

    setPieChartData(chartData);

    const categoriesData = filteredTask1.data.categoriesData.map(
      (categoryData) => {
        const categoryName = taskCategories.find(
          (category) => category.id === categoryData.category
        ).name;
        return [categoryName, categoryData.count];
      }
    );

    const chartData1 = [["Category", "Task Count"], ...categoriesData];
    setPieChartData1(chartData1);
  };

  
  // eslint-disable-next-line no-unused-vars
  const handleFilterByCategory = async () => {
    const data = { categoryId };
    const response = await axios.post(
      "http://localhost:3000/api/task/my-task-filter-category",
      data, {
        withCredentials: true,
      }
    );
    console.log(response);
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Row>
            <Col md={6}>
              <Card
                className="text-center text-white p-3"
                style={{ backgroundColor: "#003366" }}
              >
                <p className="h4 mb-0">{tasks.length}</p>
                <span>Total Task</span>
              </Card>
            </Col>
            <Col md={6}>
              <Card
                className="text-center text-white p-3"
                style={{ backgroundColor: "#003366" }}
              >
                <p className="h4 mb-0">{getPendingTasksCount()}</p>
                <span>Todo Task</span>
              </Card>
            </Col>
            <Col md={6}>
              <Card
                className="text-center text-white p-3"
                style={{ backgroundColor: "#003366" }}
              >
                <p className="h4 mb-0">{reminders.length}</p>
                <span>Total Reminder</span>
              </Card>
            </Col>
            <Col md={6}>
              <Card
                className="text-center text-white p-3"
                style={{ backgroundColor: "#003366" }}
              >
                <p className="h4 mb-0">{getPendingRemindersCount()}</p>
                <span>Reminder</span>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card
                className="text-center text-white p-3"
                style={{ backgroundColor: "#003366" }}
              >
                <p className="h4 mb-0">{notes.length}</p>
                <span>Notes</span>
              </Card>
            </Col>
            <Col md={6}>
              <Card
                className="text-center text-white p-3"
                style={{ backgroundColor: "#003366" }}
              >
                <p className="h4 mb-0">{teachers.length}</p>
                <span>Teacher Listed</span>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={8}>
          <Row className="ml-5">
            <Form.Group>
              <Form.Control
                as="select"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((m, i) => (
                  <option key={i} value={m}>
                    {m}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="ml-2">
              <Form.Control
                as="select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select Category</option>
                {taskCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button
              variant="primary"
              className="ml-2"
              onClick={handleSearchTask}
            >
              Search
            </Button>
          </Row>
          <Row>
            <Col md={12}>
              <Card className="p-3">
                <p className="h6 text-success">Task Performance</p>
                <span className="text-muted"color="primary">
                  Below you can find the task that you have added in each month
                </span>
                <Chart
                  chartType="ColumnChart"
                  data={taskData}
                  options={{
                    chartArea: {
                      left: 0,
                      top: 0,
                      width: "100%",
                      height: "100%",
                    },
                    height: 500,
                    width: "100%",
                  }}
                />
              </Card>
            </Col>
            <Col md={12}>
              <Card className="p-3">
                <p className="h6 text-success">Task Vs Completed</p>
                <span className="text-muted"color="primary">
                  You can see the total activity you have listed vs the
                  completed graph
                </span>
                <Chart
                  chartType="BarChart"
                  data={taskVsDoneData}
                  options={{
                    chartArea: {
                      left: 0,
                      top: 0,
                      width: "100%",
                      height: "100%",
                    },
                    height: 500,
                    width: "100%",
                  }}
                />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card className="p-3">
                <p className="h6 text-success">Your Task</p>
                <span className="text-muted"color="primary">
                  You can see the data by your filter
                </span>
                <Chart
                  chartType="PieChart"
                  data={pieChartData}
                  options={{
                    chartArea: {
                      left: 0,
                      top: 0,
                      width: "100%",
                      height: "100%",
                    },
                    height: 400,
                    width: "100%",
                  }}
                />
              </Card>
              <Card className="p-3">
                <p className="h6 text-success">Task of ({month})</p>
                <span className="text-muted"color="primary">
                  You can see the data by your filter
                </span>
                <Chart
                  chartType="PieChart"
                  data={pieChartData1}
                  options={{
                    chartArea: {
                      left: 0,
                      top: 0,
                      width: "100%",
                      height: "100%",
                    },
                    height: 400,
                    width: "100%",
                  }}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

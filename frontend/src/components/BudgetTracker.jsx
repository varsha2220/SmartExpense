import { useState, useMemo } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  ProgressBar,
  Badge
} from "react-bootstrap";

export default function BudgetTracker({ expenses }) {

  const [budget, setBudget] = useState(
    Number(localStorage.getItem("monthlyBudget")) || 20000
  );

  const [selectedDate, setSelectedDate] = useState("");

  const today = new Date();

  const todayString = today.toISOString().split("T")[0];

  const yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);

  const yesterdayString =
    yesterday.toISOString().split("T")[0];

  const thisMonth = today.getMonth();

  const thisYear = today.getFullYear();

  const lastMonth =
    thisMonth === 0 ? 11 : thisMonth - 1;

  const lastMonthYear =
    thisMonth === 0 ? thisYear - 1 : thisYear;

  const totalExpenses = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const todayExpenses = expenses
    .filter(e => e.date === todayString)
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const yesterdayExpenses = expenses
    .filter(e => e.date === yesterdayString)
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const weeklyExpenses = expenses
    .filter(e => {

      const d = new Date(e.date);

      const diff =
        (today - d) / (1000 * 60 * 60 * 24);

      return diff <= 7 && diff >= 0;

    })
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const monthlyExpenses = expenses
    .filter(e => {

      const d = new Date(e.date);

      return (
        d.getMonth() === thisMonth &&
        d.getFullYear() === thisYear
      );

    })
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const lastMonthExpenses = expenses
    .filter(e => {

      const d = new Date(e.date);

      return (
        d.getMonth() === lastMonth &&
        d.getFullYear() === lastMonthYear
      );

    })
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const remainingBudget =
    budget - monthlyExpenses;

  const budgetPercentage =
    budget === 0
      ? 0
      : (monthlyExpenses / budget) * 100;

  const selectedDayExpenses = useMemo(() => {

    if (!selectedDate) return [];

    return expenses.filter(
      e => e.date === selectedDate
    );

  }, [selectedDate, expenses]);

  const selectedDateTotal =
    selectedDayExpenses.reduce(
      (sum, e) => sum + Number(e.amount),
      0
    );

  const averageDailyExpense =
    expenses.length === 0
      ? 0
      : (
          totalExpenses /
          new Set(
            expenses.map(e => e.date)
          ).size
        ).toFixed(2);

  const highestExpense =
    expenses.length === 0
      ? 0
      : Math.max(
          ...expenses.map(e => Number(e.amount))
        );

  const lowestExpense =
    expenses.length === 0
      ? 0
      : Math.min(
          ...expenses.map(e => Number(e.amount))
        );

  const saveBudget = () => {

    localStorage.setItem(
      "monthlyBudget",
      budget
    );

    alert("Budget Saved");

  };

  return (

    <Card className="shadow mt-4">

      <Card.Body>

        <h3 className="mb-4">

          📊 Finance Analytics

        </h3>

        <Row>

          <Col md={3}>

            <Card className="shadow-sm p-3 mb-3">

              <h6>Total Expenses</h6>

              <h3>

                ₹{totalExpenses}

              </h3>

            </Card>

          </Col>

          <Col md={3}>

            <Card className="shadow-sm p-3 mb-3">

              <h6>Today's Expenses</h6>

              <h3>

                ₹{todayExpenses}

              </h3>

            </Card>

          </Col>

          <Col md={3}>

            <Card className="shadow-sm p-3 mb-3">

              <h6>Yesterday</h6>

              <h3>

                ₹{yesterdayExpenses}

              </h3>

            </Card>

          </Col>

          <Col md={3}>

            <Card className="shadow-sm p-3 mb-3">

              <h6>This Week</h6>

              <h3>

                ₹{weeklyExpenses}

              </h3>

            </Card>

          </Col>

        </Row>
                <Row>

          <Col md={3}>

            <Card className="shadow-sm p-3 mb-3">

              <h6>This Month</h6>

              <h3>

                ₹{monthlyExpenses}

              </h3>

            </Card>

          </Col>

          <Col md={3}>

            <Card className="shadow-sm p-3 mb-3">

              <h6>Last Month</h6>

              <h3>

                ₹{lastMonthExpenses}

              </h3>

            </Card>

          </Col>

          <Col md={3}>

            <Card className="shadow-sm p-3 mb-3">

              <h6>Remaining Budget</h6>

              <h3>

                ₹{remainingBudget}

              </h3>

            </Card>

          </Col>

          <Col md={3}>

            <Card className="shadow-sm p-3 mb-3">

              <h6>Average / Day</h6>

              <h3>

                ₹{averageDailyExpense}

              </h3>

            </Card>

          </Col>

        </Row>

        <hr />

        <h4>

          Monthly Budget

        </h4>

        <Row className="mb-3">

          <Col md={8}>

            <Form.Control

              type="number"

              value={budget}

              onChange={(e) =>
                setBudget(Number(e.target.value))
              }

            />

          </Col>

          <Col md={4}>

            <button
              className="btn btn-success w-100"
              onClick={saveBudget}
            >

              Save Budget

            </button>

          </Col>

        </Row>

        <ProgressBar

          now={budgetPercentage}

          label={`${budgetPercentage.toFixed(1)} %`}

          className="mb-3"

        />

        {

          budgetPercentage >= 100 ?

            <Badge bg="danger">

              Budget Exceeded

            </Badge>

            :

            budgetPercentage >= 80 ?

              <Badge bg="warning">

                Budget Almost Full

              </Badge>

              :

              <Badge bg="success">

                Budget Healthy

              </Badge>

        }

        <hr />

        <h4>

          View Expenses by Date

        </h4>

        <Form.Control

          type="date"

          className="mb-4"

          value={selectedDate}

          onChange={(e) =>
            setSelectedDate(e.target.value)
          }

        />

        {

          selectedDate && (

            <>

              <h5>

                Total :

                ₹{selectedDateTotal}

              </h5>

              <table className="table table-striped mt-3">

                <thead>

                  <tr>

                    <th>Title</th>

                    <th>Category</th>

                    <th>Amount</th>

                  </tr>

                </thead>

                <tbody>

                  {

                    selectedDayExpenses.length === 0 ?

                      (

                        <tr>

                          <td
                            colSpan="3"
                            className="text-center"
                          >

                            No Expenses

                          </td>

                        </tr>

                      )

                      :

                      (

                        selectedDayExpenses.map(expense => (

                          <tr key={expense.id}>

                            <td>

                              {expense.title}

                            </td>

                            <td>

                              {expense.category}

                            </td>

                            <td>

                              ₹{expense.amount}

                            </td>

                          </tr>

                        ))

                      )

                  }

                </tbody>

              </table>

            </>

          )

        }

        <hr />

        <h4>

          Insights

        </h4>

        <ul>

          <li>

            Highest Expense :

            ₹{highestExpense}

          </li>

          <li>

            Lowest Expense :

            ₹{lowestExpense}

          </li>

          <li>

            Total Transactions :

            {expenses.length}

          </li>

          <li>

            Average Daily Spending :

            ₹{averageDailyExpense}

          </li>

        </ul>

      </Card.Body>

    </Card>

  );

}
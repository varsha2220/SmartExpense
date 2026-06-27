import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

export default function DashboardBarChart({ expenses }) {

  const monthlyData = [];

  expenses.forEach((expense) => {

    const month = new Date(expense.date).toLocaleString(
      "default",
      { month: "short" }
    );

    const index = monthlyData.findIndex(
      (item) => item.month === month
    );

    if (index === -1) {

      monthlyData.push({
        month: month,
        amount: Number(expense.amount)
      });

    } else {

      monthlyData[index].amount += Number(expense.amount);

    }

  });

  if (monthlyData.length === 0) {

    return (
      <div className="text-center mt-4">
        <h5>No Expense Data</h5>
      </div>
    );

  }

  return (

    <div
      style={{
        width: "100%",
        height: 400
      }}
    >

      <h4 className="text-center mb-3">
        Monthly Expenses
      </h4>

      <ResponsiveContainer>

        <BarChart data={monthlyData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="amount"
            fill="#4CAF50"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}
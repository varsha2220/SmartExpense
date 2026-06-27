import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4560",
  "#26A69A",
  "#7E57C2",
  "#8BC34A",
  "#FF9800"
];

export default function DashboardPieChart({ expenses }) {

  const categoryData = [];

  expenses.forEach((expense) => {

    const index = categoryData.findIndex(
      (item) => item.name === expense.category
    );

    if (index === -1) {

      categoryData.push({
        name: expense.category,
        value: Number(expense.amount)
      });

    } else {

      categoryData[index].value += Number(expense.amount);

    }

  });

  if (categoryData.length === 0) {

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
        Expenses by Category
      </h4>

      <ResponsiveContainer>

        <PieChart>

          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            outerRadius={140}
            label
          >

            {

              categoryData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />

              ))

            }

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}
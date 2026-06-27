import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseCalendar from "../components/ExpenseCalendar";
import ExpenseAnalytics from "../components/ExpenseAnalytics";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Table,
    Spinner,Badge
} from "react-bootstrap";

import {
    FaWallet,
    FaMoneyBillWave,
    FaChartPie,
    FaRobot,
    FaUserCircle,
    FaPlus,
    FaSignOutAlt
} from "react-icons/fa";

import api from "../services/api";

import BudgetTracker from "../components/BudgetTracker";
import AIInsights from "../components/AIInsights";
import AIFinancialPlanner from "../components/AIFinancialPlanner";
import DashboardPieChart from "../components/DashboardPieChart";

export default function Dashboard() {

    const navigate = useNavigate();

    const [expenses, setExpenses] = useState([]);

    const [income, setIncome] = useState([]);

    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const expenseRes =
                await api.get("/expense");

            const incomeRes =
                await api.get("/income");

            setExpenses(expenseRes.data);

            setIncome(incomeRes.data);

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    };

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    const totalExpense = useMemo(() =>

        expenses.reduce(

            (sum,e)=>

                sum+Number(e.amount),

            0

        )

    ,[expenses]);

    const totalIncome = useMemo(()=>

        income.reduce(

            (sum,i)=>

                sum+Number(i.amount),

            0

        )

    ,[income]);

    const savings =

        totalIncome-totalExpense;

    const today = new Date();

    const todayString =

        today.toISOString()

        .split("T")[0];
    
    const filteredExpenses = expenses.filter((expense) => {

    const matchesSearch =
        expense.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
        selectedCategory === "" ||
        expense.category === selectedCategory;

    return matchesSearch && matchesCategory;

});    

    const todayExpense =

        expenses

        .filter(e=>e.date===todayString)

        .reduce(

            (sum,e)=>

            sum+Number(e.amount),

            0

        );

    const monthExpense =

        expenses

        .filter(e=>{

            const d=new Date(e.date);

            return(

                d.getMonth()

                ===today.getMonth()

                &&

                d.getFullYear()

                ===today.getFullYear()

            );

        })

        .reduce(

            (sum,e)=>

            sum+Number(e.amount),

            0

        );

    if(loading){

        return(

            <Container className="mt-5 text-center">

                <Spinner animation="border"/>

            </Container>

        );

    }

    return(

        <Container fluid className="dashboard-container">

            <div

                className="d-flex

                justify-content-between

                align-items-center

                mb-4"

            >

                <div>
                    <h2
                      style={{
                      color: "#be6a39",
                      fontSize: "34px",
                      fontWeight: "700"
                      }}
                      >
                   💰 SmartExpense 
                    </h2>

                    

                    <p>

                        Welcome Back 👋

                    </p>

                </div>

                <div>
                    
                    <Button

                        className="me-2"

                        variant="primary"

                        onClick={()=>

                        navigate("/profile")}

                    >

                        <FaUserCircle/>

                        {" "}

                        Profile

                    </Button>

                    <Button

                        className="me-2"

                        variant="success"

                        onClick={()=>

                        navigate("/income")}

                    >

                        <FaMoneyBillWave/>

                        {" "}

                        Income

                    </Button>

                    <Button

                        className="me-2"

                        onClick={()=>

                        navigate("/add-expense")}

                    >

                        <FaPlus/>

                        {" "}

                        Add Expense

                    </Button>

                    <Button

                        variant="danger"

                        onClick={logout}

                    >

                        <FaSignOutAlt/>

                        {" "}

                        Logout

                    </Button>

                </div>

            </div>

            <Row>

                <Col lg={3}>

                    <Card className="shadow mb-3">

                        <Card.Body>


                            <h6>

                                Total Income

                            </h6>

                            <h2
                             style={{
                             color: "GREEN",
                             fontSize: "36px",
                             fontWeight: "bold"
                            }}
                            >
                              ₹{totalIncome}
                            </h2>

                            

                            

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={3}>

                    <Card className="shadow mb-3">

                        <Card.Body>

                            <h6>

                                Total Expenses

                            </h6>

                            <h2
                              style={{
                              color: "GREEN",
                              fontSize: "36px",
                              fontWeight: "bold"
                              }}
                             >
                               ₹{totalExpense}
                            </h2>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={3}>

                    <Card className="shadow mb-3">

                        <Card.Body>

                            <h6>

                                Savings

                            </h6>

                            <h2
                             style={{
                             color: "GREEN",
                             fontSize: "36px",
                             fontWeight: "bold"
                            }}
                            >
                              ₹{savings}
                            </h2>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={3}>

                    <Card className="shadow mb-3">

                        <Card.Body>

                            <h6>

                                Today's Expense

                            </h6>

                            <h2
                              style={{
                              color: "GREEN",
                              fontSize: "36px",
                              fontWeight: "bold"
                              }}
                             >
                               ₹{todayExpense}
                            </h2>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>
                        <Row className="mt-2">

                <Col lg={8}>

                    <BudgetTracker
                        expenses={expenses}
                    />

                </Col>

                <Col lg={4}>

                    <Card className="shadow h-100">

                        <Card.Body>

                            <h4>

                                <FaChartPie />

                                {" "}

                                Expense Distribution

                            </h4>

                            <hr />

                            <DashboardPieChart
                                expenses={expenses}
                            />

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

            <Row className="mt-4">

                <Col lg={6}>

                    <AIInsights

                        expenses={expenses}

                        monthlyBudget={20000}

                    />

                </Col>

                <Col lg={6}>

                    <AIFinancialPlanner

                        totalIncome={totalIncome}

                        totalExpense={totalExpense}

                        monthlyBudget={20000}

                        savingsGoal={100000}

                        expenses={expenses}

                    />

                </Col>

            </Row>

            <Row className="mt-4">

                <Col lg={3}>

                    <Card className="shadow text-center">

                        <Card.Body>

                            <h6>

                                This Month

                            </h6>

                            <h2>

                                ₹{monthExpense}

                            </h2>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={3}>

                    <Card className="shadow text-center">

                        <Card.Body>

                            <h6>

                                Remaining Budget

                            </h6>

                            <h2>

                                ₹{20000 - monthExpense}

                            </h2>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={3}>

                    <Card className="shadow text-center">

                        <Card.Body>

                            <h6>

                                Transactions

                            </h6>

                            <h2>

                                {expenses.length}

                            </h2>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={3}>

                    <Card className="shadow text-center">

                        <Card.Body>

                            <h6>

                                Finance Score

                            </h6>

                            <h2>

                                {

                                    savings > 0

                                        ? "92"

                                        : "58"

                                }

                                /100

                            </h2>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

            <Row className="mt-4">

                <Col>

                    <Card className="shadow">

                        <Card.Body>

                            <h4>

                                🤖 Smart AI Summary

                            </h4>

                            <hr />

                            <ul>

                                <li>

                                    💰 Total Income:

                                    <strong>

                                        {" "}₹{totalIncome}

                                    </strong>

                                </li>

                                <li>

                                    💳 Total Expenses:

                                    <strong>

                                        {" "}₹{totalExpense}

                                    </strong>

                                </li>

                                <li>

                                    💵 Current Savings:

                                    <strong>

                                        {" "}₹{savings}

                                    </strong>

                                </li>

                                <li>

                                    📊 Monthly Spending:

                                    <strong>

                                        {" "}₹{monthExpense}

                                    </strong>

                                </li>

                                <li>

                                    🎯 Keep your monthly spending below your budget for a higher Finance Score.

                                </li>

                            </ul>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>
                        <Row className="mt-4">

                <Col lg={8}>

                    <Card className="shadow">

                        <Card.Body>

                            <div className="d-flex justify-content-between align-items-center ">

                                <h4>

                                    📋 Recent Transactions

                                </h4>

                                <Button

                                    variant="outline-success"

                                    onClick={() => navigate("/add-expense")}

                                >

                                    + Add Expense

                                </Button>

                            </div>

                            <Table
                                striped
                                bordered
                                hover
                                responsive
                            >

                                <thead>

                                    <tr>

                                        <th>Title</th>

                                        <th>Category</th>

                                        <th>Amount</th>

                                        <th>Date</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        expenses.length === 0 ?

                                        (

                                            <tr>

                                                <td

                                                    colSpan="4"

                                                    className="text-center"

                                                >

                                                    No Expenses Added

                                                </td>

                                            </tr>

                                        )

                                        :

                                        (

                                            expenses

                                            .slice()

                                            .reverse()

                                            .slice(0,10)

                                            .map(expense=>(

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

                                                    <td>

                                                        {expense.date}

                                                    </td>

                                                </tr>

                                            ))

                                        )

                                    }

                                </tbody>

                            </Table>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={4}>

                    <Card className="shadow">

                        <Card.Body>

                            <h4>

                                🏆 Achievements

                            </h4>

                            <hr/>

                            <p>

                                🔥 No Spend Days

                            </p>

                            <h3>

                                4 Days

                            </h3>

                            <hr/>

                            <p>

                                💰 Best Saving Month

                            </p>

                            <h5>

                                ₹18,500

                            </h5>

                            <hr/>

                            <p>

                                📈 Highest Spending Category

                            </p>

                            <h5>

                                Food

                            </h5>

                            <hr/>

                            <p>

                                🎯 Savings Goal

                            </p>

                            <div className="progress">

                                <div

                                    className="progress-bar bg-success"

                                    style={{

                                        width:"42%"

                                    }}

                                >

                                    42%

                                </div>

                            </div>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

            <Row className="mt-4">

                <Col lg={6}>

                    <Card className="shadow">

                        <Card.Body>

                            <h4>

                                📅 Expense Summary

                            </h4>

                            <hr/>

                            <p>

                                Today's Expense

                                <strong>

                                    {" "}₹{todayExpense}

                                </strong>

                            </p>

                            <p>

                                This Month

                                <strong>

                                    {" "}₹{monthExpense}

                                </strong>

                            </p>

                            <p>

                                Total Expense

                                <strong>

                                    {" "}₹{totalExpense}

                                </strong>

                            </p>

                            <p>

                                Total Income

                                <strong>

                                    {" "}₹{totalIncome}

                                </strong>

                            </p>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={6}>

                    <Card className="shadow">

                        <Card.Body>

                            <h4>

                                🤖 AI Quick Tips

                            </h4>

                            <hr/>

                            <ul>

                                <li>

                                    Spend less on Food to increase savings.

                                </li>

                                <li>

                                    Try maintaining 20% savings every month.

                                </li>

                                <li>

                                    Build an emergency fund equal to 6 months of expenses.

                                </li>

                                <li>

                                    Invest at least 10% of your monthly income.

                                </li>

                                <li>

                                    Review recurring subscriptions regularly.

                                </li>

                            </ul>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>
                        <Row className="mt-4">

                <Col lg={7}>

                    <Card className="shadow">

                        <Card.Body>

                            <h4>

                                🔍 Search & Filters

                            </h4>

                            <hr />

                            <Row>

                                <Col md={6}>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search Expense..."
                                    />

                                </Col>

                                <Col md={6}>

                                    <select
                                        className="form-select"
                                    >

                                        <option>

                                            All Categories

                                        </option>

                                        <option>

                                            Food

                                        </option>

                                        <option>

                                            Travel

                                        </option>

                                        <option>

                                            Shopping

                                        </option>

                                        <option>

                                            Bills

                                        </option>

                                        <option>

                                            Entertainment

                                        </option>

                                        <option>

                                            Medical

                                        </option>

                                    </select>
                                    </Col>

<Col >

                                    
                                      <Card
    className="shadow border-0 mt-6"
    style={{ width: "100%" }}
>

    <Card.Body>
    

        <h4>

            🔍 Search Results

        </h4>

        

<Col ></Col>


        <hr/>

        <div className="table-responsive">

    <Table
        striped
        bordered
        hover
        className="mx-auto"
    >

        

            <thead>

                <tr>
                   <th style={{ width: "22%" }}>Title</th>
<th style={{ width: "18%" }}>Category</th>
<th style={{ width: "12%" }}>Amount</th>
<th style={{ width: "18%" }}>Date</th>
<th style={{ width: "15%" }}>Payment</th>
<th style={{ width: "15%" }}>Action</th>
                   



                    

                </tr>

            </thead>

            <tbody>

            {

                filteredExpenses.length===0

                ?

                <tr>

                    <td
                        colSpan="6"
                        className="text-center"
                    >

                        No matching expenses found

                    </td>

                </tr>

                :

                filteredExpenses.map(expense=>(

                    <tr key={expense.id}>

                        <td>

                            {expense.title}

                        </td>

                        <td>

                            <Badge bg="primary">

                                {expense.category}

                            </Badge>

                        </td>

                        <td>

                            ₹{expense.amount}

                        </td>

                        <td>

                            {expense.date}

                        </td>

                        <td>

                            {expense.paymentMethod||"Cash"}

                        </td>

                        <td>

                            <Button

                                size="sm"

                                variant="warning"

                                className="me-2"

                                onClick={()=>

                                    navigate(`/edit-expense/${expense.id}`)

                                }

                            >

                                Edit

                            </Button>

                            <Button

                                size="sm"

                                variant="danger"

                                onClick={()=>

                                    navigate(`/delete-expense/${expense.id}`)

                                }

                            >

                                Delete

                            </Button>

                        </td>

                    </tr>

                ))

            }

            </tbody>

        </Table>
        </div>

    </Card.Body>

</Card>

                                </Col>

                            </Row>

                        </Card.Body>

                    </Card>

                </Col>

                <Col lg={5}>

                    <Card className="shadow">

                        <Card.Body>

                            <h4>

                                📅 Calendar

                            </h4>

                            <hr/>
                             <Row className="mt-4">

                             <Col>

                             <ExpenseCalendar

                               expenses={expenses}

                            />

                             </Col>

                             </Row>

                            

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

            <Row className="mt-4">

                


                        <Card.Body>

                            

                            <Row className="mt-4">

                              <Col>

                              <ExpenseAnalytics

                               expenses={expenses}

                               totalIncome={totalIncome}

                               />

                               </Col>

                              </Row>

                        </Card.Body>

                    

                

            </Row>

            <footer
                className="text-center mt-5 mb-3"
            >

                <hr/>

                <p>

                    © 2026 SmartExpense AI

                </p>

                <p>

                    AI Powered Personal Finance Management System

                </p>

            </footer>

        </Container>

    );

}
import { Card, Row, Col, ProgressBar } from "react-bootstrap";

export default function ExpenseAnalytics({

    expenses,

    totalIncome

}){

    const today = new Date();

    const currentMonth = today.getMonth();

    const currentYear = today.getFullYear();

    const currentWeekStart = new Date(today);

    currentWeekStart.setDate(

        today.getDate() - today.getDay()

    );

    const weeklyExpense = expenses

        .filter(exp=>{

            const d = new Date(exp.date);

            return d >= currentWeekStart;

        })

        .reduce(

            (sum,item)=>

                sum+Number(item.amount),

            0

        );

    const monthlyExpense = expenses

        .filter(exp=>{

            const d=new Date(exp.date);

            return(

                d.getMonth()===currentMonth

                &&

                d.getFullYear()===currentYear

            );

        })

        .reduce(

            (sum,item)=>

                sum+Number(item.amount),

            0

        );

    const budget = totalIncome * 0.50;

    const budgetUsed =

        budget===0

        ?

        0

        :

        Math.min(

            Math.round(

                monthlyExpense/budget*100

            ),

            100

        );

    const highestExpense =

        expenses.length===0

        ?

        null

        :

        expenses.reduce(

            (a,b)=>

                Number(a.amount)>Number(b.amount)

                ?

                a

                :

                b

        );

    return(

        <Card className="shadow border-0 mt-4">

            <Card.Body>

                <h3>

                    📊 Expense Analytics

                </h3>

                <hr/>

                <Row>

                    <Col md={4}>

                        <Card className="bg-success text-white">

                            <Card.Body>

                                <h6>

                                    Weekly Expense

                                </h6>

                                <h2>

                                    ₹{weeklyExpense}

                                </h2>

                            </Card.Body>

                        </Card>

                    </Col>

                    <Col md={4}>

                        <Card className="bg-primary text-white">

                            <Card.Body>

                                <h6>

                                    Monthly Expense

                                </h6>

                                <h2>

                                    ₹{monthlyExpense}

                                </h2>

                            </Card.Body>

                        </Card>

                    </Col>

                    <Col md={4}>

                        <Card className="bg-warning text-dark">

                            <Card.Body>

                                <h6>

                                    Budget Used

                                </h6>

                                <h2>

                                    {budgetUsed}%

                                </h2>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>
                                <Row className="mt-4">

                    <Col md={6}>

                        <Card className="border-0 shadow-sm">

                            <Card.Body>

                                <h5>

                                    🏆 Highest Expense

                                </h5>

                                <hr/>

                                {

                                    highestExpense ?

                                    <>

                                        <h4>

                                            {highestExpense.title}

                                        </h4>

                                        <p>

                                            Category :
                                            <strong>

                                                {" "}

                                                {highestExpense.category}

                                            </strong>

                                        </p>

                                        <h3 className="text-danger">

                                            ₹{highestExpense.amount}

                                        </h3>

                                    </>

                                    :

                                    <p>

                                        No Expenses Available

                                    </p>

                                }

                            </Card.Body>

                        </Card>

                    </Col>

                    <Col md={6}>

                        <Card className="border-0 shadow-sm">

                            <Card.Body>

                                <h5>

                                    🎯 Budget Progress

                                </h5>

                                <hr/>

                                <p>

                                    Monthly Budget

                                    <strong>

                                        {" "}₹{budget}

                                    </strong>

                                </p>

                                <p>

                                    Used

                                    <strong>

                                        {" "}₹{monthlyExpense}

                                    </strong>

                                </p>

                                <ProgressBar

                                    now={budgetUsed}

                                    label={`${budgetUsed}%`}

                                    animated

                                />

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

                <Row className="mt-4">

                    <Col>

                        <Card className="border-0 shadow-sm">

                            <Card.Body>

                                <h4>

                                    🤖 AI Analytics

                                </h4>

                                <hr/>

                                <ul>

                                    <li>

                                        💰 Weekly Spending :
                                        <strong>

                                            {" "}₹{weeklyExpense}

                                        </strong>

                                    </li>

                                    <li>

                                        📅 Monthly Spending :
                                        <strong>

                                            {" "}₹{monthlyExpense}

                                        </strong>

                                    </li>

                                    <li>

                                        💵 Remaining Budget :
                                        <strong>

                                            {" "}₹{budget-monthlyExpense}

                                        </strong>

                                    </li>

                                    <li>

                                        {

                                            budgetUsed>=80

                                            ?

                                            "⚠️ Budget usage is above 80%. Try reducing unnecessary expenses."

                                            :

                                            "✅ Budget usage is healthy."

                                        }

                                    </li>

                                    <li>

                                        {

                                            totalIncome>monthlyExpense

                                            ?

                                            "🎉 Great! Your income is higher than your expenses."

                                            :

                                            "⚠️ Your expenses are exceeding your income."

                                        }

                                    </li>

                                </ul>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

            </Card.Body>

        </Card>

    );

}
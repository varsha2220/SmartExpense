import { Card, Row, Col, ProgressBar, Alert } from "react-bootstrap";

export default function AIFinancialPlanner({

    totalIncome,

    totalExpense,

    monthlyBudget,

    savingsGoal,

    expenses

}) {

    const savings = totalIncome - totalExpense;

    const savingsRate =

        totalIncome === 0

            ? 0

            : Math.round((savings / totalIncome) * 100);

    const financeScore = (() => {

        let score = 100;

        if (savingsRate < 20)

            score -= 25;

        if (totalExpense > monthlyBudget)

            score -= 25;

        if (monthlyBudget === 0)

            score -= 15;

        if (totalIncome === 0)

            score -= 35;

        return Math.max(score, 0);

    })();

    const recommendedNeeds =

        Math.round(totalIncome * 0.50);

    const recommendedWants =

        Math.round(totalIncome * 0.20);

    const recommendedSavings =

        Math.round(totalIncome * 0.20);

    const recommendedInvestment =

        Math.round(totalIncome * 0.10);

    const categoryTotals = {};

    expenses.forEach(expense => {

        categoryTotals[expense.category] =

            (categoryTotals[expense.category] || 0)

            + Number(expense.amount);

    });

    const biggestCategory =

        Object.keys(categoryTotals).length === 0

            ? "No Data"

            : Object.keys(categoryTotals)

                .reduce(

                    (a, b) =>

                        categoryTotals[a] >

                        categoryTotals[b]

                            ? a

                            : b

                );

    const biggestAmount =

        categoryTotals[biggestCategory] || 0;

    const possibleSaving =

        Math.round(biggestAmount * 0.15);

    const goalProgress =

        savingsGoal === 0

            ? 0

            : Math.min(

                Math.round(

                    (savings / savingsGoal) * 100

                ),

                100

            );

    const remainingGoal =

        Math.max(

            savingsGoal - savings,

            0

        );

    return (

        <Card className="shadow mt-4">

            <Card.Body>

                <h3>

                    🤖 AI Financial Planner

                </h3>

                <hr/>

                <Row>

                    <Col md={3}>

                        <Card className="shadow-sm mb-3">

                            <Card.Body>

                                <h6>

                                    Income

                                </h6>

                                <h3>

                                    ₹{totalIncome}

                                </h3>

                            </Card.Body>

                        </Card>

                    </Col>

                    <Col md={3}>

                        <Card className="shadow-sm mb-3">

                            <Card.Body>

                                <h6>

                                    Expenses

                                </h6>

                                <h3>

                                    ₹{totalExpense}

                                </h3>

                            </Card.Body>

                        </Card>

                    </Col>

                    <Col md={3}>

                        <Card className="shadow-sm mb-3">

                            <Card.Body>

                                <h6>

                                    Savings

                                </h6>

                                <h3>

                                    ₹{savings}

                                </h3>

                            </Card.Body>

                        </Card>

                    </Col>

                    <Col md={3}>

                        <Card className="shadow-sm mb-3">

                            <Card.Body>

                                <h6>

                                    Finance Score

                                </h6>

                                <h3>

                                    {financeScore}/100

                                </h3>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>
                                <Row className="mt-3">

                    <Col md={6}>

                        <Card className="border-primary shadow-sm">

                            <Card.Body>

                                <h5>

                                    📊 Recommended Budget Distribution

                                </h5>

                                <hr />

                                <p>

                                    🏠 Needs (50%)

                                    <strong>

                                        {" "}₹{recommendedNeeds}

                                    </strong>

                                </p>

                                <p>

                                    🎉 Wants (20%)

                                    <strong>

                                        {" "}₹{recommendedWants}

                                    </strong>

                                </p>

                                <p>

                                    💰 Savings (20%)

                                    <strong>

                                        {" "}₹{recommendedSavings}

                                    </strong>

                                </p>

                                <p>

                                    📈 Investments (10%)

                                    <strong>

                                        {" "}₹{recommendedInvestment}

                                    </strong>

                                </p>

                            </Card.Body>

                        </Card>

                    </Col>

                    <Col md={6}>

                        <Card className="border-success shadow-sm">

                            <Card.Body>

                                <h5>

                                    🎯 Savings Goal

                                </h5>

                                <hr />

                                <p>

                                    Goal

                                    <strong>

                                        {" "}₹{savingsGoal}

                                    </strong>

                                </p>

                                <p>

                                    Current Savings

                                    <strong>

                                        {" "}₹{savings}

                                    </strong>

                                </p>

                                <p>

                                    Remaining

                                    <strong>

                                        {" "}₹{remainingGoal}

                                    </strong>

                                </p>

                                <ProgressBar

                                    now={goalProgress}

                                    label={`${goalProgress}%`}

                                />

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

                <Row className="mt-3">

                    <Col md={12}>

                        <Card className="border-warning shadow-sm">

                            <Card.Body>

                                <h4>

                                    🤖 AI Financial Coach

                                </h4>

                                <hr />

                                <Alert variant="info">

                                    💡 Your highest spending category is

                                    <strong>

                                        {" "}{biggestCategory}

                                    </strong>

                                    .

                                </Alert>

                                <Alert variant="success">

                                    💰 If you reduce spending on

                                    <strong>

                                        {" "}{biggestCategory}

                                    </strong>

                                    {" "}by 15%, you could save

                                    <strong>

                                        {" "}₹{possibleSaving}

                                    </strong>

                                    {" "}this month.

                                </Alert>

                                {

                                    totalExpense > monthlyBudget &&

                                    monthlyBudget > 0 &&

                                    (

                                        <Alert variant="danger">

                                            ⚠️ You have exceeded your monthly budget.

                                            Try reducing discretionary spending.

                                        </Alert>

                                    )

                                }

                                {

                                    savingsRate >= 20 ?

                                    (

                                        <Alert variant="success">

                                            🎉 Excellent! Your savings rate is

                                            <strong>

                                                {" "}{savingsRate}%

                                            </strong>

                                            . Keep it up!

                                        </Alert>

                                    )

                                    :

                                    (

                                        <Alert variant="warning">

                                            ⚠️ Your savings rate is only

                                            <strong>

                                                {" "}{savingsRate}%

                                            </strong>

                                            . Aim for at least 20%.

                                        </Alert>

                                    )

                                }

                                <Alert variant="primary">

                                    📊 Finance Score:

                                    <strong>

                                        {" "}{financeScore}/100

                                    </strong>

                                </Alert>

                                <Alert variant="secondary">

                                    📈 Suggested Monthly Plan

                                    <ul className="mt-2 mb-0">

                                        <li>

                                            Spend on Needs:

                                            ₹{recommendedNeeds}

                                        </li>

                                        <li>

                                            Spend on Wants:

                                            ₹{recommendedWants}

                                        </li>

                                        <li>

                                            Save:

                                            ₹{recommendedSavings}

                                        </li>

                                        <li>

                                            Invest:

                                            ₹{recommendedInvestment}

                                        </li>

                                    </ul>

                                </Alert>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

            </Card.Body>

        </Card>

    );

}
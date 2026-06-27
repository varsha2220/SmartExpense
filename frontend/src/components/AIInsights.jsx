import { Card, Alert } from "react-bootstrap";

export default function AIInsights({

    expenses,

    totalIncome

}){

    const totalExpense = expenses.reduce(

        (sum,item)=>

            sum+Number(item.amount),

        0

    );

    const categoryTotals={};

    expenses.forEach(exp=>{

        categoryTotals[exp.category]=

            (categoryTotals[exp.category]||0)

            +

            Number(exp.amount);

    });

    const biggestCategory=

        Object.keys(categoryTotals).length===0

        ?

        "No Data"

        :

        Object.keys(categoryTotals)

        .reduce(

            (a,b)=>

                categoryTotals[a]>

                categoryTotals[b]

                ?

                a

                :

                b

        );

    const biggestCategoryAmount=

        categoryTotals[biggestCategory]||0;

    const possibleSaving=

        Math.round(

            biggestCategoryAmount*0.15

        );

    let highestExpense=

        null;

    if(expenses.length>0){

        highestExpense=

            expenses.reduce(

                (a,b)=>

                Number(a.amount)>

                Number(b.amount)

                ?

                a

                :

                b

            );

    }

    const savings=

        totalIncome-totalExpense;

    const savingsRate=

        totalIncome===0

        ?

        0

        :

        Math.round(

            savings/

            totalIncome

            *100

        );

    return(

        <Card className="shadow border-0 mt-4">

            <Card.Body>

                <h3>

                    🤖 AI Smart Insights

                </h3>

                <hr/>
                                <Alert variant="primary">

                    📊 Your biggest spending category is

                    <strong>

                        {" "}{biggestCategory}

                    </strong>

                    {" "}with a total of

                    <strong>

                        {" "}₹{biggestCategoryAmount}

                    </strong>

                </Alert>

                <Alert variant="success">

                    💡 If you reduce spending on

                    <strong>

                        {" "}{biggestCategory}

                    </strong>

                    {" "}by just 15%, you could save

                    <strong>

                        {" "}₹{possibleSaving}

                    </strong>

                    {" "}this month.

                </Alert>

                {

                    highestExpense &&

                    <Alert variant="warning">

                        🔥 Your highest expense was

                        <strong>

                            {" "}{highestExpense.title}

                        </strong>

                        {" "}worth

                        <strong>

                            {" "}₹{highestExpense.amount}

                        </strong>

                        {" "}under

                        <strong>

                            {" "}{highestExpense.category}

                        </strong>

                    </Alert>

                }

                <Alert

                    variant={

                        savingsRate>=20

                        ?

                        "success"

                        :

                        "danger"

                    }

                >

                    💰 Savings Rate :

                    <strong>

                        {" "}{savingsRate}%

                    </strong>

                </Alert>

                {

                    savingsRate<20

                    ?

                    <Alert variant="danger">

                        ⚠️ Your savings rate is below the recommended 20%.

                        Try reducing unnecessary spending.

                    </Alert>

                    :

                    <Alert variant="success">

                        🎉 Excellent! You are maintaining a healthy savings rate.

                    </Alert>

                }

                <Alert variant="info">

                    📈 Total Expenses :

                    <strong>

                        {" "}₹{totalExpense}

                    </strong>

                </Alert>

                <Alert variant="secondary">

                    💵 Current Savings :

                    <strong>

                        {" "}₹{savings}

                    </strong>

                </Alert>

                <Alert variant="dark">

                    🤖 AI Recommendation

                    <ul className="mt-2 mb-0">

                        <li>

                            Spend less in your highest spending category.

                        </li>

                        <li>

                            Keep your savings above 20% of your income.

                        </li>

                        <li>

                            Track expenses daily instead of weekly.

                        </li>

                        <li>

                            Review recurring subscriptions every month.

                        </li>

                        <li>

                            Try setting category-wise budgets.

                        </li>

                    </ul>

                </Alert>

            </Card.Body>

        </Card>

    );

}
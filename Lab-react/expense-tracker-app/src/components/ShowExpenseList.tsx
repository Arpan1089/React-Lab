import { useEffect, useState } from 'react';
import dataList from '../modal/dataList';
import { getDataFromServer } from '../services/menu';
import ExpenseTracker from './ExpenseTracker';
import '../css/showExpense.css';
const ShowExpenseList = () => {
    const [items, setItems] = useState<any>([]);
    const [error, setError] = useState<Error | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [rahulSpent, setRahulSpent] = useState<number>(0);
    const [rameshSpent, setRameshSpent] = useState<number>(0);

    const [sum, setSum] = useState<number>(0);
    var rahulSpent1 = 0;
    var rameshSpent1 = 0;

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await getDataFromServer();
                setItems(data);
                calSum(data);
                shares(data);


            } catch (err: any) {

            }
        }; fetchMenu();
    }, [showForm])

    const shares = (data: any) => {
        data.map((sams: any) => {
            if (sams.payeeName === 'Rahul') {
                rahulSpent1 = rahulSpent1 + sams.price;
            } else {
                rameshSpent1 = rameshSpent1 + sams.price;
            }



        })
        setRahulSpent(rahulSpent1);
        setRameshSpent(rameshSpent1);

    }

    const calSum = (data: any) => {
        let res = 0;
        for (let value of data) {
            res = res + value.price;
            setSum(res);


        }
    }

    const success = () => { setShowForm(false) };
    const cancel = () => { setShowForm(false) }
    return (
        <>
            <div className="container">
                <div className="table-container">

                    <table>
                        <tr>
                            <th>Date</th>
                            <th>Product Purchased</th>
                            <th>Price</th>
                            <th>Payee</th>
                        </tr>

                        {items.length > 0 && items.map((item: dataList) => {
                            return (
                                <tr key={item.id}>
                                    <td className="date">{item.setDate}</td>
                                    <td className="product">{item.product}</td>
                                    <td className="price">{item.price}</td>
                                    <td className="payee">{item.payeeName}</td>
                                </tr>
                            );
                        })}

                    </table>
                    {showForm && (
                        <div className="tracker">
                            <ExpenseTracker onTrue={success} onClose={cancel}></ExpenseTracker>
                        </div>
                    )}
                    <hr />
                </div>
                <div className="button-container">
                    <button className="add-button" onClick={() => setShowForm(true)}>Add</button>
                </div>
            </div>
            <div style={{ marginBottom: "8px" }}>
                <span className="total">Total : </span>
                <span className="total-value">{sum} </span>
            </div>
            <div style={{ marginBottom: "8px" }}>
                <span className="total">Rahul Paid :</span>
                <span className="total-value">{rahulSpent}</span>
            </div>
            <div style={{ marginBottom: "8px" }}>
                <span className="total">Ramesh Paid :</span>
                <span className="total-value">{rameshSpent}</span>
            </div>

            <div style={{ marginBottom: "8px" }}>
                <span className="spend-value">{rahulSpent > rameshSpent ? 'Pay Rahul:' : 'Pay Ramesh:'}</span>
                <span className="spend">{Math.abs((rahulSpent - rameshSpent))}</span>
            </div>
        </>
    );
}

export default ShowExpenseList;
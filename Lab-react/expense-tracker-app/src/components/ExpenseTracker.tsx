import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { pushDataToServer } from '../services/menu';
type Props = {
    onTrue: any,
    onClose: any
}



const ExpenseTracker = (props: Props) => {
    const [payeeName, setPayeeName] = useState<string>('');
    const [product, setProduct] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [date, setDate] = useState<string>('');

    useEffect(() => {
        let date = new Date();
        setDate(date.toISOString().split('T')[0]);
    })

    const setPayee = (event: ChangeEvent<HTMLSelectElement>) => {
        setPayeeName(event.target.value);
    }
    const setProducrtDetails = (event: ChangeEvent<HTMLInputElement>) => {
        setProduct(event.target.value);
    }
    const setPriceDetails = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(parseInt(event.target.value));
    }

    const setDateDetails = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    }

    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            payeeName,
            product,
            price,
            setDate: date,
            //  id:4
        }

        const data = await pushDataToServer(payload);
        props.onTrue();

    }

    return (
        <section style={{ margin: "12px" }}>
            <header style={{ background: "lightYellow", margin: "8px" }}>
                <div style={{ display: "flex", justifyContent: "center", fontSize: "18px", fontWeight: "bold", marginBottom: "0px" }}>Add new Item</div>
                <p style={{ fontSize: "10px", color: "red", fontWeight: "300" }}>Read the below instructions before Proceeding: <br></br>
                    <span style={{ fontSize: "10px", fontWeight: "300", marginTop: "0px", color: "balck" }}>Make sure you fill all the fields where * is provided</span>
                </p>
            </header>
            <form onSubmit={submitHandler}>
                <article style={{ margin: "8px", background: "white", padding: "4px" }}>
                    <p>Name <span style={{ color: "red" }}>*</span> :</p>
                    <select name="Name" required value={payeeName} onChange={setPayee}>
                        <option value="" defaultChecked>Choose</option>
                        <option value="Rahul">Rahul</option>
                        <option value="Ramesh">Ramesh</option>
                    </select>
                </article>
                <article style={{ margin: "8px", background: "white", padding: "4px" }}>
                    <p>Product Purchased<span style={{ color: "red" }}>*</span> :</p>
                    <input type="text" required value={product} onChange={setProducrtDetails} />
                </article>

                <article style={{ margin: "8px", background: "white", padding: "4px" }}>
                    <p>Price<span style={{ color: "red" }}>*</span> :</p>
                    <input type="number" required value={price} onChange={setPriceDetails} />
                </article>

                <article style={{ margin: "8px", background: "white", padding: "4px" }}>
                    <p>Date<span style={{ color: "red" }}>*</span> :</p>
                    <input type="date" required value={date} onChange={setDateDetails} />
                </article>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button style={{ width: "50px", height: "30px", background: "lightYellow", margin: "8px", border: "none" }} onClick={props.onClose}>Close</button>
                    <button style={{ width: "50px", height: "30px", background: "lightYellow", margin: "8px", border: "none" }}> Submit</button>
                </div>
            </form>

        </section>
    );
}

export default ExpenseTracker;
import { useEffect, useState } from "react";
import "./Calculator.css"
const Calculator = () => {
    const tips=[5,10,15,25,50];
    const [bill, setBill]=useState("");
    const [tipPercentage, setTipPercentage] = useState(0);
    const [people, setPeople]=useState(1);
    const [tipAmount, setTipAmount]=useState("0.00");
    const [totalAmount, setTotalAmount]=useState("0.00");
    
    useEffect(()=>{
        if(bill !==0 && tipPercentage !== 0 && people!== 0){
            setTipAmount((bill * (tipPercentage/100)/people).toFixed(2));
           setTotalAmount((bill/people* tipPercentage).toFixed(2));
        }else{
            setTipAmount("0.00");
            setTotalAmount("0.00")
        }
    }, [bill, people,tipPercentage])

    const reset = () => {
        let peopleValue=document.querySelector(".inputForPeople");
        peopleValue.value=1;
        let customValue=document.querySelector(".custom");
        customValue.value="";
        setBill("");
        setPeople(1);
        setTipPercentage(0);
        setTipAmount("0.00");
        setTotalAmount("0.00");
    };
    
    return ( 
        <div>
            <div>
            <img className="image" src="./images/logo.svg"/>
            </div>
        <div className="card">
        <p className="bill">Bill</p>
        <div className="bill-input">
            <input  type="number" className="numberInput" maxLength="10" value={bill} onChange={ (event)=>{
                if(event.target.value.length >6){
                    event.target.value.slice(0,6);
                }else{
                    setBill(event.target.value);
                }
            }}/>
            <img className="dollar"src="./images/icon-dollar.svg"/>
        </div>
        <div className="select">
              <p className="select-tip">Select Tip %</p>
            {tips.map((item, index)=>{
                return (
                    <button key={index} className="tips" style={
                        tipPercentage == item
                          ? { backgroundColor: "#26C2AE", color: "#00474B" }
                          : {}
                      } onClick={() => setTipPercentage(item)}>{item}%
                    </button>
                )
            })}
             <input type="number" className="custom"  placeholder="Custom"  onChange={(event)=>{
                if(event.target.value.length>4){
                    event.target.value= event.target.value.slice(0,4);    
                }else{
                    setTipPercentage(Number(event.target.value));
                }
             }}/>
            </div>
            <p className="people">Number of people</p>
            {people ===0 ? ( <div className="error" style={{ display: "block"}} >Can't be zero</div> ): null}
                
            <div className={`people-input ${people === 0 ? 'border-error' : ''}`}>
            <input type="number" className="inputForPeople"  defaultValue={people}  onChange={(event)=>{
              if(event.target.value.length>5){
                event.target.value= event.target.value.slice(0,5); 
            }else{
                setPeople(Number(event.target.value))
            }
            } }/>
            <img className="person" src="./images/icon-person.svg"/>
            </div>
            <div className="last-part">
            <p className="tip-amount">Tip Amount <br/><span>/person</span></p>
            <div className="price number">${tipAmount}</div>
            <p className="total-amount">Total <br/><span>/person</span></p>
            <div className="total number">${totalAmount}</div>
            <button className="btn" onClick={reset}>RESET</button>
            </div>
        </div> 
         </div>
     );
}
 
export default Calculator;
import React, { useEffect, useState } from 'react';
import './Calculator.css';

const calcButtons = [
    {id: "clear", value:"AC"},
    {id: "divide", value:"/"},
    { id: "multiply", value: "x" },
    { id: "seven", value: 7 },
    { id: "eight", value: 8 },
    { id: "nine", value: 9 },
    { id: "subtract", value: "-" },
    { id: "four", value: 4 },
    { id: "five", value: 5 },
    { id: "six", value: 6 },
    { id: "add", value: "+" },
    { id: "one", value: 1 },
    { id: "two", value: 2 },
    { id: "three", value: 3 },
    { id: "equals", value: "=" },
    { id: "zero", value: 0 },
    { id: "decimal", value: "." },
];

const operators = ["AC", "/", "x", "+", "-", "="];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Display = ({input, output}) => (
    <div className="output">
        <span className="result">{output}</span>
        <span id="display" className="input">{input}</span>
    </div>
);

const Key = ({keyData: {id, value}, handleInput}) => (
    <button id={id} onClick={() => handleInput(value)}>{value}</button>
);

const Keyboard = ({handleInput}) => (
    <div className="keys">
        {calcButtons.map((key) => (
            <Key key={key.id} keyData={key} handleInput={handleInput} />
        ))}
    </div>
)

function Calculator() {
    const [input, setInput] = useState("0");
    const [output, setOutput] = useState("");
    const [calculatorData, setCalculatorData] = useState("");


    const handleInput = (value) => {
        const number = numbers.find((num) => num === value)
        const operator = operators.find((operator) => operator === value)

        switch (value) {
            case "=":
                handleSubmit();
                break;
            case "AC":
                handleClear();
                break;
            case number:
                handleNumbers(value);
                break;
            case ".":
                dotDecimal();
                break;
            case operator:
                handleOperators(value);
                break;
            default:
                break;
        }
    }

    const handleOperators = (value) => {
        if(calculatorData.length) {
            setInput(`${value}`);
            const beforeLastChar = calculatorData.charAt(calculatorData.length - 2);
            const beforeLastCharIsOperator = operators.includes(beforeLastChar) || beforeLastChar === '*';
            const lastChar = calculatorData.charAt(calculatorData.length - 1);
            const lastCharIsOperator = operators.includes(lastChar) || lastChar === "*";

            const validOperator = value === "x" ? "*" : value;

            // condition for 2nd operator as not -
            if((lastCharIsOperator && value !== "-") || (beforeLastCharIsOperator && lastCharIsOperator)){
                if(beforeLastCharIsOperator){
                    const updatedvalue = `${calculatorData.substring(
                        0,
                        calculatorData.length - 2
                      )}${value}`;
                      setCalculatorData(updatedvalue);
                } else {
                    setCalculatorData(`${calculatorData.substring(0, calculatorData.length - 1)}${validOperator}`);
                }
            } else {
                setCalculatorData(`${calculatorData}${validOperator}`);
            }
        }
    }

    const dotDecimal = () => {
        const lastChar = calculatorData.charAt(calculatorData.length - 1);
        if(!calculatorData.length){
            setInput("0.");
            setCalculatorData("0.");
        } else {
            if (lastChar === "*" || operators.includes(lastChar)) {
                setInput("0.");
                setCalculatorData(`${calculatorData} 0.`);
            } else {
                setInput(
                    (lastChar === "." || input.includes('.')) ? `${input}` : `${input}.`
                  );
                  const formattedValue =
                  (lastChar === "." || input.includes('.'))
                    ? `${calculatorData}`
                    : `${calculatorData}.`;
                setCalculatorData(formattedValue);
            }
        }
    }

    const handleNumbers = (value) => {
        if(!calculatorData.length){
            setInput(`${value}`);
            setCalculatorData(`${value}`);
        } else {
            //if you enter 0 and 0 already exists
            if(value === 0 && (calculatorData === "0" || input === "0")){
                setCalculatorData(`${calculatorData}`);
            }
            else {
                const lastChar = calculatorData.charAt(calculatorData.length - 1);
                const isLastCharOperator = lastChar === "*" || operators.includes(lastChar);
                
                setInput(isLastCharOperator ? `${value}` : `${input}${value}`);
                setCalculatorData(`${calculatorData}${value}`);
            }
        }
    }

    const handleSubmit = () => {
        // console.log({ calculatorData });

        const total = eval(calculatorData);
        setInput(`${total}`);
        console.log("input", input);
        console.log("total", total)
        // setOutput(`${total} = ${total}`);
        setCalculatorData(`${total}`);
    }

    const handleClear = () => {
        setInput("0");
        setCalculatorData("");
    }

    useEffect(() => {
        setOutput(calculatorData);
    },[calculatorData]);
    return (
        <div className="container">
            <div className="calculator">
                <Display input={input} output={output}/>
                <Keyboard handleInput={handleInput} />
            </div>
        </div>
    );
}

export default Calculator;
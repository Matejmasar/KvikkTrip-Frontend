import "./HelpPopup.css";
import {useState} from "react";
import {AIHelp} from "../services/apiservice.js";

const HelpPopup = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const askQuestion = async () => {
        const response = await AIHelp(question);
        console.log(response);
        setAnswer(response);
    }

    return(
        <div className="helpPopup">
            <h1>Ask our chatbot for help</h1>
            <div className="inputField">
                <input
                    type="text"
                    id="question"
                    name="question"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => {
                        setQuestion(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') askQuestion()
                    }}
                />
                <input
                    type="button"
                    onClick={askQuestion}
                    value="Ask question"
                />
            </div>
            <div className="outputField">
                {answer}
            </div>
        </div>
    )
}

export default HelpPopup;
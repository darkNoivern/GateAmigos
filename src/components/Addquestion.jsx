import React from 'react'
import { useState, useEffect } from 'react'
import '../styles/addquestion.css'
import { db } from "../firebase.config";
import { auth } from '../firebase.config';
import {
    collection,
    onSnapshot,
    addDoc,
    query,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";
import { useSelector } from 'react-redux';

const Addquestion = () => {

    const substituteData = useSelector(state => state);
    const setter = substituteData.username;

    const [form, setForm] = useState({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        explanation: "",
        answer: -1,
        setter: setter,
    });

    const [check, setCheck] = useState(false);

    const unCheck = () => {
        let checkButtons = document.querySelectorAll(".form-check-input");
        checkButtons.forEach((element) => {
            element.checked = false;
        });
        setCheck(false);
    }

    const addQuestionCollectionRef = collection(db, "addquestion");
    const submitQuestion = () => {
        addDoc(addQuestionCollectionRef, {
            ...form, createdAt: serverTimestamp()
        });
        setForm({
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            explanation: "",
            answer: -1,
            setter: setter,
        });
        unCheck();
    }

    return (
        <>
            <div className="add-question-page px-5 py-4">
                <label for="question" class="mouse400 text-white form-label">Question</label>
                <textarea
                    type="text"
                    value={form.question}
                    onChange={(event) => {
                        setForm({ ...form, question: event.target.value });
                    }}
                    className="mouse400 text-white form-control create-white-blog bg-amigos" />
                <label for="option1" class="mouse400 text-white form-label mt-4">Option 1</label>
                <input
                    type="text"
                    value={form.optionA}
                    onChange={(event) => {
                        setForm({ ...form, optionA: event.target.value });
                    }}
                    className="mouse400 text-white form-control create-white-blog bg-amigos" />
                <label for="option2" class="mouse400 text-white form-label mt-4">Option 2</label>
                <input
                    type="text"
                    value={form.optionB}
                    onChange={(event) => {
                        setForm({ ...form, optionB: event.target.value });
                    }}
                    className="mouse400 text-white form-control create-white-blog bg-amigos" />
                <label for="option3" class="mouse400 text-white form-label mt-4">Option 3</label>
                <input
                    type="text"
                    value={form.optionC}
                    onChange={(event) => {
                        setForm({ ...form, optionC: event.target.value });
                    }}
                    className="mouse400 text-white form-control create-white-blog bg-amigos" />
                <label for="option4" class="mouse400 text-white form-label mt-4">Option 4</label>
                <input
                    type="text"
                    value={form.optionD}
                    onChange={(event) => {
                        setForm({ ...form, optionD: event.target.value });
                    }}
                    className="mouse400 text-white form-control create-white-blog bg-amigos" />
                <label for="option3" class="mouse400 text-white form-label mt-4">Explanation</label>
                <textarea
                    type="text"
                    value={form.explanation}
                    onChange={(event) => {
                        setForm({ ...form, explanation: event.target.value });
                    }}
                    className="mouse400 text-white form-control create-white-blog bg-amigos" />
                
                <div className='text-white pt-4'>
                    <div className="text-white mouse400">Answer</div>
                    <div class="form-check form-check-inline">
                        <input 
                        onClick={()=>{
                            setForm({ ...form, answer: 0 });
                            setCheck(true);
                        }}
                        class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                        <label class="form-check-label" for="inlineRadio1">1</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input 
                        onClick={()=>{
                            setForm({ ...form, answer: 1 });
                            setCheck(true);
                        }}
                        class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                        <label class="form-check-label" for="inlineRadio2">2</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input 
                        onClick={()=>{
                            setForm({ ...form, answer: 2 });
                            setCheck(true);
                        }}
                        class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                        <label class="form-check-label" for="inlineRadio3">3</label>
                    </div>

                    <div class="form-check form-check-inline">
                        <input 
                        onClick={()=>{
                            setForm({ ...form, answer: 3 });
                            setCheck(true);
                        }}
                        class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option3" />
                        <label class="form-check-label" for="inlineRadio4">4</label>
                    </div>
                </div>
                <div className='mt-5 d-flex justify-content-between'>
                    {
                        (!form.question && !form.optionA && !form.optionB && !form.optionC && !form.optionD && !form.explanation && !check)
                            ?
                            <button disabled className='button ui bg-amigos text-white mouse600 curve-btn add-question-button'>Clear All</button>
                            :
                            <button
                                onClick={() => {
                                    setForm({
                                        question: "",
                                        optionA: "",
                                        optionB: "",
                                        optionC: "",
                                        optionD: "",
                                        explanation: "",
                                        answer: -1,
                                        setter: setter,
                                    });
                                    unCheck();
                                }}
                                className='button ui bg-amigos text-white mouse600 curve-btn add-question-button'>Clear All</button>
                    }
                    {
                        (!form.question || !form.optionA || !form.optionB || !form.optionC || !form.optionD || !form.explanation || !check)
                            ?
                            <button disabled className='button ui bg-gate curve-btn mouse600 add-question-button'>Submit</button>
                            :
                            <button
                                onClick={() => { submitQuestion(); }}
                                className='button ui bg-gate curve-btn mouse600 add-question-button'>Submit</button>

                    }
                </div>
            </div>
        </>
    )
}

export default Addquestion
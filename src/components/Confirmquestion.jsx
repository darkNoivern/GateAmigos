import React from 'react'
import '../styles/confirmquestion.css'
import { useState, useEffect, useRef } from 'react'
import { db } from "../firebase.config";
import { auth } from '../firebase.config';
import questionList from '../database/questions';
import {
    collection,
    onSnapshot,
    doc,
    setDoc,
    addDoc,
    deleteDoc,
    query,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const Confirmquestion = () => {

    const [addQuestions, setAddQuestions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [users, setUsers] = useState([]);

    const questionCollectionRef = collection(db, "question");

    const usersCollectionRef = collection(db, "userdetails");

    const addQuestionsCollectionRef = collection(db, "addquestion");
    const sortRef = query(addQuestionsCollectionRef, orderBy('createdAt'));

    const rejectQuestion = (id) => {
        deleteDoc(doc(db, "addquestion", id));
    }

    const acceptQuestion = (this_question) => {

        //  delete from add question list
        deleteDoc(doc(db, "addquestion", this_question.id));

        //  adding it to question list
        const newOBJ = {
            questionnumber: questions.length,
            question: this_question.question,
            a: this_question.optionA,
            b: this_question.optionB,
            c: this_question.optionC,
            d: this_question.optionD,
            answer: this_question.answer,
            explanation: this_question.explanation,
            setter: this_question.setter,
        }

        addDoc(questionCollectionRef, {
            ...newOBJ, createdAt: serverTimestamp()
        });

        //  updating contribution count and answer set
        users.forEach((individualUser, index) => {
            let arr = individualUser.answers;
            arr.push(100);

            if (individualUser.username === this_question.setter) {
                let contri = individualUser.contribution
                const updateOBJ = { ...individualUser, answers: arr, contribution: contri + 1 }
                setDoc(doc(db, 'userdetails', individualUser.id), updateOBJ)
            }
            else {
                const updateOBJ = { ...individualUser, answers: arr }
                setDoc(doc(db, 'userdetails', individualUser.id), updateOBJ)
            }
        })
    }

    useEffect(() => {

        onSnapshot(sortRef, (snapshot) => {
            setAddQuestions(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });

        onSnapshot(questionCollectionRef, (snapshot) => {
            setQuestions(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });

        onSnapshot(usersCollectionRef, (snapshot) => {
            setUsers(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });

    }, []);

    return (
        <>
            {
                (addQuestions.length > 0) ?
                    <div className="p-4 confirm-question-page">
                        {

                            addQuestions.map((question, index) => {
                                return (
                                    <>
                                        <div className='text-white mouse400 p-3 question-pad mb-lg-5 mb-4'>
                                            <Link className='text-gate' exact to={`/user/${question.setter}`}>
                                                {question.setter}
                                            </Link>
                                            <div className="question-display py-2">
                                                Question : {question.question}
                                            </div>
                                            <div className="question-display py-2">
                                                Option A : {question.optionA}
                                            </div>
                                            <div className="question-display py-2">
                                                Option B : {question.optionB}
                                            </div>
                                            <div className="question-display py-2">
                                                Option C : {question.optionC}
                                            </div>
                                            <div className="question-display py-2">
                                                Option D : {question.optionD}
                                            </div>
                                            <div className="question-display py-2">
                                                Answer : Option {question.answer + 1}
                                            </div>
                                            <div className="question-display py-2">
                                                Explanation : {question.explanation}
                                            </div>
                                            <div className='d-flex justify-content-between mt-2'>
                                                <button
                                                    onClick={() => { rejectQuestion(question); }}
                                                    className="ui button bg-danger curve-btn text-white mouse600">Reject</button>
                                                <button
                                                    onClick={() => { acceptQuestion(question); }}
                                                    className="ui button bg-success curve-btn text-white mouse600">Accept</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    :
                    <>
                        <div className="p-4 confirm-question-page text-white mouse400 error-page-text no-question flexy">
                            <div>
                                <div className='text-white mouse400 error-page-text'>
                                    {/* Error 404 Page */}
                                    No Question Suggestions left to check
                                </div>
                                <div className='d-flex justify-content-evenly my-4'>
                                    <Link exact to="/problems" className="button mx-0 ui bg-gate mouse600 text-amigos">
                                        Go Back To Problems
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default Confirmquestion
import React from 'react'
import { useState, useEffect } from 'react'
import DoneIcon from '@mui/icons-material/Done';
import '../styles/problems.css'
import { useNavigate } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { db } from "../firebase.config";
import { auth } from '../firebase.config';
import {
    collection,
    onSnapshot,
    doc,
    addDoc,
    setDoc,
    deleteDoc,
    query,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";

const Skeletonproblems = () => {

    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);

    const questionCollectionRef = collection(db, "question");
    const sortQuestionRef = query(questionCollectionRef, orderBy('questionnumber'))

    useEffect(() => {

        onSnapshot(sortQuestionRef, (snapshot) => {
            setQuestions(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });

    }, [])

    return (
        <>
            <div className='page px-3 px-md-5 py-5'>
                <div className="row mx-0">
                    {
                        (questions.length === 0)
                            ?
                            [...Array(6)].map((element, index) => {
                                return (
                                    <>
                                        <SkeletonTheme baseColor="#242333" highlightColor="#808080">
                                            <div key={index} className='d-flex justify-content-center col col-4 col-sm-2 my-2'>
                                                <Skeleton className='ui basic button skeleton-problemButton' />
                                            </div>
                                        </SkeletonTheme>
                                    </>
                                )
                            })
                            :
                            questions.map((element, index) => {
                                return (
                                    <>
                                        <div key={index} className='d-flex justify-content-center col col-4 col-sm-2 my-2'>
                                            <button
                                                onClick={() => { navigate(`/question/${index + 1}`) }}
                                                className='ui inverted basic button problemButton'>
                                                {index + 1}
                                            </button>
                                        </div>
                                    </>
                                )
                            })
                    }
                </div>
            </div>
        </>
    )
}

export default Skeletonproblems
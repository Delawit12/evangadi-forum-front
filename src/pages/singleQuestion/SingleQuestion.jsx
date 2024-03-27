import axios from "../../utility/axios";
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './questionDetail.css'
import AnswerQuestion from '../../components/AnswerQuestion/AnswerQuestion';
import Answer from '../../components/answers/Answers';
import { useStateValue } from "../../utility/stateprovider";
import moment from 'moment';

const SingleQuestion = () => {
  let params = useParams();
   const [{ user }, dispatch] = useStateValue();
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [userInfo, setUserInfo] = useState();
   const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // console.log(user);

  }, [user, navigate])
  
  const answersByQuestionId = async (data) => {
    try {
      console.log("params.id",params.id) 
      const answersRes = await axios.get(
        `/api/answers/${params.id}`
      );
      console.log('answersRes',answersRes)
      setAnswers(answersRes.data.data);
       console.log(answersRes.data.data)
    } catch (err) {
      console.error("Problem:", err);
    }
    };
  
  useEffect(() => {
    async function fetchData() {
      try {
        // console.log(params.id) 
        const response = await axios.get(`/api/questions/${params.id}`);// Remove the ":" before `${params.id}`
        // console.log("response",response)
        setQuestion(response.data.data);
        // console.log(response.data.data.questionId);
      
    
        
        // Call answersByQuestionId with the fetched data, assuming it takes a single argument
        answersByQuestionId(response.data.data);
      } catch (err) {
        // alert(err.message); // Use err.message to display the error message
        console.error("Problem:", err);
        console.error("Problem:", err.message);
      }
}
    fetchData();
  }, [params.id]);
  

  
//  console.log(userInfo);
  return (
    <div className="container">
      <h2>Question </h2>
      <h4>{question?.question}</h4>
       <h5>{question?.category}</h5>
      <h5>{question?.questionDescription}</h5>
      <p>{moment(question?.insertedDatetime).format("HH:mm:ss MM/DD/YYYY")}</p>
      <hr />
      <hr />
      <div>{answers.length > 0 && <h3>Answer From The Community</h3>}</div>
          {answers && answers?.map((answer) => (
        
            <Answer key={answer?.answerId} answer={answer?.answer} userName={answer.username} profile={answer.imageUrl} answered_date={ answer.answeredDate} />
       
      ))}
      <AnswerQuestion questionId={question?.questionId}/>
      <hr />
    </div>

  )
}

export default SingleQuestion

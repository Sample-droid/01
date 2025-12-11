import React, { useState } from 'react';
import { quizData } from './QuizData.js';
import { Container, Row, Col } from 'react-bootstrap';
import {
  Card,
  CardContent,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Select,
  MenuItem
} from '@mui/material';
import './EcoQuiz.css';

const EcoQuiz = () => {
  const categories = ['All', ...new Set(quizData.map(q => q.category))];
  const [stage, setStage] = useState('select');  
  const [category, setCategory] = useState('All');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState('');
  const [score, setScore] = useState(0);
  const [showFact, setShowFact] = useState(false);

  const startQuiz = () => {
    const pool = category === 'All'
      ? quizData
      : quizData.filter(q => q.category === category);
    setQuestions(pool);
    setStage('quiz');
    setCurrent(0);
    setScore(0);
    setShowFact(false);
  };

  const handleAnswer = () => {
    const correct = questions[current].answer === selected;
    if (correct) setScore(prev => prev + 1);
    setShowFact(true);
  };

  const nextQ = () => {
    if (current + 1 < questions.length) {
      setCurrent(prev => prev + 1);
      setSelected('');
      setShowFact(false);
    } else {
      setStage('results');
    }
  };

  return (
    <Container className="ecoquiz-container">
      {stage === 'select' && (
        <Card className="ecoquiz-card">
          <CardContent>
            <Typography variant="h4" className="ecoquiz-title">
              🌱 Eco-Quiz
            </Typography>
            <Typography className="ecoquiz-subtitle">
              Test your knowledge and learn about our planet!
            </Typography>
            <Typography>Select a category:</Typography>
            <Select
              className="ecoquiz-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
              fullWidth
            >
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              color="success"
              onClick={startQuiz}
              fullWidth
              className="ecoquiz-button"
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      )}

      {stage === 'quiz' && questions.length > 0 && (
        <>
          <Row className="mb-3 w-100">
            <Col>
              <LinearProgress
                variant="determinate"
                value={((current) / questions.length) * 100}
              />
            </Col>
          </Row>

          <Card className="ecoquiz-card">
            <CardContent>
              <Typography variant="h6" color="primary">
                Question {current + 1} of {questions.length}
              </Typography>
              <Typography gutterBottom className="ecoquiz-question">
                {questions[current].question}
              </Typography>

              <RadioGroup
                value={selected}
                onChange={e => setSelected(e.target.value)}
              >
                {questions[current].options.map(opt => (
                  <FormControlLabel
                    key={opt}
                    value={opt}
                    control={<Radio color="success" />}
                    label={opt}
                    disabled={showFact}
                    className="ecoquiz-answer"
                  />
                ))}
              </RadioGroup>

              {!showFact && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleAnswer}
                  disabled={!selected}
                  className="ecoquiz-button"
                >
                  Submit
                </Button>
              )}

              {showFact && (
                <>
                  <Typography
                    className="ecoquiz-feedback"
                    color={
                      selected === questions[current].answer
                        ? 'success.main'
                        : 'error.main'
                    }
                  >
                    {selected === questions[current].answer
                      ? '✅ Correct!'
                      : `❌ Wrong! The right answer is "${questions[current].answer}".`}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    💡 {questions[current].fact}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={nextQ}
                    className="ecoquiz-button"
                    sx={{ mt: 2 }}
                  >
                    Next
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {stage === 'results' && (
        <Card className="ecoquiz-card">
          <CardContent style={{ textAlign: 'center' }}>
            <Typography variant="h4" className="ecoquiz-title">
              🌍 Quiz Complete!
            </Typography>
            <Typography variant="h5">
              You scored {score} / {questions.length}
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={() => setStage('select')}
              className="ecoquiz-button"
            >
              Retake Quiz
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default EcoQuiz;
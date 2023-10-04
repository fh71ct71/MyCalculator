import React, { useEffect, useRef, useState } from 'react'
import * as math from 'mathjs'

const App = () => {

  const [expressionValue, setExpressionValue] = useState('0')
  const [result, setResult] = useState('0')
  const [newTerm, setNewTerm] = useState('')
  const [extraOperatorsStatus, setExtraOperatorsStatus] = useState(false)

  const newTermRef = useRef()
  const expressionValueRef = useRef()
  const resultRef = useRef()
  const extraOperatorsStatusRef = useRef()

  useEffect(() => {
    newTermRef.current = newTerm
    expressionValueRef.current = expressionValue
    extraOperatorsStatusRef.current = extraOperatorsStatus

    try {
      setResult(math.evaluate(expressionValue).toString())

    } catch (error) {
      console.log(error.message)

    }

  }, [expressionValue])

  useEffect(() => {
    resultRef.current = result

  }, [result])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => { window.removeEventListener('keydown', handleKeyDown) }

  }, [])

  const handleKeyDown = (event) => {
    if (/^[0-9()+\-*/]+$/.test(event.key)) updateExpression(event.key)
    else if (event.key === 'Backspace') del()
    else if (event.key === '.') dot()
    else if (event.key === 'Enter') {
      event.preventDefault()
      setExpressionValue(resultRef.current)

    }
    else event.preventDefault()

  }

  const updateExpression = (val) => {
    if (expressionValueRef.current === '0' && val !== '+' && val !== '-' && val !== '*' && val !== '/') setExpressionValue(val)
    else if (expressionValueRef.current !== '0' && val !== '+' && val !== '-' && val !== '*' && val !== '/') setExpressionValue((prev) => prev + val)
    else if (expressionValueRef.current !== '0' && (val === '+' || val === '-' || val === '*' || val === '/') && !extraOperatorsStatusRef.current) {
      setExpressionValue((prev) => prev + val); setExtraOperatorsStatus(true)

    }
    if (val === '+' || val === '-' || val === '*' || val === '/') setNewTerm('')
    else {

      setNewTerm(newTermRef.current + val); setExtraOperatorsStatus(false)
    }

  }

  function dot() {
    if (!newTermRef.current.includes('.')) {
      setNewTerm(newTermRef.current + '.')
      setExpressionValue(expressionValueRef.current + '.')

    }

  }

  function del() {
    if (expressionValueRef.current !== '0') setExpressionValue(expressionValueRef.current.slice(0, -1))
    if (newTermRef.current !== '') setNewTerm(newTermRef.current.slice(0, -1))
    if (newTermRef.current === '') setExtraOperatorsStatus(false)

  }

  return (<>
    <div className='row mt-3 mb-5'>
      <div className='col col-md-1 text-bg-primary border border-warning border-3 rounded-4 text-center ms-2 p-2' title='Option coming soon!'>Menu</div>
      <div className='col'></div>
      <div className='col-5 col-sm-4 col-md-3 col-lg-2 text-bg-secondary border border-warning border-3 rounded-4 text-center p-2' onClick={() => window.location.reload()}>MyCalculator</div>
      <div className='col'></div>
      <div className='col col-md-1 me-2 p-2'></div>
    </div>
    <div className='row mb-5'>
      <div className='col'></div>
      <div className='col-9 col-sm-8 col-md-6 col-lg-5 text-bg-dark border border-warning border-5 rounded-4 p-2'>
        <div className='row mt-3 mb-4'>
          <div className="col"></div>
          <div className="col-10 text-bg-secondary rounded-2 p-2 border border-2 border-white">
            <div className='p-1 fs-6 text-end'>{expressionValue === '' ? 0 : expressionValue}</div>
            <div className='p-1 fs-5 text-end'>{expressionValue === '' ? 0 : result}</div>
          </div>
          <div className="col"></div>
        </div>
        <div className='row mb-3 p-2'>
          <div className="col text-bg-danger mx-4 p-2 rounded-2 text-center" onClick={() => { setExpressionValue('0'); setNewTerm('') }}>AC</div>
          <div className="col text-bg-primary me-4 p-2 rounded-2 text-center" onClick={() => updateExpression('(')}>(</div>
          <div className="col text-bg-primary me-4 p-2 rounded-2 text-center" onClick={() => updateExpression(')')}>)</div>
          <div className="col text-bg-danger me-4 p-2 rounded-2 text-center" onClick={del}>Del</div>
        </div>
        <div className='row mb-3 p-2'>
          <div className="col text-bg-info mx-4 p-2 rounded-2 text-center" onClick={() => updateExpression('1')}>1</div>
          <div className="col text-bg-info me-4 p-2 rounded-2 text-center" onClick={() => updateExpression('2')}>2</div>
          <div className="col text-bg-info me-4 p-2 rounded-2 text-center" onClick={() => updateExpression('3')}>3</div>
          <div className="col text-bg-primary me-4 p-2 rounded-2 text-center" onClick={() => updateExpression('/')}>/</div>
        </div>
        <div className='row mb-3 p-2'>
          <div className="col text-bg-info mx-4 p-2 rounded-2 text-center" onClick={() => updateExpression('4')}>4</div>
          <div className="col text-bg-info me-4 p-2 rounded-2 text-center" onClick={() => updateExpression('5')}>5</div>
          <div className="col text-bg-info me-4 p-2 rounded-2 text-center" onClick={() => updateExpression('6')}>6</div>
          <div className="col text-bg-primary me-4 p-2 rounded-2 text-center" onClick={() => updateExpression('*')}>*</div>
        </div>
        <div className='row mb-3 p-2'>
          <div className="col text-bg-info mx-4 p-2 rounded-2 text-center" onClick={() => updateExpression('7')}>7</div>
          <div className="col text-bg-info me-4 p-2 rounded-2 text-center" onClick={() => updateExpression('8')}>8</div>
          <div className="col text-bg-info me-4 p-2 rounded-2 text-center" onClick={() => updateExpression('9')}>9</div>
          <div className="col text-bg-primary me-4 p-2 rounded-2 text-center" onClick={() => updateExpression('-')}>-</div>
        </div>
        <div className="row mb-3 p-2">
          <div className="col text-bg-info mx-4 p-2 rounded-2 text-center" onClick={dot}>.</div>
          <div className="col text-bg-info me-4 p-2 rounded-2 text-center" onClick={() => updateExpression('0')}>0</div>
          <div className="col text-bg-primary me-4 p-2 rounded-2 text-center" onClick={() => { setExpressionValue(result) }}>=</div>
          <div className="col text-bg-primary me-4 p-2 rounded-2 text-center" onClick={() => updateExpression('+')}>+</div>
        </div>
      </div>
      <div className='col'></div>
    </div>
  </>)

}

export default App
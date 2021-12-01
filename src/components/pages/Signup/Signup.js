import React, { useRef, useState, useEffect, useReducer } from 'react';
import inputData from './inputData.js';
import SignupSVG from '@assets/signup.svg';
import { useFetch } from '@components/hooks.js';

import './signup.css';

const createForm = (form) => {
	const data = new FormData(form);
	const obj = {};
	data.forEach((value, key) => obj[key] = value);
	const json = JSON.stringify(obj);
	return json;
}

const Message = (props) => {
	const { content, type } = props;

	return (
		<section className={`message ${type}`}>
			<p>{content}</p>
		</section>
	)
}

const SignupInfo = (props) => {
	const { name, type, placeholder, pattern, minLength, maxLength, requirements } = props.content;
	const [inputValue, setInputValue] = useState('');
	const [requirementsDisplay, setRequirementsDisplay] = useState("block");

	const reqInfoCtn = useRef(null);

	useEffect(() => {
		const infosRight = reqInfoCtn.current.querySelectorAll('.right');
		if (infosRight.length == requirements.length) {
			setRequirementsDisplay("none");
		} else setRequirementsDisplay("block");
	}, [inputValue]);

	return (
		<>
			<label htmlFor={name}></label>
			<input name={name} minLength={minLength} maxLength={maxLength}
				pattern={pattern} type={type} placeholder={placeholder} 
				onChange={(e) => setInputValue(e.target.value)}/>
			<div ref={reqInfoCtn} className="req-info-cnt" style={{display: requirementsDisplay}}>
				{inputValue.length > 0 && requirements.map(req => 
					{ return <Requirement text={req.name} inputValue={inputValue} isValid={req.checkValidity}/> })}
			</div>
		</>
	)
}

const Requirement = (props) => {
	const { text, inputValue, isValid} = props;
	const para = useRef(null);

	useEffect(() => {
		if (isValid(inputValue)) {
			para.current.classList.remove("wrong");
			para.current.classList.add("right");
		} else {
			para.current.classList.remove("right");
			para.current.classList.add("wrong");
		}
	}, [inputValue]);

	return (
		<p ref={para} className="input-info wrong">{text}</p>	
	)
}

const Signup = () => {
	const form = useRef(null);
	const [message, setMessage] = useState({ status: false, type: '', content: '' });
	const [timer, setTimer] = useState(null);

	useEffect(() => {
		if (message.status) {
			clearTimeout(timer);
			setTimer(setTimeout(() => {
				setMessage({status: false, type: '', content: ''});
			}, 5000));
		}
	}, [message])

	const sendRequest = async (e) => {
		e.preventDefault();
		const data = createForm(form.current);
		const response = await useFetch('/api/signup', 'POST', data);
		if (response.type == 'error') {
			setMessage({
				status: true,
				type: 'error',
				content: response.content
			})
		} else {
			window.location.href = '/entrar';
		}
	}

	return (
		<section id="signup-page">
			<SignupSVG />
			<div className="bubble-ctn">
				<div className="bubble light-blue"></div>
				<div className="bubble darker-blue"></div>
			</div>
			<h2>Cadastre-se</h2>
			<p className="subtitle">E veja o quanto se dedica a cada tarefa ao longo do seu dia!</p>
			{message.status && <Message type={message.type} content={message.content} />}
			<form ref={form} autoComplete="off">
				{inputData.map(data => { return <SignupInfo content={data} /> })}
				<button className="confirm" onClick={(e) => sendRequest(e)}>Cadastrar</button>
			</form>
		</section>
	)
}

export default Signup;

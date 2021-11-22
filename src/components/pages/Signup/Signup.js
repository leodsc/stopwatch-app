import React, { useRef, useState, useEffect } from 'react';
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
			});
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
				<label htmlFor="name"></label>
				<input name="name" placeholder="Nome" minLength="3" maxLength="20"/>
				<label htmlFor="email"></label>
				<input name="email" placeholder="Email" type="email"/>
				<label htmlFor="password"></label>
				<input name="password" placeholder="Senha" type="password"/>
				<label htmlFor="confirm-password"></label>
				<input name="confirm-password" placeholder="Confirmar Senha" type="password"/>
				<button className="confirm" onClick={(e) => sendRequest(e)}>Cadastrar</button>
			</form>
		</section>
	)
}

export default Signup;

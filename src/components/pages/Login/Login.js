import React, { useState, useRef, useEffect } from "react";
import WelcomeSVG from "@assets/welcome.svg";
import { useFetch } from "@components/hooks.js";

import "./login.css";

const createForm = (form) => {
	const data = new FormData(form);
	const obj = {};
	data.forEach((value, key) => (obj[key] = value));
	const json = JSON.stringify(obj);
	return json;
};

const Welcome = () => {
	const welcome = useRef(null);
	const [status, setStatus] = useState(false);
	const form = useRef(null);

	return (
		<main>
			{
				<section ref={welcome} className="welcome-page">
					<WelcomeSVG />
					<p>
						Digite seu e-mail e senha para entrar ou
						<span
							onClick={() => (window.location.href = "/cadastrar")}
							className="create-acc"
						>
							crie uma conta.
						</span>
					</p>
					<form ref={form}>
						<input name="email" type="email" placeholder="Email" />
						<input name="password" type="password" placeholder="Senha" />
					</form>
					<Remember status={status} setStatus={setStatus} />
					<button
						className="confirm"
						onClick={async (e) => {
							e.preventDefault();
							const formData = createForm(form.current);
							const response = await useFetch("/api/login", "POST", formData);
						}}
					>
						Entrar
					</button>
				</section>
			}
		</main>
	);
};

const Remember = (props) => {
	const { status, setStatus } = props;
	const inner = useRef(null);

	return (
		<div className="remember">
			<div
				onClick={(e) => {
					if (!status) {
						inner.current.classList.add("move-in");
						e.currentTarget.classList.add("status-on");
					} else {
						inner.current.classList.remove("move-in");
						e.currentTarget.classList.remove("status-on");
					}
					setStatus(!status);
				}}
				className="outer"
			>
				<div ref={inner} className="inner"></div>
			</div>
			<p>Lembrar-me</p>
		</div>
	);
};

// const useMessage = (status) => {
// 	const message = {
// 		status: false,
// 		type: '',
// 		content: ''
// 	}

// 	const setMessage = (status=false, type='', content='') => {
// 		message.status = status;
// 		message.type = type;
// 		message.content = content;
// 	}

// 	return [message, setMessage];
// }

export default Welcome;

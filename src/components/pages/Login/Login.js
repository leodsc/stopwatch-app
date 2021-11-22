import React, {useState, useRef, useEffect} from 'react';
import WelcomeSVG from '@assets/welcome.svg';

import './login.css';

const Welcome = () => {
	const welcome = useRef(null);
	const [status, setStatus] = useState(false);
	const [currentPage, setCurrentPage] = useState('login');

	return (
		<main>
			{<section ref={welcome} className="welcome-page">
				<WelcomeSVG />
				<p>Digite seu e-mail e senha para entrar ou 
					<span onClick={() => window.location.href = "/cadastrar"}
					className="create-acc">crie uma conta.</span>
				</p>
				<input type="email" placeholder="Email"/>
				<input type="password" placeholder="Senha"/>
				<Remember status={status} setStatus={setStatus} />
				<button className="confirm">Entrar</button>
			</section>}
		</main>
	)
}

const Remember = (props) => {
	const { status, setStatus } = props; 
	const inner = useRef(null);

	return (
		<div className = "remember">
			<div onClick={(e) => {
				if (!status) {
					inner.current.classList.add('move-in');
					e.currentTarget.classList.add('status-on');
				} else {
					inner.current.classList.remove('move-in');
					e.currentTarget.classList.remove('status-on');
				}
				setStatus(!status);
			}} className="outer">
				<div ref={inner} className="inner"></div>
			</div>
			<p>Lembrar-me</p>
		</div>
	)
}

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

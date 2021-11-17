import React, {useState, useRef} from 'react';
import WelcomeSVG from '@src/assets/welcome.svg';
import SignupSVG from '@src/assets/signup.svg';

import './signup.css';
import './welcome.css';

const Welcome = () => {
	const welcome = useRef(null);
	const [status, setStatus] = useState(false);
	const [currentPage, setCurrentPage] = useState('login');

	return (
		<main>
			{currentPage == 'login' && <section ref={welcome} className="welcome-page">
				<WelcomeSVG />
				<p>Digite seu e-mail e senha para entrar ou 
					<span onClick={() => {
						welcome.current.classList.add('signup');
						setTimeout(() => {
							setCurrentPage('signup');
						}, 500)}}
					className="create-acc">crie uma conta.</span>
				</p>
				<input type="email" placeholder="Email"/>
				<input type="password" placeholder="Senha"/>
				<Remember status={status} setStatus={setStatus} />
				<button className="confirm">Entrar</button>
			</section>}
			{currentPage == 'signup' && <Signup />} 
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

const Signup = () => {
	return (
		<section id="signup-page">
			<SignupSVG />
			<div className="bubble-ctn">
				<div className="bubble light-blue"></div>
				<div className="bubble darker-blue"></div>
			</div>
			<h2>Cadastre-se</h2>
			<p>E veja o quanto se dedica a cada tarefa ao longo do seu dia!</p>
			<form>
				<input placeholder="Nome"/>
				<input placeholder="Email" type="email"/>
				<input placeholder="Senha" type="password"/>
				<input placeholder="Confirmar Senha" type="password"/>
				<button className="confirm">Cadastrar</button>
			</form>
		</section>
	)
}

export default Welcome;

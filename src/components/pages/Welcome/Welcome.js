import React, {useState, useRef} from 'react';
import WelcomeSVG from '@src/assets/welcome.svg';
import './welcome.css';

const Welcome = () => {
	const [status, setStatus] = useState(false);

	return (
		<main id="welcome-page">
			<WelcomeSVG />
			<p>Digite seu e-mail e senha para entrar ou <span className="create-acc">crie uma conta.</span></p>
			<input type="email" placeholder="Email"/>
			<input type="password" placeholder="Senha"/>
			<Remember status={status} setStatus={setStatus} />
			<button className="confirm">Entrar</button>
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

export default Welcome;

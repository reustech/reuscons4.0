import React from 'react';
import FormGroup from '../../UI/FormGroup/FormGroup.jsx';
import Button from '../../UI/Button/Button.jsx';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage.jsx';
import TestCredentials from './TestCredentials.jsx';

export default function LoginForm({ errorMessage }) {
	const formContainerStyles = {
		width: '100%',
		maxWidth: '380px',
	};

	const welcomeStyles = {
		fontSize: '2.5rem',
		fontWeight: '700',
		color: '#1f2937',
		margin: '0 0 1rem 0',
		lineHeight: '1.2',
	};

	const subtitleStyles = {
		fontSize: '0.95rem',
		color: '#6b7280',
		marginBottom: '2rem',
		lineHeight: '1.5',
	};

	return (
		<div style={formContainerStyles}>
			<h2 style={welcomeStyles}>Welcome Back</h2>
			<p style={subtitleStyles}>Enter your email and password to access your account</p>

			{errorMessage && <ErrorMessage message={errorMessage} />}

			<form method="POST">
				<FormGroup
					label="Email"
					id="username"
					name="username"
					placeholder="Enter your email"
					required
				/>

				<FormGroup
					label="Password"
					id="password"
					name="password"
					type="password"
					placeholder="Enter your password"
					required
				/>

				<Button type="submit">Sign In</Button>
			</form>

			<TestCredentials />
		</div>
	);
}

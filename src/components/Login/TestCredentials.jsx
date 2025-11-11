export default function TestCredentials() {
	const containerStyles = {
		marginTop: '2rem',
		paddingTop: '1.5rem',
		borderTop: '1px solid #e5e7eb',
		fontSize: '0.8rem',
		color: '#9ca3af',
		textAlign: 'center',
	};

	const paragraphStyles = {
		margin: '0.3rem 0',
	};

	const strongStyles = {
		color: '#667eea',
	};

	return (
		<div style={containerStyles}>
			<p style={paragraphStyles}>
				<strong style={strongStyles}>Demo Credentials:</strong>
			</p>
			<p style={paragraphStyles}>
				Admin: <strong style={strongStyles}>admin</strong> / <strong style={strongStyles}>admin</strong>
			</p>
			<p style={paragraphStyles}>
				User: <strong style={strongStyles}>user</strong> / <strong style={strongStyles}>user</strong>
			</p>
		</div>
	);
}

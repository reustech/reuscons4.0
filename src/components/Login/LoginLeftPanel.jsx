import BigText from './BigText.jsx';
import SmallText from './SmallText.jsx';
import Paragraph from './Paragraph.jsx';

export default function LoginLeftPanel() {
	return (
		<div>
			<SmallText>A Wise Quote</SmallText>
			<BigText>Get Everything You Want</BigText>
			<Paragraph color="rgba(255, 255, 255, 0.9)">
				You can get everything you want if you work hard, trust the process, and stick to the plan.
			</Paragraph>
		</div>
	);
}

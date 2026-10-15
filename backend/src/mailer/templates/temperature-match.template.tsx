import { Body, Head, Html, Tailwind } from "react-email";

export interface TemperatureMatchTemplateProps {
	temperature: number;
}

const TemperatureMatchTemplate = ({
	temperature,
}: TemperatureMatchTemplateProps) => (
	<Html>
		<Head />
		<Tailwind>
			<Body>
				<div className="flex h-dvh items-center justify-center">
					<p>{temperature} C</p>
				</div>
			</Body>
		</Tailwind>
	</Html>
);

export default TemperatureMatchTemplate;

import React, { ReactNode } from "react";
import "./Card.scss";

type propsType = {
	children: ReactNode;
	style: string;
};
const Card = ({ style, children }: propsType) => {
	return <div className={`${style} Card`}>{children}</div>;
};

export default Card;

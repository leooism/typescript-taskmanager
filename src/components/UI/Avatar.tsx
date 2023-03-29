import React from "react";

import "./Avatar.scss";
type PropsType = {
	imgUrl: string;
	style?: string;
};
const Avatar = ({ imgUrl, style }: PropsType) => {
	return <img src={imgUrl} alt="" className={`${style}`} />;
};

export default Avatar;

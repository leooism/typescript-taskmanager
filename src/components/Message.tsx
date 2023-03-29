import React from "react";
import { dateFormater } from "../util/DateFormator";
type message = {
	id: string;
	msgTitle: string;
	msgDate: Date;
	imgSrc: string;
	status?: "checked | unchecked";
};

const Message = ({ id, msgTitle, msgDate, imgSrc, status }: message) => {
	return (
		<div className="msg selected-bg anim-y">
			<input
				type="checkbox"
				name="msg"
				id={id}
				className="mail-choice"
				checked
			/>
			<label htmlFor="mail1"></label>
			<div className="msg-content">
				<div className="msg-title">{msgTitle}</div>
				<div className="msg-date">{dateFormater(msgDate)}</div>
			</div>
			<img src={imgSrc} alt="" className="members mail-members" />
		</div>
	);
};

export default Message;

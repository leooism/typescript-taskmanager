import React from "react";
import Avatar from "./UI/Avatar";
import { dateFormater } from "../util/DateFormator";
import { notification } from "../App";
import "./Notification.scss";

const Notification = ({ message, name, imageUrl, date }: notification) => {
	return (
		<div className="notification">
			<Avatar imgUrl={imageUrl} style="members" />
			<div className="notification-detail">
				<div className="detail-name">{name}</div>
				<div className="notification-msg">{message} </div>
				<div className="notification-date">
					<span>
						{dateFormater(new Date(date), {
							day: "numeric",
							month: "long",
						})}
					</span>
					<span>
						{dateFormater(new Date(date), {
							year: "numeric",
						})}
					</span>{" "}
				</div>
			</div>
		</div>
	);
};

export default Notification;

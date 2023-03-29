import { useState } from "react";
import Avatar from "./UI/Avatar";
import { dateFormater } from "../util/DateFormator";
import { notification } from "../App";
import { makeId } from "../util/IdGenerator";
import Notification from "./Notification";
import "./NotificationList.scss";
const NotificationList = ({ onShowNotify }: { onShowNotify: Function }) => {
	const [notifications, setNotifications] = useState<notification[]>([
		{
			id: makeId(),
			name: "Natlie Smith",
			message: "Lorem is the best thing in the world",
			date: new Date(),
			imageUrl:
				"https://assets.codepen.io/3364143/Screen+Shot+2020-08-01+at+12.24.16.png",
		},
	]);
	const showProfile = () => onShowNotify();
	return (
		<div className="side-wrapper">
			<div className="project-title">Notifications 🔔</div>
			<div className="notifications">
				{notifications.map((notifi) => {
					return (
						<Notification
							id={notifi.id}
							name={notifi.name}
							message={notifi.message}
							date={notifi.date}
							imageUrl={notifi.imageUrl}
						/>
					);
				})}
			</div>
			<div className="notify" onClick={showProfile}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="bi bi-black"
					viewBox="0 0 16 16"
				>
					<path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z" />
				</svg>
			</div>
		</div>
	);
};

export default NotificationList;

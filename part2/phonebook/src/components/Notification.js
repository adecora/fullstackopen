import React from "react";

const Notification = ({ message, type }) => {
    if (message === null) {
        return null;
    }

    const notificationStyle =
        type === "error" ? { color: "red" } : { color: "green" };

    return (
        <div style={notificationStyle} className="notification">
            {message}
        </div>
    );
};

export default Notification;

import Config from "../config";
import React from "react";

const Picture = ({user = {}, group = false, picture, title = "Group"}) => {
    if (group) {
        if (picture)
            return <img src={`${Config.url || ''}/api/images/${picture.shieldedID}/256`} alt="Picture" className="picture"/>;
        else
            return <div className="img">{title.substr(0,1).toUpperCase()}</div>;
    }

    let firstName = user.firstName || "User";
    let lastName = user.lastName || "Name";
    if (user.picture)
        return <img src={`${Config.url || ''}/api/images/${user.picture.shieldedID}/256`} alt="Picture" className="picture"/>;
    else
        return <div className="img">{firstName.substr(0,1).toUpperCase()}{lastName.substr(0,1).toUpperCase()}</div>;
};

export default Picture;

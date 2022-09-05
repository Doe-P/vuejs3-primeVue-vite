import User from "../User";
import Base from "../Base";

export default function Credential() {
    Base.call(this);
    this.token_type = "Bearer";
    this.User = new User();
    this.access_token = null;

    this.fromJSON = (json) => {
        this.access_token = json.access_token;
        this.User = json.user;
    }
}
import Base from "./Base";
export default function User() {
    Base.call(this);
    this.id = null;
    this.credential = null;
    this.password = null;

    this.fromJSON = (json) => {
        this.id = json.id;
        this.credential = json.email;
        this.password = json.password;
    };
}


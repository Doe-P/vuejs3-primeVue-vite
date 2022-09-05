export default function Base() {
    this.toString = () => JSON.stringify(this);
};

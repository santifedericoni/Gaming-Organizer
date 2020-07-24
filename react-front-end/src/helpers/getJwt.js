export default function getJwt() {
  return `bearer ${localStorage.getItem("jwt-token")}`;
}

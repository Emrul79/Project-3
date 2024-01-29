import Star from "../assets/star.svg";
// eslint-disable-next-line react/prop-types
export default function Rating({ value }) {
  const starts = Array(value).fill(Star);
  return (
    <>
      {starts.map((star, index) => {
        return <img key={index} src={star} width="14" height="14" alt="star" />;
      })}
    </>
  );
}

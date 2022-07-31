import unixToStandard from "../../util/unixToStandard";
import "./DisplayCard.css";
interface ItemsFormat {
  items: { dt: number; temp: number; description: string; place: string };
}
const DisplayCard: React.FC<ItemsFormat> = ({ items }) => {
  const dt = unixToStandard(items.dt);
  const temp = Number(items.temp).toFixed(1);
  const description = items.description;
  const svg = description.includes("rain") ? "rainy-7.svg" : "cloudy-day-1.svg";
  const backImg = description.includes("rain") ? "rainy.jpg" : "sunny.jpg";
  const place = items.place;

  return (
    <div
      className="displayCard"
      style={{
        backgroundImage: `linear-gradient(135deg, #72eef25a 10%, #5151e555 100%),url('./assets/img/${backImg}')`,
      }}
    >
      <div className="upper">
        <h2 className="day">{dt.dayLong}</h2>
        <p className="date">
          {dt.dateShort} {dt.monthLong} {dt.yearShort}
        </p>
        <div className="location">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="location-icon"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <p className="location-place">{place}</p>
        </div>
      </div>
      <div className="lower">
        <img
          className="svgIcon"
          src={`./assets/icons/${svg}`}
          alt="Logo of weather"
        />
        <p className="temperature">{temp}°C</p>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};
export default DisplayCard;

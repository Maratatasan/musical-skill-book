export interface AdData {
  title: string;
  skill: string;
  city: string;
  about: string;
  musicGenre: string;
  addType: string;
}


export function Ad(props: AdData): JSX.Element {

  const { title, skill, city, about, musicGenre, addType } =
    props;

  function s(text: string) {
    return <strong>{text}</strong>;
  }
  return (
    <div
      style={{
        border: "solid 1px grey",
        padding: "10px",
        margin: "10px",
        boxSizing: "border-box",
        width: "1000px",
      }}
    >
      <h1>{title}</h1>
      <p>skill: {s(skill)}</p>
      <p>city: {s(city)}</p>
      <p>about: {about}</p>
      <p>music genre: {s(musicGenre)}</p>
    </div>
  );
}

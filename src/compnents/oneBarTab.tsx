interface OneBarTabPropsInterface {
  text: string;
  index: number;
}

interface localTabStyleInterface {
  padding: string;
  borderRight: string;
  borderLeft?: string;
}
export function OneBarTab(props: OneBarTabPropsInterface) {
  let { text, index } = props;

  let localStyle: localTabStyleInterface = {
    padding: "5px",
    borderRight: "solid 1px lightgrey",
  };

  if (index === 0) {
    localStyle.borderLeft = "solid 1px lightgrey";
  }

  return <div style={localStyle}>{text}</div>;
}

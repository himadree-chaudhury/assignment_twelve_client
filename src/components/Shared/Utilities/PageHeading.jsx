const PageHeading = ({ heading, text }) => {
  return (
    <div className="mb-8">
      <h2 className="text-left">{heading}</h2>
      <p>{text}</p>
    </div>
  );
};
export default PageHeading;

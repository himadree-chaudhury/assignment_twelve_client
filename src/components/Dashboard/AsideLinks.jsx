const AsideLinks = ({ icon, text, alert, active, expanded }) => {
  return (
    <div
      className={`group font-button relative my-1 flex cursor-pointer items-center rounded-md px-3 py-2 text-lg transition-colors duration-200 ${
        active
          ? "from-accent to-secondary bg-gradient-to-tr font-semibold text-white"
          : "hover:bg-primary-hover hover:text-white"
      } `}
    >
      <span className={` ${expanded || "text-2xl"}`}> {icon}</span>
      <span
        className={`w-58 overflow-hidden transition-all duration-200 ${
          expanded ? "ml-3" : "hidden w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`bg-primary absolute right-2 h-2 w-2 animate-ping rounded duration-200 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {/* {!expanded && (
        <div
          className={`bg-text-secondary-dark text-primary invisible absolute left-full ml-6 -translate-x-3 rounded-md px-2 py-1 text-sm opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100`}
        >
          {text}
        </div>
      )} */}
    </div>
  );
};
export default AsideLinks;
